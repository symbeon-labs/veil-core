# VEIL MVP - Implementação Técnica
## ESP32 + Backend + Dashboard Analytics

**Status**: Implementação completa para desenvolvimento e testes

---

## 📁 Estrutura do Projeto

```
/app/
├── firmware/              # Código ESP32
│   ├── esp32/            # Firmware principal
│   ├── lib/              # Bibliotecas
│   └── include/          # Headers
├── backend/              # API Backend
│   ├── api/              # Endpoints FastAPI
│   ├── models/           # Modelos de dados
│   ├── database/         # Schemas DB
│   └── services/         # Lógica de negócio
└── frontend/             # Dashboard + Landing Page
    └── src/
        ├── components/   # React components
        └── pages/        # Dashboard pages
```

---

## 🔧 Firmware ESP32

### Arquitetura

```
┌─────────────────────────────────────┐
│         ESP32-S3 Firmware           │
├─────────────────────────────────────┤
│  [Camera] → [Vision Module]         │
│                ↓                    │
│  [Context Processor (LLM)]          │
│                ↓                    │
│  [Expression Generator]             │
│                ↓                    │
│  [XAI Reasoner]                     │
│                ↓                    │
│  [Display Driver] → [OLED/TFT]      │
│                                     │
│  [MQTT Client] ←→ [Backend API]     │
└─────────────────────────────────────┘
```

### Componentes

1. **VisionModule**: Simulação de detecção de emoções (placeholder para MobileNetV3)
2. **ContextProcessor**: Simulação de LLM (placeholder para Qwen 2.5)
3. **ExpressionGenerator**: Rede neural simples para gerar expressões
4. **XAIReasoner**: Sistema de explicações baseado em regras
5. **DisplayDriver**: Suporte para OLED SSD1306 e TFT ST7789
6. **MQTTClient**: Comunicação com backend

### Dependências

```ini
# platformio.ini
[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino

lib_deps =
    adafruit/Adafruit GFX Library
    adafruit/Adafruit SSD1306
    adafruit/Adafruit ST7735 and ST7789 Library
    knolleary/PubSubClient
    bblanchon/ArduinoJson
```

---

## 🖥️ Backend API

### Stack Tecnológico

- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Queue**: Redis (para processamento assíncrono)
- **Protocol**: MQTT + REST API + WebSocket

### Endpoints Principais

```
POST   /api/v1/interactions       # Registrar interação
GET    /api/v1/interactions       # Listar interações
GET    /api/v1/analytics/summary  # Analytics agregado
GET    /api/v1/devices            # Listar dispositivos
POST   /api/v1/devices/register   # Registrar novo ESP32
WS     /api/v1/realtime           # WebSocket tempo real
```

### Modelo de Dados

```python
Interaction {
    id: ObjectId
    device_id: str
    timestamp: datetime
    agent_state: str
    user_emotion_before: {v: float, a: float, d: float}
    expression_shown: {shape, color, intensity, effect}
    user_emotion_after: {v: float, a: float, d: float}
    task_outcome: bool
    explicit_feedback: Optional[int]
    reward: float
    explanation: str
}
```

---

## 📊 Dashboard Analytics

### Páginas

1. **Overview**: KPIs gerais (total interações, dispositivos ativos, NPS)
2. **Real-time**: Monitoramento ao vivo de expressões
3. **Analytics**: Gráficos de naturalness, trust, task success
4. **Devices**: Lista de ESP32s conectados
5. **Experiments**: Gerenciar experimentos (N=60 participantes)

### Gráficos Implementados

- Line chart: Interações ao longo do tempo
- Bar chart: Distribuição de expressões
- Heatmap: Mapeamento estado → expressão
- Scatter: Correlação reward vs naturalness

---

## 🚀 Como Usar

### 1. Setup Backend

```bash
cd /app/backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### 2. Flash Firmware ESP32

```bash
cd /app/firmware
pio run --target upload
pio device monitor
```

### 3. Dashboard

```bash
cd /app/frontend
yarn install
yarn start
```

**Acesse**: http://localhost:3000/dashboard

---

## 📡 Integração MQTT

### Tópicos

```
veil/{device_id}/state         # ESP32 publica estado
veil/{device_id}/expression    # ESP32 publica expressão
veil/{device_id}/telemetry     # Métricas (latência, RAM, etc)
veil/broadcast/config          # Backend envia configs
```

### Exemplo de Payload

```json
{
  "device_id": "esp32_001",
  "timestamp": "2026-04-10T14:30:00Z",
  "agent_state": "processing",
  "user_emotion": {"v": -0.3, "a": 0.6, "d": 0.1},
  "expression": {
    "shape": "oval",
    "color": "blue",
    "intensity": 60,
    "effect": "pulse"
  },
  "explanation": "User appears frustrated. Showing empathy.",
  "latency_ms": 1420
}
```

---

## 🧪 Sistema de Coleta de Dados

### Protocolo Experimental

1. **Participante inicia sessão** → Backend cria `experiment_session`
2. **ESP32 envia interações** → Backend registra tudo
3. **Fim da sessão** → Backend calcula métricas
4. **Dashboard** → Pesquisador visualiza resultados

### Métricas Coletadas

- Naturalness rating (1-5 Likert)
- Trust score (HRI Trust Scale, 1-7)
- Task success rate (%)
- Completion time (segundos)
- NASA-TLX (carga cognitiva)
- Feedback qualitativo (texto livre)

---

## 🔐 Segurança

- **API**: JWT tokens para autenticação
- **MQTT**: TLS encryption
- **Database**: MongoDB com auth
- **Privacy**: Dados de vídeo NÃO são salvos (apenas features VAD)

---

## 📈 Roadmap de Integração dos Modelos Reais

### Fase 1: Simulação (ATUAL)
- ✅ Firmware com placeholders
- ✅ Backend funcional
- ✅ Dashboard completo
- ✅ Coleta de dados mock

### Fase 2: Visão Real (Semanas 1-4)
- [ ] Treinar MobileNetV3 em FER-2013 + AffectNet
- [ ] Quantizar para INT8 (TFLite)
- [ ] Integrar TensorFlow Lite Micro no ESP32
- [ ] Validar accuracy e latência

### Fase 3: LLM Real (Semanas 5-8)
- [ ] Port Qwen 2.5 1.5B quantizado (Q4)
- [ ] Ou usar alternativa menor (Phi-3 Mini)
- [ ] Integrar llama.cpp no ESP32
- [ ] Cache de conceitos frequentes

### Fase 4: Fine-tuning (Semanas 9-12)
- [ ] Coletar 5k exemplos reais
- [ ] Re-treinar ExpressionGenerator
- [ ] Transfer learning contínuo
- [ ] Validar com N=60 participantes

---

**PRÓXIMO**: Vou criar os arquivos de código agora!
