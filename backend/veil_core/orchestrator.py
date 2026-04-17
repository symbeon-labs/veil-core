import asyncio
from typing import Dict, Any

from .config import VEIL_CONFIG
from .interfaces import IVisionModel, IContextAnalyzer, IExpressionGenerator, IXAIReasoner

# Importando os adapters conhecidos
from .adapters.vision_mock_adapter import VisionMockAdapter
from .adapters.context_adapter_rules import RuleBasedContextAdapter
from .adapters.llm_adapters import GemmaJSONAdapter, OpenAILocalProxyAdapter


class DummyExpressionGenerator(IExpressionGenerator):
    """
    Adapter genérico provisório para mapear Valence/Arousal em formas 
    até que a versão final do motor geométrico seja importada.
    """
    async def generate(self, context: Dict) -> Dict[str, Any]:
        emotion_state = context.get('emotional_state', 'neutral')
        
        # Expressões Padrões (Heurística Básica)
        expression_map = {
            'calm': {'shape': 'oval', 'color': 'blue', 'effect': 'pulse'},
            'alert': {'shape': 'diamond', 'color': 'magenta', 'effect': 'blink'},
            'stressed': {'shape': 'angular', 'color': 'red', 'effect': 'shake'},
            'curious': {'shape': 'squint', 'color': 'cyan', 'effect': 'scan'},
            'neutral': {'shape': 'circle', 'color': 'white', 'effect': 'static'}
        }
        
        selected = expression_map.get(emotion_state, expression_map['neutral'])
        
        return {
            'expression_id': 'exp_001',
            'components': selected,
            'confidence': 0.85
        }


class VeilOrchestrator:
    """
    Orquestrador Soberano do Ecossistema VEIL.
    Carrega dinamicamente os adapters definidos no config.py, injetando 
    as dependências da Pipeline Visão -> Contexto -> Expressão -> XAI.
    """
    def __init__(self):
        self.vision: IVisionModel = None
        self.context: IContextAnalyzer = None
        self.generator: IExpressionGenerator = None
        self.xai: IXAIReasoner = None
        
        self._bootstrap_adapters()

    def _bootstrap_adapters(self):
        # 1. Bootstrapping Vision Adapter
        vision_type = VEIL_CONFIG.get('vision_model', 'vision_mock')
        if vision_type == 'vision_mock':
            self.vision = VisionMockAdapter()
        else:
            raise NotImplementedError(f"Adapter de visão {vision_type} ainda não importado.")
        
        # 2. Bootstrapping Context Adapter
        context_type = VEIL_CONFIG.get('context_analyzer', 'rule_based')
        if context_type == 'rule_based':
            self.context = RuleBasedContextAdapter()
        elif context_type == 'gemma_4_2b_it':
            self.context = GemmaJSONAdapter(model_manager=None) # Mock object
        elif context_type == 'openai_gpt4o_adapter':
            self.context = OpenAILocalProxyAdapter(api_key="sovereign_local")
        else:
            raise NotImplementedError(f"Adapter de contexto {context_type} ainda não importado.")
            
        # 3. Bootstrapping Expression Generator
        self.generator = DummyExpressionGenerator()
        
        # 4. Bootstrapping XAI Reasoner
        # Se o ContextAdapter for um LLM, ele pode servir como XAI também (Double-duty)
        if isinstance(self.context, IXAIReasoner):
            self.xai = self.context
        else:
            # Fallback para heurística
            self.xai = RuleBasedContextAdapter() # Usa implementação basica do RuleBased

    async def process_stimulus(self, raw_sensor_data: bytes) -> Dict[str, Any]:
        """
        O Pipeline Central do VEIL: O dado entra cru, e sai uma instrução geométrica explicada.
        """
        # 1. Visão abstrai os dados sensoriais privativos
        vision_state = await self.vision.process_frame(raw_sensor_data)
        
        # 2. Contexto avalia o estado fofocado + dados extrínsecos do robô
        robot_state = {"battery": 100, "task": "idle"}
        context_state = await self.context.analyze(vision_data=vision_state, sensor_data=robot_state)
        
        # 3. Gerador compila a geometria
        expression = await self.generator.generate(context_state)
        
        # 4. XAI gera as salvaguardas (justificativa de operação)
        if hasattr(self.xai, 'explain'):
            justification = await self.xai.explain(context_state, expression)
        else:
            justification = "System operating in basic deterministic mode."
            
        return {
            "vision_abstract": vision_state,
            "context_perception": context_state,
            "expression_output": expression,
            "xai_justification": justification
        }
