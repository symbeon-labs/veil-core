import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Brain, Eye, Sparkles, Network, Zap, TrendingUp } from 'lucide-react';

export const AIEngine = () => {
  const capabilities = [
    {
      icon: Eye,
      title: 'Reconhecimento de Expressões Humanas',
      description: 'Modelos de visão computacional analisam expressões faciais humanas e micro-expressões para entender padrões emocionais naturais.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Brain,
      title: 'Aprendizado Contextual',
      description: 'Qwen 2.5 Coder 7B processa contexto situacional e histórico de interações para determinar a expressão mais apropriada.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Network,
      title: 'Ponte Explicável',
      description: 'Sistema de raciocínio transparente que explica por que uma expressão específica foi escolhida em cada contexto.',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const workflow = [
    {
      step: '1',
      title: 'Captura de Padrões',
      description: 'Modelo de visão local analisa interações humano-robô e identifica expressões faciais correspondentes a estados emocionais',
      icon: Eye,
    },
    {
      step: '2',
      title: 'Processamento Contextual',
      description: 'IA local (Qwen 2.5) correlaciona estados internos do agente com padrões de expressão humana apropriados',
      icon: Brain,
    },
    {
      step: '3',
      title: 'Geração Adaptativa',
      description: 'Motor generativo cria expressões que comunicam o estado interno de forma natural e compreensível',
      icon: Sparkles,
    },
    {
      step: '4',
      title: 'Aprendizado Contínuo',
      description: 'Sistema evolui baseado em feedback e novas interações, refinando o mapeamento estado-expressão',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="ai-engine" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-background opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
            <Brain className="h-3 w-3 mr-1" />
            Próxima Evolução
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Motor de <span className="text-gradient-cyber">IA Adaptativa</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Sistema generativo que aprende com expressões humanas e cria uma ponte explicável entre 
            estados internos de IA e comunicação emocional natural.
          </p>
        </div>

        {/* Core Concept */}
        <Card className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 backdrop-blur border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0 glow-cyan">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Por que IA Adaptativa?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Expressões não são apenas outputs visuais - são uma linguagem emocional complexa. 
                  Um motor de IA local permite que robôs <strong className="text-foreground">aprendam</strong> quando 
                  e como usar expressões de forma natural, não apenas programada.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                    <div className="text-2xl font-bold text-primary mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Local & Privado</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-secondary/20">
                    <div className="text-2xl font-bold text-secondary mb-1">Real-time</div>
                    <div className="text-sm text-muted-foreground">Inferência Local</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-accent/20">
                    <div className="text-2xl font-bold text-accent mb-1">Explicável</div>
                    <div className="text-sm text-muted-foreground">Raciocínio Claro</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capabilities */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${capability.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${capability.color}`} />
                  </div>
                  <CardTitle className="text-xl">{capability.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Workflow */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Como Funciona o <span className="text-gradient-cyber">Sistema Adaptativo</span>
          </h3>
          
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden lg:block" />
            
            <div className="space-y-8">
              {workflow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative">
                    <Card className="ml-0 lg:ml-20 bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* Step Number Circle */}
                          <div className="absolute -left-0 lg:-left-20 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 glow-cyan">
                            <span className="text-2xl font-bold text-background">{item.step}</span>
                          </div>
                          
                          <div className="flex-1 lg:ml-0">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <Card className="max-w-5xl mx-auto mt-16 bg-card/50 backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              Stack Tecnológica Proposta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Modelos de IA Local</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Qwen 2.5 Coder 7B:</strong> Processamento de contexto e raciocínio
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Modelos de Visão:</strong> Detecção facial e análise de expressões
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">ONNX Runtime:</strong> Inferência otimizada em edge devices
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Arquitetura</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Edge Computing:</strong> Processamento local sem dependência de cloud
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Transfer Learning:</strong> Fine-tuning com dados específicos de uso
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Explainable AI:</strong> Sistema de justificativa de decisões
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Use Case */}
        <Card className="max-w-5xl mx-auto mt-8 bg-gradient-to-br from-accent/5 to-chart-4/5 border-accent/20">
          <CardContent className="p-8">
            <h4 className="text-xl font-bold mb-4 text-foreground">Exemplo Prático</h4>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Cenário:</strong> Robô assistente detecta que usuário parece frustrado (via visão computacional).
              </p>
              <div className="bg-background/50 rounded-lg p-4 border border-primary/20 space-y-2 text-sm font-mono">
                <div><span className="text-secondary">1.</span> <span className="text-muted-foreground">Detecta expressão facial: frustração</span></div>
                <div><span className="text-secondary">2.</span> <span className="text-muted-foreground">Analisa contexto: tarefa em andamento com erros</span></div>
                <div><span className="text-secondary">3.</span> <span className="text-muted-foreground">IA sugere: expressão de "empatia + atenção"</span></div>
                <div><span className="text-secondary">4.</span> <span className="text-primary">Aplica: Olho oval, cor azul (calmo), intensidade 60%, efeito pulse</span></div>
                <div><span className="text-secondary">5.</span> <span className="text-accent">Justificativa: "Estado empático para reduzir tensão do usuário"</span></div>
              </div>
              <p className="text-sm">
                O sistema não apenas escolhe uma expressão, mas <strong className="text-foreground">entende o contexto emocional</strong> e 
                aplica o equivalente robótico de uma expressão humana natural.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIEngine;
