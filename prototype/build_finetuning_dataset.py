import json
import random
import os
from pathlib import Path

# Definindo estados psicológicos baseados no Modelo Circumplexo
# (Valence, Arousal) + XAI Justificativa sintética estruturada
EMOTIONAL_ANCHORS = {
    "calm": {
        "valence_range": (0.3, 0.7),
        "arousal_range": (-0.8, -0.3),
        "shape": "oval",
        "color": "blue",
        "effect": "pulse",
        "xai_templates": [
            "Malha topológica indica relaxamento do Zigomático Maior. Baixa atividade vetorial infere segurança. Adotando postura passiva.",
            "Ausência de micro-tensões frontais detectada. O operador aparenta tranquilidade."
        ]
    },
    "alert": {
        "valence_range": (-0.2, 0.2),
        "arousal_range": (0.5, 0.9),
        "shape": "diamond",
        "color": "magenta",
        "effect": "scan",
        "xai_templates": [
            "Rigidez topográfica identificada. Aumento da taxa de excitação no ambiente. Iniciando rastreamento constante.",
            "Olhar vetorial concentrado. Modificando malha para formato de alta constrição (alerta)."
        ]
    },
    "stressed": {
        "valence_range": (-0.8, -0.4),
        "arousal_range": (0.4, 0.8),
        "shape": "angular",
        "color": "red",
        "effect": "shake",
        "xai_templates": [
            "Compressão excessiva entre supercílios detectada na malha. Indiretiva de estresse ou dor. Evitando interações invasivas.",
            "Altos decibéis vetoriais de tensão. Mudando cor preditiva para estado de cautela (erro/frustração do usuário)."
        ]
    },
    "joyful": {
        "valence_range": (0.6, 1.0),
        "arousal_range": (0.4, 0.8),
        "shape": "wide",
        "color": "cyan",
        "effect": "blink",
        "xai_templates": [
            "Elevação lateral da malha bucal detectada. Mapeamento positivo alto. Refletindo aprovação geométrica.",
            "Identificada forte valência positiva e alta excitação."
        ]
    }
}

def generate_noise_mesh(anchor_type):
    # Gera uma malha topológica leve (simulando 10 pontos chaves do LiDAR)
    # Na vida real seriam 468 pontos do mediapipe. Simplificado para o LLM não estourar tokens no fine-tuning.
    mesh = []
    for i in range(10): # 10 Pontos vitais
        # Se stressed as linhas convergem, se joyful as linhas elevam (matemática abstrata)
        base_x = random.uniform(0, 1)
        base_y = random.uniform(0, 1)
        
        if anchor_type == "stressed":
            base_x -= random.uniform(0, 0.1) # Constrição
        elif anchor_type == "joyful":
            base_y += random.uniform(0, 0.1) # Elevação
            
        mesh.append({"x": round(base_x, 3), "y": round(base_y, 3)})
    return mesh

def build_dataset(num_samples: int, output_path: str):
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    
    samples_created = 0
    with open(output_path, 'w', encoding='utf-8') as f:
        for _ in range(num_samples):
            # Escole âncora emocional
            anchor_key = random.choice(list(EMOTIONAL_ANCHORS.keys()))
            anchor = EMOTIONAL_ANCHORS[anchor_key]
            
            val = round(random.uniform(*anchor["valence_range"]), 2)
            aro = round(random.uniform(*anchor["arousal_range"]), 2)
            mesh = generate_noise_mesh(anchor_key)
            xai = random.choice(anchor["xai_templates"])
            
            # Input Format (Para treinar modelo tipo Qwen/Gemma)
            system_prompt = "You are VEIL's Soverign Engine. Map LiDAR topologies into Emotion JSON."
            user_prompt = f"Topology Data (10 vital nodes): {json.dumps(mesh)}. Robot battery is fine."
            
            expected_response = {
                "valence": val,
                "arousal": aro,
                "concept": anchor_key,
                "expression": {
                    "shape": anchor["shape"],
                    "color": anchor["color"],
                    "effect": anchor["effect"]
                },
                "xai_log": xai
            }
            
            # Formato ShareGPT / HuggingFace
            # Ideal para bibliotecas como Unsloth
            row = {
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                    {"role": "assistant", "content": json.dumps(expected_response)}
                ]
            }
            
            f.write(json.dumps(row, ensure_ascii=False) + '\n')
            samples_created += 1
            
    print(f"[{samples_created}] Amostras sintéticas topológicas criadas e salvas em {output_path}!")

if __name__ == "__main__":
    out_file = os.path.join("dataset", "veil_finetuning_substrate.jsonl")
    build_dataset(500, out_file)
