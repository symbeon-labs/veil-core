from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, ConfigDict, Field
from typing import List, Dict, Any
import uuid
from datetime import datetime, timezone

# VEIL Core Integration
from veil_core.orchestrator import VeilOrchestrator


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="VEIL Core API - Sovereign Nervous System")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")
veil_router = APIRouter(prefix="/api/veil", tags=["VEIL Core"])

# Initialize Global Sovereign Orchestrator
try:
    orchestrator = VeilOrchestrator()
except Exception as e:
    logging.error(f"Failed to bootstrap VEIL Orchestrator: {e}")
    orchestrator = None


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# VEIL Endpoints
class StimulusInput(BaseModel):
    sensor_id: str
    payload_size: int
    data: str = "mock_bytes" # Em um cenario real, isso seria multipart form com binarios LiDAR/RGB

@veil_router.post("/process", response_model=Dict[str, Any])
async def process_veil_stimulus(input_data: StimulusInput):
    if not orchestrator:
        return {"error": "VEIL Orchestrator is disconnected."}
        
    try:
        # Pass the mock bytes up to the Sovereign VEIL engine
        # In a real environment, this receives the LiDAR dense point cloud or RGB normalized frame
        raw_bytes = input_data.data.encode('utf-8')
        result = await orchestrator.process_stimulus(raw_bytes)
        return {"status": "success", "agent_id": input_data.sensor_id, "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Include the router in the main app
app.include_router(api_router)
app.include_router(veil_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()