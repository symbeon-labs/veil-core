import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export const CodeExamples = () => {
  const examples = {
    python: {
      basic: `from veil import VEILController, Expression

# Inicializar controlador
controller = VEILController(
    device_id="robot_01",
    mqtt_broker="broker.hivemq.com"
)

# Criar e aplicar expressão
expression = Expression(
    shape="circle",
    color="cyan",
    intensity=70,
    effect="pulse"
)

controller.set_expression(expression)
print("Expressão aplicada com sucesso!")`,
      advanced: `from veil import VEILController, Expression
import time

controller = VEILController("robot_01")

# Sequência de expressões
sequence = [
    Expression("circle", "cyan", 50, "pulse"),
    Expression("diamond", "teal", 70, "scan"),
    Expression("angular", "magenta", 90, "blink")
]

# Executar sequência
for expr in sequence:
    controller.set_expression(expr)
    time.sleep(2)

# Retornar ao estado ocioso
controller.set_expression("idle")`,
      mqtt: `from veil import VEILController
import json

controller = VEILController("robot_01")

# Callback para mensagens MQTT
def on_message(topic, payload):
    data = json.loads(payload)
    expression = Expression(**data['expression'])
    controller.set_expression(expression)
    print(f"Estado atualizado: {data['state']}")

# Subscrever tópico
controller.subscribe("robot/expression", on_message)
controller.run()  # Manter escutando`
    },
    javascript: {
      basic: `import { VEILController, Expression } from 'veil-js';

// Inicializar controlador
const controller = new VEILController({
  deviceId: 'robot_01',
  mqttBroker: 'broker.hivemq.com'
});

// Criar e aplicar expressão
const expression = new Expression({
  shape: 'circle',
  color: 'cyan',
  intensity: 70,
  effect: 'pulse'
});

await controller.setExpression(expression);
console.log('Expressão aplicada com sucesso!');`,
      advanced: `import { VEILController, Expression } from 'veil-js';

const controller = new VEILController('robot_01');

// Sequência de expressões
const sequence = [
  new Expression({ shape: 'circle', color: 'cyan', intensity: 50, effect: 'pulse' }),
  new Expression({ shape: 'diamond', color: 'teal', intensity: 70, effect: 'scan' }),
  new Expression({ shape: 'angular', color: 'magenta', intensity: 90, effect: 'blink' })
];

// Executar sequência
for (const expr of sequence) {
  await controller.setExpression(expr);
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Retornar ao estado ocioso
await controller.setExpression('idle');`,
      mqtt: `import { VEILController } from 'veil-js';

const controller = new VEILController('robot_01');

// Callback para mensagens MQTT
controller.on('message', (topic, payload) => {
  const data = JSON.parse(payload);
  const expression = new Expression(data.expression);
  controller.setExpression(expression);
  console.log(\`Estado atualizado: \${data.state}\`);
});

// Subscrever tópico
await controller.subscribe('robot/expression');
console.log('Aguardando mensagens...');`
    },
    arduino: {
      basic: `#include <VEIL.h>

// Criar instância VEIL
VEIL veil(OLED_SSD1306);

void setup() {
  Serial.begin(115200);
  
  // Inicializar VEIL
  veil.begin();
  
  // Aplicar expressão
  veil.setShape(SHAPE_CIRCLE);
  veil.setColor(COLOR_CYAN);
  veil.setIntensity(70);
  veil.setEffect(EFFECT_PULSE);
  veil.apply();
}

void loop() {
  veil.update();
  delay(10);
}`,
      advanced: `#include <VEIL.h>

VEIL veil(OLED_SSD1306);

// Definir estados
Expression idle = {SHAPE_CIRCLE, COLOR_CYAN, 50, EFFECT_PULSE};
Expression processing = {SHAPE_DIAMOND, COLOR_TEAL, 70, EFFECT_SCAN};
Expression error = {SHAPE_ANGULAR, COLOR_RED, 100, EFFECT_SHAKE};

void setup() {
  veil.begin();
  veil.setExpression(idle);
}

void loop() {
  // Simular estados
  veil.setExpression(idle);
  delay(2000);
  
  veil.setExpression(processing);
  delay(2000);
  
  veil.update();
}`,
      mqtt: `#include <VEIL.h>
#include <WiFi.h>
#include <PubSubClient.h>

VEIL veil(OLED_SSD1306);
WiFiClient espClient;
PubSubClient mqtt(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  // Parsear JSON e aplicar expressão
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, payload, length);
  
  veil.setShape(doc["shape"]);
  veil.setColor(doc["color"]);
  veil.setIntensity(doc["intensity"]);
  veil.setEffect(doc["effect"]);
  veil.apply();
}

void setup() {
  veil.begin();
  mqtt.setServer("broker.hivemq.com", 1883);
  mqtt.setCallback(callback);
  mqtt.subscribe("robot/expression");
}`
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Código copiado!');
  };

  return (
    <section id="examples" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Exemplos de <span className="text-gradient-cyber">Código</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece rapidamente com exemplos práticos em Python, JavaScript e Arduino.
          </p>
        </div>

        {/* Code Examples */}
        <Card className="max-w-5xl mx-auto bg-card/50 backdrop-blur border-border">
          <CardContent className="p-6">
            <Tabs defaultValue="python" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="arduino">Arduino</TabsTrigger>
              </TabsList>

              {['python', 'javascript', 'arduino'].map((lang) => (
                <TabsContent key={lang} value={lang}>
                  <div className="space-y-6">
                    {/* Basic Example */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-foreground">Exemplo Básico</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyCode(examples[lang].basic)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{examples[lang].basic}</code>
                      </pre>
                    </div>

                    {/* Advanced Example */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-foreground">Exemplo Avançado</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyCode(examples[lang].advanced)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{examples[lang].advanced}</code>
                      </pre>
                    </div>

                    {/* MQTT Example */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-foreground">Integração MQTT</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyCode(examples[lang].mqtt)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{examples[lang].mqtt}</code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CodeExamples;