from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
from models.telemetry_model import TelemetryData, ExperimentSession

router = APIRouter(prefix="/api", tags=["telemetry"])

# MongoDB connection (reusing pattern from server.py)
# Note: In a production app we'd use a dependency, but following the existing project structure here.
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'veil_db')

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

@router.post("/telemetry")
async def receive_telemetry(data: TelemetryData):
    """
    Recebe dados de telemetria do ESP32 ou simulador.
    """
    try:
        # Adicionar timestamp do servidor para auditoria
        telemetry_doc = data.model_dump()
        telemetry_doc['server_timestamp'] = datetime.now(timezone.utc).isoformat()
        
        # Inserir no MongoDB (coleção telemetry)
        result = await db.telemetry.insert_one(telemetry_doc)
        
        return {
            "status": "success",
            "id": str(result.inserted_id),
            "message": "Telemetria registrada no Córtex"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar telemetria: {str(e)}")

@router.get("/telemetry/latest")
async def get_latest_telemetry(
    device_id: Optional[str] = None,
    limit: int = Query(default=50, le=500)
):
    """
    Busca os registros mais recentes para o Dashboard Analytics.
    """
    try:
        query = {}
        if device_id:
            query['device_id'] = device_id
        
        cursor = db.telemetry.find(query, {"_id": 0}).sort("server_timestamp", -1).limit(limit)
        data = await cursor.to_list(length=limit)
        
        return {
            "count": len(data),
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/telemetry/stats")
async def get_telemetry_stats(device_id: Optional[str] = None):
    """
    Gera estatísticas para os widgets do Dashboard.
    """
    try:
        match_stage = {"device_id": device_id} if device_id else {}
        
        # Agregação: contagem de expressões para o gráfico de pizza/barra
        pipeline_expressions = [
            {"$match": match_stage},
            {"$group": {
                "_id": "$expression",
                "count": {"$sum": 1},
                "avg_confidence": {"$avg": "$confidence"}
            }},
            {"$sort": {"count": -1}}
        ]
        
        expressions_stats = await db.telemetry.aggregate(pipeline_expressions).to_list(None)
        
        return {
            "expressions": expressions_stats,
            "summary": {
                "total_samples": await db.telemetry.count_documents(match_stage)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
