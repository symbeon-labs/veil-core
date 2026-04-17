from abc import ABC, abstractmethod
from typing import Dict, Any

class IVisionModel(ABC):
    """
    Interface fundamental para modelos de Visão Computacional.
    O VEIL Core independe do modelo utilizado (YOLO, MobileNet, Mediapipe, etc),
    desde que este obedeça ao contrato de retorno padrão da framework.
    """
    
    @abstractmethod
    async def process_frame(self, frame_data: bytes) -> Dict[str, Any]:
        """
        Contrato de Saída Obrigatório:
        {
            'objects': list[Dict],
            'faces': list[Dict],
            'scene_type': str,
            'confidence': float
        }
        """
        pass

class IContextAnalyzer(ABC):
    """
    Interface para Análise de Contexto.
    Define o motor cognitivo que mapeia os dados brutos de estímulos do ambiente
    para inferência de estados emocionais do usuário e do contexto geral.
    Pode ser baseado em heurísticas (rule-based) ou modelos LLM (Qwen, Llama, GPT).
    """
    
    @abstractmethod
    async def analyze(self, vision_data: Dict, sensor_data: Dict) -> Dict[str, Any]:
        """
        Contrato de Saída Obrigatório:
        {
            'proximity': str,
            'interaction_type': str,
            'emotional_state': str
        }
        """
        pass

class IExpressionGenerator(ABC):
    """
    Interface central da VEIL Expression Language.
    Traduz a análise do contexto para a linguagem padronizada de expressões da VEIL,
    baseada nas dimensões Valence e Arousal.
    """
    
    @abstractmethod
    async def generate(self, context: Dict) -> Dict[str, Any]:
        """
        Retorna VEIL Expression Object:
        {
            'expression_id': str,
            'valence': float,
            'arousal': float,
            'dominance': float,
            'eye_params': {
                'pupil_size': float,
                'eyelid_open': float,
                'gaze_focus': float
            },
            'confidence': float
        }
        """
        pass

class IXAIReasoner(ABC):
    """
    Interface para Raciocínio Explicável (XAI).
    Obrigatório para auditoria e confiança na robótica afetiva.
    """
    
    @abstractmethod
    async def explain(self, context: Dict, expression: Dict) -> str:
        """
        Retorna uma explicação compreensível do porquê o agente adotou 
        determinada expressão.
        """
        pass
