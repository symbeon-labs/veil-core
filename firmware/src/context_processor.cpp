#include "context_processor.h"
#include <Arduino.h>

void ContextProcessor::init() {
  Serial.println("[ContextProcessor] Inicializado");
  lastInteractionTime = millis();
}

ContextData ContextProcessor::analyze(VisionData visionData) {
  ContextData context;
  
  // Analisar proximidade
  if (visionData.distance < 100) {
    context.proximity = "close";
  } else if (visionData.distance < 200) {
    context.proximity = "medium";
  } else {
    context.proximity = "far";
  }
  
  // Analisar luz ambiente
  context.ambientLight = map(visionData.lightLevel, 0, 1023, 0, 100);
  
  // Detectar tipo de interação
  if (visionData.faceDetected && visionData.distance < 150) {
    context.interactionType = "social";
    lastInteractionTime = millis();
  } else if (visionData.objectDetected) {
    context.interactionType = "object_focus";
  } else {
    context.interactionType = "idle";
  }
  
  // Calcular tempo desde última interação
  context.timeSinceLastInteraction = (millis() - lastInteractionTime) / 1000;
  
  // Estado emocional simulado
  context.emotionalState = inferEmotionalState(context);
  
  return context;
}

String ContextProcessor::inferEmotionalState(ContextData context) {
  if (context.interactionType == "social") {
    return "engaged";
  } else if (context.timeSinceLastInteraction > 30) {
    return "bored";
  } else if (context.ambientLight < 20) {
    return "alert";
  } else {
    return "neutral";
  }
}
