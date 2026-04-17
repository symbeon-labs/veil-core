# Estratégia de Desenvolvimento e Pesquisa Avançada: VEIL Core

Este documento formaliza a estratégia de produto, o roadmap técnico e a tese de pesquisa avançada em captação biométrica estrutural (LiDAR) para o **Framework VEIL**.

---

## 🧭 O Paradigma do MVP: Foco na Inovação Afetiva

A arquitetura do VEIL é expansível por natureza (baseada em adaptação de injeção de dependências). No entanto, o roteiro de execução respeita a regra da "Inovação Única", concentrando os esforços iniciais na resolução magistral de um único problema antes da expansão do escopo.

### FASE 1: O Tradutor Afetivo Cego (Current Focus)
O objetivo principal da Fase 1 é dominar a transdução de emoções faciais em respostas de robótica expressiva explicável (XAI), utilizando a **linguagem emocional do VEIL** (Valence, Arousal, Dominance).

- **O que será feito:** Capturar inputs focados exclusivamente no usuário (Expressões, Proximidade) e gerar respostas empáticas renderizadas por parâmetros sintéticos e justificadas explicitamente pelo XAI.
- **O que NÃO será feito:** Reconhecimento de cena geral (ex: classificar se há uma mesa, uma caneca ou um computador no quarto).
- **Justificativa Acadêmica/Patente:** Classificação de objetos é um campo saturado e comoditizado e dilui a força de uma submissão de PI (Propriedade Intelectual). A tradução padronizada e auditável de empatia máquina-humano, suportada por Edge Devices restritos, é um vetor altamente original e patenteável. A omissão voluntária da percepção de ambiente também solidifica o framework como uma *Privacy-First Tech*.

### FASE 2: Fusão Sensorial (Adapters Multimodais)
Com o motor emocional (Core) fluído e comprovado semanticamente, habilitaremos a expansão por adapters secundários de ambiente. O agente começará a fundir o estado emocional medido na Fase 1 com contextos do perímetro (ambient adapters).

---

## 🔬 Pesquisa Avançada: O Vetor LiDAR (TrueDepth)

A maior limitação da computação da emoção hoje é a dependência de matrizes RGB (Pixels bidimensionais). Câmeras tradicionais exigem iluminação perfeita, introduzem vieses (pele de tonalidade escura vs iluminação inadequada) e transacionam visualmente privacidade direta (a identidade crua do usuário, sua casa, seus objetos).

**A Tese:** O uso de Sensores de Profundidade a Laser (Time-of-Flight / FaceID LiDAR) como o fluxo primário do VEIL em substituição fotográfica.

### 1. Superioridade Cibernética (Cinemática sobre Pixel)
Um sensor LiDAR não analisa uma "imagem". Ele emite milhares de pontos infravermelhos e mede o tempo de retorno da luz, gerando um *Depth Map* volumétrico do rosto do usuário. O algoritmo não avalia se você *parece* estar sorrindo baseado em cores; ele **calcula a dilatação topográfica milimétrica na contração dos seus músculos zigomáticos**.

### 2. A Imunidade Ambiental
A computação volumétrica por infravermelho funciona integralmente na escuridão mais absoluta e é imune ao estouro de luz do sol. O VEIL não precisará exigir que o usuário ligue abajures para ser capaz de ter empatia por ele durante a noite.

### 3. A Promessa de Soberania Biométrica Radical
Ao usar apenas varredura LiDAR cruzada por processamento *Edge*, nenhum frame fotográfico da casa da pessoa ou de terceiros vulneráveis (crianças ao fundo) cruza a GPU do modelo. Convertemos o rosto em uma malha geométrica descaracterizada e irreconhecível biometricamente para fins de vigilância corporativa, mas que carrega 100% da identidade motora-emocional. Isso converte o projeto VEIL em uma ferramenta **Privacy-by-Design**.

---

## ⚙️ Conceito Tático: O Adaptador LiDAR PoC

Para demonstrar que o Framework Agnóstico está arquiteturalmente apto a recepcionar essa tese de ponta no futuro:

```python
# app/backend/veil_core/adapters/lidar_vision_adapter.py
# --- PROVA DE CONCEITO DE PESQUISA (Não incluída no MVP Base) ---

from abc import ABC
import numpy as np
from typing import Dict, Any

class LidarVisionAdapter(IVisionModel):
    """
    Adapter que substitui RGB frames por Point Clouds volumétricas (Depth Maps).
    Especializado em extração hiper-privada de microexpressões baseado em 
    distorção de malha infravermelha, em substituição total a fotografia visual.
    """
    
    async def process_frame(self, depth_matrix_data: bytes) -> Dict[str, Any]:
        # 1. Desserializar dados ToF/LiDAR para um numpy struct volumétrico 3D
        point_cloud = np.frombuffer(depth_matrix_data, dtype=np.float32).reshape((240, 320))
        
        # 2. Localizar volume do cluster do rosto no escuro total
        face_cluster = self._extract_closest_volume(point_cloud)
        
        # 3. Analisar cinemática de malha (Valence/Arousal puro por tração geométrica)
        # Diferente de classificar 'bravo' (RGB), classificamos vetores musculares (Topologia)
        kinematic_valence = self._compute_muscle_tension(face_cluster)
        
        return {
            'objects': [], # Garantia Cypherpunk: Cego para o resto do ambiente
            'faces': [{
                'geometry': 'mesh_blob_reference',
                'emotion_topography': kinematic_valence
            }],
            'scene_type': "blind_privacy_mode",
            'confidence': 0.98 # Alta devido à precisão imune a luz
        }

    def _extract_closest_volume(self, point_cloud: np.ndarray):
        # Excluir dados nulos e filtrar a cúpula mais próxima correspondente a um crânio humano
        return [] 
        
    def _compute_muscle_tension(self, volumetric_cluster):
        # Medições delta entre mapeamentos superciliares e zigomáticos via Cloudpoints
        return "neutral"
```

---

*Status do Documento: Em Vigor*  
*Iniciativa: AEGIS & VEIL Framework Orchestration*
