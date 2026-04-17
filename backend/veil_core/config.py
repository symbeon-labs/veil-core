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
    
    # 'context_analyzer': 'qwen_1.5b',# Edge LLM deploy
    'context_analyzer': 'rule_based', # Fallback determinístico
    
    'expression_generator': 'veil_standard_generator',
    
    'xai_reasoner': 'semantic_graph_reasoner',
    
    'hardware_target': 'esp32_s3'     # ou 'raspberry_pi_5', 'cloud_dashboard'
}
