import random
from typing import Dict, Any
from ..interfaces import IVisionModel

class VisionMockAdapter(IVisionModel):
    """
    Adapter MOCK para rápido desenvolvimento sem exigir câmeras ou GPUs.
    Simula perfeitamente a saída padronizada da Interface IVisionModel.
    """
    
    async def process_frame(self, frame_data: bytes) -> Dict[str, Any]:
        # Simula detecções aleatórias para fins de validação da UI e Pipeline
        has_face = random.choice([True, False])
        
        faces = []
        if has_face:
            faces.append({"box": [10, 10, 50, 50], "emotion": "neutral"})
            
        objects = []
        if random.random() > 0.5:
            objects.append({"class": "person", "confidence": random.uniform(0.6, 0.99)})
            
        return {
            'objects': objects,
            'faces': faces,
            'scene_type': random.choice(["indoor", "outdoor", "interaction", "idle"]),
            'confidence': random.uniform(0.7, 1.0)
        }
