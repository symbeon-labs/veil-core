#include "expression_generator.h"
#include <Arduino.h>

void ExpressionGenerator::init() {
  Serial.println("[ExpressionGenerator] Inicializado");
  currentExpression = "neutral";
}

ExpressionData ExpressionGenerator::generate(ContextData context) {
  ExpressionData expression;
  
  // Mapear contexto → expressão
  if (context.interactionType == "social") {
    expression.name = "curious";
    expression.valence = 0.7;
    expression.arousal = 0.6;
  } else if (context.emotionalState == "bored") {
    expression.name = "tired";
    expression.valence = 0.3;
    expression.arousal = 0.2;
  } else if (context.emotionalState == "alert") {
    expression.name = "focused";
    expression.valence = 0.5;
    expression.arousal = 0.8;
  } else {
    expression.name = "neutral";
    expression.valence = 0.5;
    expression.arousal = 0.5;
  }
  
  expression.confidence = calculateConfidence(context);
  expression.eyeParams = calculateEyeParameters(expression.name);
  
  currentExpression = expression.name;
  return expression;
}

float ExpressionGenerator::calculateConfidence(ContextData context) {
  float confidence = 0.5; 
  if (context.interactionType == "social") confidence += 0.3;
  if (context.timeSinceLastInteraction > 60) confidence -= 0.2;
  if (context.ambientLight < 20) confidence -= 0.1;
  return constrain(confidence, 0.0, 1.0);
}

String ExpressionGenerator::calculateEyeParameters(String expressionName) {
  if (expressionName == "curious") return "{\"pupil_size\":0.8,\"eyelid_open\":0.9}";
  if (expressionName == "tired") return "{\"pupil_size\":0.4,\"eyelid_open\":0.3}";
  if (expressionName == "focused") return "{\"pupil_size\":0.6,\"eyelid_open\":0.7}";
  return "{\"pupil_size\":0.5,\"eyelid_open\":0.6}";
}
