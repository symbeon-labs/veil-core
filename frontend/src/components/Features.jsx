import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Eye, Zap, Cpu, Palette, Globe, Code } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: Eye,
      title: 'Sistema Modular de Expressões',
      description: 'Combinação flexível de forma, cor, intensidade e efeitos para criar expressões únicas e significativas.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Zap,
      title: 'Comunicação em Tempo Real',
      description: 'Integração MQTT e WebSocket para atualização instantânea de estados e expressões.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Cpu,
      title: 'Hardware Agnóstico',
      description: 'Compatível com ESP32, displays OLED, TFT e matrizes LED. Adapte ao seu hardware existente.',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Palette,
      title: 'Biblioteca de Expressões',
      description: 'Biblioteca pré-definida com mais de 50 expressões prontas para uso em diversos contextos.',
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
    {
      icon: Globe,
      title: 'Open Source & Extensível',
      description: 'Código aberto sob licença MIT. Contribua e adapte às suas necessidades específicas.',
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
    },
    {
      icon: Code,
      title: 'SDKs para Python e JavaScript',
      description: 'Bibliotecas oficiais para facilitar a integração em seus projetos.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient-cyber">Recursos</span> Poderosos
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa para criar interfaces expressivas e intuitivas para seus agentes robóticos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;