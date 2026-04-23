#include "xai_reasoner.h"
#include <Arduino.h>

void XAIReasoner::init() {
  Serial.println("[XAIReasoner] Inicializado");
}

String XAIReasoner::explain(VisionData vision, ContextData context, ExpressionData expression) {
  String explanation = "Expressão '" + expression.name + "' selecionada porque: ";
  
  if (context.interactionType == "social") {
    explanation += "detectada interação próxima com humano";
  } else if (context.emotionalState == "bored") {
    explanation += "ausência de estímulos visuais prolongada";
  } else if (context.emotionalState == "alert") {
    explanation += "baixa luminosidade captada pelo sensor";
  } else {
    explanation += "equilíbrio homeostático no ambiente";
  }
  
  explanation += " [Confiança: " + String(expression.confidence * 100, 0) + "%]";
  return explanation;
}

String XAIReasoner::generateDetailedReport(ExpressionData expression) {
  String report = "=== VEIL XAI Detailed Report ===\n";
  report += "Expressão: " + expression.name + "\n";
  report += "Valence/Arousal: " + String(expression.valence) + "/" + String(expression.arousal) + "\n";
  report += "===============================\n";
  return report;
}
