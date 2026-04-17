#ifndef EXPRESSION_GENERATOR_H
#define EXPRESSION_GENERATOR_H

#include <Arduino.h>
#include "config.h"

/**
 * Expression Generator - Concept to Visual Mapping
 * 
 * CURRENT: Lookup table + simple heuristics
 * FUTURE: Trained neural network (transfer learning)
 * 
 * Translates semantic concept → (shape, color, intensity, effect)
 */
class ExpressionGenerator {
private:
    struct ConceptMapping {
        const char* concept;
        Shape shape;
        Color color;
        uint8_t intensity;
        Effect effect;
    };
    
    static const ConceptMapping mappings[];
    static const int numMappings;
    
    Expression currentExpression;
    
    Expression lookupExpression(String concept);
    Expression interpolateExpression(Emotion emotion);
    
public:
    ExpressionGenerator();
    
    void begin();
    
    Expression generate(String concept, Emotion emotion);
    Expression getCurrentExpression();
    
    // For future neural network
    void loadModel(const char* path);
    float getAccuracy();  // % agreement with human labels
};

#endif // EXPRESSION_GENERATOR_H
