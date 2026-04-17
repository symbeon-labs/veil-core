"""
Configurações da Engine VEIL. 
Define quais adapters são inicializados na runtime do agente,
permitindo a troca silenciosa de modelos subjacentes (ex: Edge x Cloud)
sem afetar a lógica central.
"""

VEIL_CONFIG = {
    # 'vision_model': 'mobilenet_v3', # Edge deploy
    # 'vision_model': 'yolo_v8',      # GPU Server deploy
    'vision_model': 'vision_mock',    # Rápida prototipagem
    
    # --- Context/LLM Processor Adapters ---
    # The framework is completely agnostic. Any LLM API or Local model can be plugged in:
    # 'context_analyzer': 'qwen_2.5_coder_1.5b',         # Original Edge
    # 'context_analyzer': 'gemma_4_2b_it',               # JSON-optimized Edge
    # 'context_analyzer': 'openai_gpt4o_adapter',        # Cloud API
    'context_analyzer': 'rule_based',                    # Fallback determinístico sem IA
    
    'expression_generator': 'veil_standard_generator',
    
    'xai_reasoner': 'semantic_graph_reasoner',
    
    'hardware_target': 'esp32_s3'     # ou 'raspberry_pi_5', 'cloud_dashboard'
}
