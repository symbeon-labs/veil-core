# VEIL: Data Harvesting & Sovereign Emotion Pipeline

**Data**: Abril de 2026
**Objetivo**: Estabelecer a infraestrutura soberana para coleta passiva e estruturação de dados emocionais a partir de fontes públicas (Filmes, Câmeras ao vivo) e bases acadêmicas consolidadas.

---

## 1. Bases de Dados Acadêmicas (O Alicerce Inicial)

Antes de capturarmos nossos próprios dados in-the-wild, o motor VEIL precisa de um _bootstrap_ utilizando os titãs do mundo da Visão Computacional.

1. **AffectNet**: A maior base de dados de emoções contínuas. Contém +1 Milhão de imagens extraídas da internet, sendo ~400k anotadas manualmente tanto para rótulos discretos quanto para o nosso foco dimensional: **Valência e Excitação (Arousal)**.
2. **RAF-DB (Real-world Affective Faces)**: ~30k imagens com alto nível de diversidade de iluminação, raça e oclusões (rostos parcialmente cobertos). Excelente para treinar o `vision_mock_adapter`.
3. **Aff-Wild2**: O maior banco focado em **vídeos/comportamentos in-the-wild**, crucial para capturarmos os *efeitos de transição/micro-expressões*.
4. **KDEF (Karolinska Experimental):** Excelente controle de laboratório, mas com faces forçadas. Bom para testar a baseline.

---

## 2. O Problema da Privacidade (Tese de Conformidade)

O VEIL opera com a tese de Arquitetura Vision-Agnostic baseada em **Privacidade Cega** (LiDAR Topográfico). Portando, interceptar e armazenar rostos de pessoas andando na rua ou de atores renderia dois problemas massíveis:
1. Quebra da LGPD/GDPR e anonimização em massa.
2. O treinamento induziria o modelo a depender da textura da pele (RGB), o que destruiria nossa adaptação primária para sensores Time-of-Flight.

**A Solução**: Extrairemos a geometria vetorial, rotularemos a semântica, e ejetaremos o RGB.

---

## 3. A Estratégia do Duto Híbrido (Harvesting Autônomo)

Construiremos um *scrapper* contínuo (em Python cv2/yt-dlp) arquitetado nesta esteira de processamento:

### Fase 1: Ingestão de Contexto Extremo
*   **Atores Famosos (Dumps de Filmes)**: Filmes são minas de ouro para expressões forçadas e micro-tensões faciais interpretadas para o espectador entender.
*   **Public IP Streams**: Câmeras abertas de praças ou estações de trem entregam tédio autêntico e estresse genuíno.

### Fase 2: Mapeamento de Malha (Mesh Extraction)
*   Sempre que um clipe passar na esteira, interceptamos com a inferência leve do `MediaPipe Face Mesh` (Google).
*   Isso não captura um rosto; isso espirra 468 coordenadas (X, Y, Z) formando uma malha poligonal das tensões musculares. Isso emula perfeitamente a leitura crua de um hardware LiDAR do VEIL.

### Fase 3: Auto-Rotulação Induzida via MLLM (A Mágica)
Como rotular manualmente milhares de horas faliu o orçamento de mega corporações, nós terceirizamos.
*   Usando um Vision-Language Model potente (Gemma Vision ou GPT-4o em Batch Mode), injetamos o frame original (RGB) e perguntamos: 
*   *Prompt*: "Aja como psicólogo. Analise a linguagem corporal da cena e o rosto no frame XY. Qual o exato estado emocional presente mapeado num plano Valence: [-1, 1], Arousal: [-1, 1]? Retorne um JSON."

### Fase 4: O Abate do Arquivo Base (Privacy-by-Design)
A fase nuclear da Soberania do VEIL:
1. Associamos as Coordenadas da Malha (Passo 2) com os Rótulos Emocionais Dimensionais (Passo 3).
2. **Excluímos Permanentemente o Vídeo Bruto (RGB).**

### O Resumo Operacional
O produto final desta esteira é um banco de dados de Redes Neurológicas Infrarvermelhas/Topológicas com exatidão emocional confirmada pelo modelo mais forte da terra, sem abrigar sequer um byte de identificação humana real. Isto validará nosso MVP como a plataforma neural robótica mais segura possível, escalável para bilhões de parâmetros.
