#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "config.h"
#include "vision_module.h"
#include "context_processor.h"
#include "expression_generator.h"
#include "xai_reasoner.h"

// Instâncias dos módulos
VisionModule visionModule;
ContextProcessor contextProcessor;
ExpressionGenerator expressionGenerator;
XAIReasoner xaiReasoner;

// WiFi credentials (configure no config.h)
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const char* serverUrl = SERVER_URL;

void sendDataToBackend(ExpressionData expression, String explanation) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado, pulando envio");
    return;
  }
  
  HTTPClient http;
  http.begin(String(serverUrl) + "/api/telemetry");
  http.addHeader("Content-Type", "application/json");
  
  // Montar JSON
  String payload = "{";
  payload += "\"device_id\":\"" + String(DEVICE_ID) + "\",";
  payload += "\"expression\":\"" + expression.name + "\",";
  payload += "\"confidence\":" + String(expression.confidence, 2) + ",";
  payload += "\"valence\":" + String(expression.valence, 2) + ",";
  payload += "\"arousal\":" + String(expression.arousal, 2) + ",";
  payload += "\"explanation\":\"" + explanation + "\",";
  payload += "\"timestamp\":" + String(millis());
  payload += "}";
  
  int httpCode = http.POST(payload);
  
  if (httpCode > 0) {
    Serial.printf("Backend response: %d\n", httpCode);
  } else {
    Serial.printf("Erro HTTP: %s\n", http.errorToString(httpCode).c_str());
  }
  
  http.end();
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("=== VEIL ESP32 MVP Iniciando ===");
  
  // Conectar WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
  
  // Inicializar módulos
  visionModule.init();
  contextProcessor.init();
  expressionGenerator.init();
  xaiReasoner.init();
  
  Serial.println("=== Sistema VEIL Pronto ===");
}

void loop() {
  // 1. Capturar dados de visão (mock)
  VisionData visionData = visionModule.captureFrame();
  
  // 2. Processar contexto
  ContextData contextData = contextProcessor.analyze(visionData);
  
  // 3. Gerar expressão
  ExpressionData expression = expressionGenerator.generate(contextData);
  
  // 4. Gerar explicação (XAI)
  String explanation = xaiReasoner.explain(visionData, contextData, expression);
  
  // 5. Enviar dados para backend
  sendDataToBackend(expression, explanation);
  
  // 6. Exibir no Serial
  Serial.println("\n--- Ciclo VEIL ---");
  Serial.printf("Expressão: %s | Confiança: %.2f%%\n", 
                expression.name.c_str(), expression.confidence * 100);
  Serial.printf("Explicação: %s\n", explanation.c_str());
  Serial.println("------------------\n");
  
  delay(5000); // 5 segundos entre ciclos
}
