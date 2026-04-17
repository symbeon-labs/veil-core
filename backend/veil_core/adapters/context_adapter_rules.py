from typing import Dict, Any
from ..interfaces import IContextAnalyzer

class RuleBasedContextAdapter(IContextAnalyzer):
    """
    Adapter Determinístico (Rule-Based) para Análise de Contexto.
    Pode operar em hardware com altíssima restrição de recursos 
    onde rodar LLMs (mesmo quantizados) é impossível.
    """
    
    async def analyze(self, vision_data: Dict, sensor_data: Dict) -> Dict[str, Any]:
        interaction_type = "idle"
        emotional_state = "neutral"
        
        # Contextual Inference baseado em regras simples
        if len(vision_data.get('faces', [])) > 0:
            interaction_type = "social"
            emotional_state = "engaged"
        elif vision_data.get('scene_type') == "interaction":
            interaction_type = "object_focus"
            emotional_state = "curious"
            
        proximity = sensor_data.get("proximity", "far")
        
        if proximity == "close" and interaction_type == "idle":
             emotional_state = "alert"
            
        return {
            'proximity': proximity,
            'interaction_type': interaction_type,
            'emotional_state': emotional_state
        }
