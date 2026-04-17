#ifndef XAI_REASONER_H
#define XAI_REASONER_H

#include <Arduino.h>
#include "config.h"

/**
 * XAI Reasoner - Explainable AI
 * 
 * Generates human-understandable explanations for expression choices
 * Based on semantic knowledge graph (shape meanings, color psychology)
 */
class XAIReasoner {
private:
    struct KnowledgeEntry {
        const char* key;
        const char* meaning;
    };
    
    static const KnowledgeEntry shapeMeanings[];
    static const KnowledgeEntry colorPsychology[];
    static const KnowledgeEntry effectMeanings[];
    
    String emotionDescription(Emotion emotion);
    
public:
    XAIReasoner();
    
    void begin();
    
    String explain(Expression expr, String agentState, Emotion userEmotion);
    
    String getShapeMeaning(Shape shape);
    String getColorMeaning(Color color);
    String getEffectMeaning(Effect effect);
};

#endif // XAI_REASONER_H
