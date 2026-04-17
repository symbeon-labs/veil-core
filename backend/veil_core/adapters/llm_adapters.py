import json
from typing import Dict, Any
from ..interfaces import IContextAnalyzer, IXAIReasoner

class GemmaJSONAdapter(IContextAnalyzer, IXAIReasoner):
    """
    Adapter para a família de modelos Google Gemma (2B/4B/7B).
    Focado na capacidade massiva do Gemma de garantir retornos JSON limpos
    utilizando a estrutura de Chat Template específica do Gemma.
    """
    def __init__(self, model_manager):
        self.model = model_manager # Injeção do motor (llama.cpp, Transformers, MLX)
        self.system_prompt = "You are VEIL Core. Format output ONLY as strict JSON."

    async def analyze(self, vision_data: Dict, sensor_data: Dict) -> Dict[str, Any]:
        prompt = f"<start_of_turn>user\nAnalyze user emotion: {vision_data}. State: {sensor_data}<end_of_turn>\n<start_of_turn>model\n"
        
        # Simulação de geração via modelo carregado localmente
        # response = self.model.generate(prompt)
        response_simulated = '{"proximity":"near", "interaction_type":"focus", "emotional_state":"neutral"}'
        return json.loads(response_simulated)

    async def explain(self, context: Dict, expression: Dict) -> str:
        return "Gemma analisou o contexto e estruturou esta justificativa com segurança XAI."


class OpenAILocalProxyAdapter(IContextAnalyzer, IXAIReasoner):
    """
    Adapter para modelos providos por APIs Cloud (OpenAI GPT-4, Anthropic Claude, etc).
    Utilizado caso o cliente do VEIL não possua processamento Edge e necessite 
    terceirizar o raciocínio semântico (violando Sovereign Core, mas garantindo compatibilidade).
    """
    def __init__(self, api_key: str):
        self.api_key = api_key

    async def analyze(self, vision_data: Dict, sensor_data: Dict) -> Dict[str, Any]:
        # Payload de API REST
        payload = {
            "model": "gpt-4o",
            "messages": [{"role": "system", "content": "You are VEIL."}]
        }
        return {"proximity": "detected", "interaction_type": "api_call", "emotional_state": "analyzing"}

    async def explain(self, context: Dict, expression: Dict) -> str:
        return "LLM terceirizado inferiu necessidade de empatia."
