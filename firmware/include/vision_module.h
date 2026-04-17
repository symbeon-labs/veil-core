#ifndef VISION_MODULE_H
#define VISION_MODULE_H

#include <Arduino.h>
#include "config.h"

/**
 * Vision Module - Emotion Detection
 * 
 * CURRENT: Simulated emotion detection
 * FUTURE: MobileNetV3 + TensorFlow Lite Micro
 * 
 * Detects human emotions from facial expressions
 * and outputs VAD (Valence, Arousal, Dominance) vector
 */
class VisionModule {
private:
    Emotion currentEmotion;
    unsigned long lastUpdate;
    bool enabled;
    
    // Simulation: Random walk for demo purposes
    float smoothValue(float current, float target, float alpha = 0.3);
    
public:
    VisionModule();
    
    void begin();
    void update();
    
    Emotion getEmotion();
    bool isReady();
    
    // For future integration
    void setModelPath(const char* path);
    float getInferenceTime();  // milliseconds
};

#endif // VISION_MODULE_H
