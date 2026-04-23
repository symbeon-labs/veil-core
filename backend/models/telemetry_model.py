from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TelemetryData(BaseModel):
    device_id: str = Field(..., description="ID do dispositivo ESP32")
    expression: str = Field(..., description="Nome da expressão gerada")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confiança do modelo")
    valence: float = Field(..., ge=-1.0, le=1.0, description="Valência emocional")
    arousal: float = Field(..., ge=0.0, le=1.0, description="Arousal/ativação")
    explanation: str = Field(..., description="Explicação XAI")
    timestamp: int = Field(..., description="Timestamp do ESP32 (millis)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "device_id": "veil_esp32_001",
                "expression": "curious",
                "confidence": 0.85,
                "valence": 0.7,
                "arousal": 0.6,
                "explanation": "Detectei interação social próxima",
                "timestamp": 123456789
            }
        }

class ExperimentSession(BaseModel):
    session_id: str
    device_id: str
    start_time: datetime
    end_time: Optional[datetime] = None
    total_samples: int = 0
    notes: Optional[str] = None
