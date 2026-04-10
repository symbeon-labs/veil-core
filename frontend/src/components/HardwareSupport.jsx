import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Cpu, Monitor, Zap, CheckCircle2 } from 'lucide-react';

export const HardwareSupport = () => {
  const hardwareOptions = [
    {
      category: 'Microcontroladores',
      icon: Cpu,
      items: [
        { name: 'ESP32', status: 'full', specs: 'Dual-core, Wi-Fi, Bluetooth' },
        { name: 'ESP8266', status: 'partial', specs: 'Wi-Fi, Single-core' },
        { name: 'Arduino Uno', status: 'partial', specs: 'ATmega328P' },
        { name: 'Raspberry Pi Pico', status: 'full', specs: 'RP2040, Dual-core' },
      ]
    },
    {
      category: 'Displays',
      icon: Monitor,
      items: [
        { name: 'OLED SSD1306', status: 'full', specs: '128x64, I2C/SPI' },
        { name: 'TFT ST7789', status: 'full', specs: '240x240, SPI' },
        { name: 'TFT ILI9341', status: 'full', specs: '320x240, SPI' },
        { name: 'LED Matrix MAX7219', status: 'full', specs: '8x8, SPI' },
      ]
    },
    {
      category: 'Interfaces',
      icon: Zap,
      items: [
        { name: 'MQTT', status: 'full', specs: 'Protocolo de mensageria' },
        { name: 'WebSocket', status: 'full', specs: 'Comunicação em tempo real' },
        { name: 'Serial', status: 'full', specs: 'USB/UART' },
        { name: 'HTTP REST', status: 'partial', specs: 'API REST' },
      ]
    },
  ];

  const getStatusBadge = (status) => {
    if (status === 'full') {
      return (
        <Badge className="bg-secondary/20 text-secondary border-secondary/30">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completo
        </Badge>
      );
    }
    return (
      <Badge className="bg-chart-5/20 text-chart-5 border-chart-5/30">
          Parcial
      </Badge>
    );
  };

  return (
    <section id="hardware" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Suporte de <span className="text-gradient-cyber">Hardware</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            VEIL é compatível com uma ampla variedade de microcontroladores, displays e protocolos de comunicação.
          </p>
        </div>

        {/* Hardware Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {hardwareOptions.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card
                key={categoryIndex}
                className="bg-card/50 backdrop-blur border-border"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="border border-border rounded-lg p-3 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium text-foreground">{item.name}</span>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.specs}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Start */}
        <Card className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Começar Rápido</h3>
            <Tabs defaultValue="esp32" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="esp32">ESP32</TabsTrigger>
                <TabsTrigger value="oled">OLED</TabsTrigger>
                <TabsTrigger value="mqtt">MQTT</TabsTrigger>
              </TabsList>
              <TabsContent value="esp32" className="mt-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-foreground">Configuração ESP32</h4>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`// Instalar biblioteca
// Arduino IDE: Library Manager > VEIL

#include <VEIL.h>

VEIL veil(OLED_SSD1306);

void setup() {
  veil.begin();
  veil.setExpression("idle");
}`}</code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="oled" className="mt-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-foreground">Conexão OLED</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VCC</span>
                      <span className="text-primary font-mono">→ 3.3V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GND</span>
                      <span className="text-primary font-mono">→ GND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SCL</span>
                      <span className="text-primary font-mono">→ GPIO 22</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SDA</span>
                      <span className="text-primary font-mono">→ GPIO 21</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="mqtt" className="mt-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-foreground">Integração MQTT</h4>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`// Publicar expressão via MQTT
veil.enableMQTT("broker.hivemq.com");
veil.subscribeTopic("robot/expression");

// Formato de mensagem
{
  "shape": "diamond",
  "color": "cyan",
  "intensity": 80,
  "effect": "pulse"
}`}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HardwareSupport;