#ifndef VEIL_CONFIG_H
#define VEIL_CONFIG_H

// ========================================
// VEIL Configuration
// ========================================

// Device Configuration
#define DEVICE_ID "esp32_001"  // Unique device ID
#define FIRMWARE_VERSION "1.0.0"

// WiFi Configuration
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// MQTT Configuration
#define MQTT_BROKER "broker.hivemq.com"  // Change to your broker
#define MQTT_PORT 1883
#define MQTT_USER ""  // Leave empty if no auth
#define MQTT_PASS ""

// MQTT Topics
#define TOPIC_STATE "veil/" DEVICE_ID "/state"
#define TOPIC_EXPRESSION "veil/" DEVICE_ID "/expression"
#define TOPIC_TELEMETRY "veil/" DEVICE_ID "/telemetry"
#define TOPIC_CONFIG "veil/broadcast/config"

// Display Configuration
#define DISPLAY_TYPE_OLED  // Options: DISPLAY_TYPE_OLED, DISPLAY_TYPE_TFT
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

// Vision Module Configuration (Simulated)
#define VISION_ENABLED true
#define VISION_INTERVAL_MS 1000  // Update every 1 second

// Expression Configuration
#define MAX_INTENSITY 100
#define DEFAULT_INTENSITY 50

// Timing Configuration
#define TELEMETRY_INTERVAL_MS 5000  // Send telemetry every 5s
#define RECONNECT_DELAY_MS 5000     // WiFi/MQTT reconnect delay

// Debug
#define DEBUG_SERIAL true
#define DEBUG_LATENCY true

// Expression Definitions
enum Shape {
    SHAPE_CIRCLE = 0,
    SHAPE_OVAL = 1,
    SHAPE_DIAMOND = 2,
    SHAPE_ANGULAR = 3,
    SHAPE_SQUINT = 4,
    SHAPE_WIDE = 5
};

enum Color {
    COLOR_CYAN = 0,
    COLOR_TEAL = 1,
    COLOR_MAGENTA = 2,
    COLOR_YELLOW = 3,
    COLOR_RED = 4,
    COLOR_GREEN = 5,
    COLOR_PURPLE = 6,
    COLOR_BLUE = 7
};

enum Effect {
    EFFECT_STATIC = 0,
    EFFECT_BLINK = 1,
    EFFECT_PULSE = 2,
    EFFECT_SCAN = 3,
    EFFECT_SPIN = 4,
    EFFECT_SHAKE = 5
};

// Emotion (VAD - Valence, Arousal, Dominance)
struct Emotion {
    float valence;    // [-1, +1]
    float arousal;    // [-1, +1]
    float dominance;  // [-1, +1]
};

// Expression Structure
struct Expression {
    Shape shape;
    Color color;
    uint8_t intensity;  // [0, 100]
    Effect effect;
};

#endif // VEIL_CONFIG_H
