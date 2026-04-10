import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Factory, Smile, Brain, Home, Wrench, Gamepad2 } from 'lucide-react';

export const UseCases = () => {
  const useCases = [
    {
      icon: Smile,
      title: 'Robótica Social',
      description: 'Robôs de serviço e companhia que comunicam emoções e estados de forma intuitiva para melhorar a interação humano-robô.',
      gradient: 'from-primary/20 to-secondary/20',
      examples: ['Robôs assistentes', 'Companheiros', 'Educação']
    },
    {
      icon: Factory,
      title: 'Indústria 4.0',
      description: 'Máquinas autônomas que indicam status operacional, erros e alertas de manutenção de forma visível e instantânea.',
      gradient: 'from-secondary/20 to-accent/20',
      examples: ['AGVs', 'Braços robóticos', 'Linha de produção']
    },
    {
      icon: Brain,
      title: 'IA Física',
      description: 'Interfaces tangíveis para agentes de IA que aumentam a transparência e confiabilidade em sistemas autônomos.',
      gradient: 'from-accent/20 to-chart-4/20',
      examples: ['Assistentes IA', 'Sistemas de decisão', 'Monitoramento']
    },
    {
      icon: Home,
      title: 'IoT Doméstico',
      description: 'Dispositivos inteligentes com feedback visual expressivo para estados do sistema e notificações.',
      gradient: 'from-chart-4/20 to-chart-5/20',
      examples: ['Smart home', 'Segurança', 'Automação']
    },
    {
      icon: Wrench,
      title: 'Manutenção Preditiva',
      description: 'Equipamentos que comunicam estado de saúde, necessidade de manutenção e diagnósticos visuais.',
      gradient: 'from-chart-5/20 to-primary/20',
      examples: ['Diagnóstico', 'Alertas', 'Telemetria']
    },
    {
      icon: Gamepad2,
      title: 'Entretenimento',
      description: 'Personagens e NPCs em jogos e animações com expressões dinâmicas e emocionais.',
      gradient: 'from-secondary/20 to-primary/20',
      examples: ['Jogos', 'Animação', 'VR/AR']
    },
  ];

  return (
    <section className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Casos de <span className="text-gradient-cyber">Uso</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            VEIL pode ser aplicado em diversos domínios para melhorar a comunicação entre máquinas e humanos.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card
                key={index}
                className="group bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <CardHeader className="relative">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.examples.map((example, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;