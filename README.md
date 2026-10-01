<div align="center">
<img src="docs/assets/banner.png" width="100%" alt="VEIL Sovereign Agnostic Framework">

# VEIL Core: Visual Emotional Interface Language

**Experimental research framework for multimodal perception, privacy-aware sensing and robotic interfaces.**

[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](LICENSE)
[![Zero-Trust](https://img.shields.io/badge/Privacy-Zero--Trust_LiDAR-00FF88?style=for-the-badge)](docs/strategy_and_lidar_research.md)
[![UEAP Integration](https://img.shields.io/badge/Attestation-UEAP_ZK--Proof-blueviolet?style=for-the-badge)](scripts/attest_veil_ueap.js)
[![LLM Agnostic](https://img.shields.io/badge/LLM-Agnostic_Adapters-000000?style=for-the-badge)](backend/veil_core/config.py)
</div>

---

## 🌌 Visão Geral

O **VEIL** é uma linha experimental de pesquisa que explora como sinais espaciais e multimodais podem ser transformed into interpretable representations for robotic interfaces. Claims about emotional-state inference, privacy and safety depend on the dataset, sensing hardware, model and deployment context.

Diferente de sistemas preexistentes (como drivers que leem imagens RGB ou atuam sob nuvens centralizadas), o VEIL foi fundado no **Protocolo de Privacidade Dimensional**: nós descartamos fotografias. O VEIL compreende apenas pontuações no espaço tridimensional (pontos biométricos de tensão capturados via LiDAR/Time-of-Flight) e infere estados psicológicos complexos utilizando IAs locais em hardware restrito (Edge Computing).

## 🏗️ Super-Arquitetura Modular

A fundação do VEIL é composta de `Adapters`. Absolutamente qualquer camada pode ser subtituída no arquivo [config.py](backend/veil_core/config.py).

```mermaid
graph TD
    subgraph "Percepção Sensorial (Edge)"
        LiDAR["Array LiDAR / ToF"] -->|Malha 3D Cega| VA["Vision Adapter\n(I_VisionModel)"]
        Camera["Webcam / RGB"] -.->|MediaPipe Extract| VA
    end

    subgraph "Sovereign Orchestrator"
        VA -->|Topologia Vetorial| CA["Context Analyzer\n(Gemma 4 / Llama / Qwen)"]
        Robot["Sensores Robô\n(Bateria, Toque)"] --> CA
        
        CA -->|Valence & Arousal| EG["Expression Generator\n(X, Y, Forma, Cor)"]
        CA -->|Inferência Textual| XAI["XAI Reasoner\n(Auditoria Lógica)"]
    end

    subgraph "Interfaces de Apresentação"
        EG --> Dash["React Simulator Dashboard"]
        XAI -.-> Dash
        EG --> ESP["Hardware (ESP32-S3 TFT)"]
    end

    style CA fill:#00FF88,stroke:#333,stroke-width:3px,color:#000
    style XAI fill:#00FF88,stroke:#333,stroke-width:3px,color:#000
```

## 🛡️ Pipelines Principais

### 1. `Aegis Harvester` (Soberania de Dados)
Como não dependemos de imagens da pele de um ser humano, como estruturar o dataset? O `scripts/aegis_harvester.py` puxa feeds públicos, extrai as malhas 3D (`Mesh Point Cloud`), injeta um pseudo-label do VLM (Valência/Excitação) e **incinera eternamente o Frame RGB Original**. O resultado é o `veil_finetuning_substrate.jsonl`, permitindo conformidade máxima na GDPR/LGPD hospitalar.

### 2. UEAP Zero-Trust Attestation
Datasets biomédicos na IA exigem auditoria rigorosa. Este repositório integra formalmente o **Universal Event Attestation Protocol (UEAP)**. 
Após cada colheita pelo Harvester, executamos `scripts/attest_veil_ueap.js` que tira um Hash SHA-256 da malha invisível e escreve uma prova _ZK-SNARK_ rastreável, atestando que os dados emocionais não sofreram contaminação posterior e são éticos.

### 3. Integração Dinâmica UI-to-Core
O painel em `/frontend` não é mais uma maquete. Ele possui um **Motor de Percepção Neural** que realiza chamadas assíncronas HTTP (`POST /api/veil/process`) engatando os dados simulados contra os pesos do _Python Orchestrator_ verdadeiro e alterando a face do olho em tempo real.

---

## 🚀 Como Subir o Córtex Local

Você pode iniciar as metades lógicas e de interação simultaneamente na sua máquina.

### Backend (Sovereign Python Orchestrator)
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn server:app --reload --port 8000
```

### Frontend (React Dashboard & Analytics)
```bash
cd frontend
npm install
npm start
```
*Acesse seu navegador em `localhost:3000` e pressione o botão "Ativar Percepção Neural" na Engine direita para ver a mágica XAI justificada na tela.*

---

## 📜 Propriedade Intelectual & P&D

This repository is a research artifact. Any patent, licensing or proprietary-status claims should be verified against the current legal and ownership records before being treated as established facts.
A fundação operacional completa, as especificações acadêmicas detalhadas do framework LiDAR e as minutas das reivindicações mecânicas da arquitetura agnóstica podem ser auditadas dentro do diretório de patentes: `/docs/`
