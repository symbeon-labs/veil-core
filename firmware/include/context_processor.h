#ifndef CONTEXT_PROCESSOR_H
#define CONTEXT_PROCESSOR_H

#include <Arduino.h>
#include "config.h"

/**
 * Context Processor - LLM-based Reasoning
 * 
 * CURRENT: Rule-based system
 * FUTURE: Qwen 2.5 Coder 1.5B (quantized Q4)
 * 
 * Processes agent state + user emotion → expression concept
 */
class ContextProcessor {
private:
    String agentState;
    Emotion userEmotion;
    unsigned long lastProcessTime;
    
    // Rule-based system (placeholder for LLM)
    String generateConcept(String state, Emotion emotion);
    
public:
    ContextProcessor();
    
    void begin();
    
    String process(String agentState, Emotion userEmotion);
    void setAgentState(String state);
    
    unsigned long getProcessingTime();  // milliseconds
};

#endif // CONTEXT_PROCESSOR_H
