#include "vision_module.h"
#include <Arduino.h>

void VisionModule::init() {
  Serial.println("[VisionModule] Inicializado (MOCK MODE)");
  randomSeed(analogRead(0));
}

VisionData VisionModule::captureFrame() {
  VisionData data;
  
  // Mock: simular detecção de objetos/faces
  data.objectDetected = (random(100) > 30); // 70% chance de detectar algo
  data.faceDetected = (random(100) > 50);   // 50% chance de face
  data.distance = random(50, 300);          // distância em cm
  data.lightLevel = random(0, 1023);        // sensor luz (0-1023)
  
  // Mock: classificação básica de cenário
  int sceneType = random(0, 4);
  switch(sceneType) {
    case 0: data.sceneType = "indoor"; break;
    case 1: data.sceneType = "outdoor"; break;
    case 2: data.sceneType = "interaction"; break;
    case 3: data.sceneType = "idle"; break;
  }
  
  // Mock: confiança do modelo
  data.modelConfidence = random(60, 100) / 100.0;
  
  return data;
}

bool VisionModule::processFrame(uint8_t* frameBuffer, size_t bufferSize) {
  // Próxima fase: implementar TFLite Micro aqui
  return true;
}
