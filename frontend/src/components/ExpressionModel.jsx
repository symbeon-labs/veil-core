import React from 'react';
import { Card, CardContent } from './ui/card';
import { Plus, X } from 'lucide-react';

export const ExpressionModel = () => {
  const components = [
    { name: 'Forma', examples: ['Círculo', 'Diamante', 'Angular', 'Oval'], color: 'text-primary' },
    { name: 'Cor', examples: ['Ciano', 'Teal', 'Magenta', 'Amarelo'], color: 'text-secondary' },
    { name: 'Intensidade', examples: ['Baixa', 'Média', 'Alta', 'Máxima'], color: 'text-accent' },
    { name: 'Efeito', examples: ['Estático', 'Pulsar', 'Scanner', 'Girar'], color: 'text-chart-4' },
  ];

  return (
    <section id="docs" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Modelo de <span className="text-gradient-cyber">Expressão</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Cada expressão é composta por quatro componentes fundamentais que podem ser combinados livremente.
            </p>
          </div>

          {/* Formula */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 mb-12">
            <CardContent className="p-8">
              <div className="flex flex-wrap items-center justify-center gap-4 text-xl sm:text-2xl font-mono">
                <span className="text-primary font-bold">Forma</span>
                <Plus className="h-6 w-6 text-muted-foreground" />
                <span className="text-secondary font-bold">Cor</span>
                <Plus className="h-6 w-6 text-muted-foreground" />
                <span className="text-accent font-bold">Intensidade</span>
                <Plus className="h-6 w-6 text-muted-foreground" />
                <span className="text-chart-4 font-bold">Efeito</span>
              </div>
            </CardContent>
          </Card>

          {/* Components Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {components.map((component, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className={`text-2xl font-bold mb-4 ${component.color}`}>
                    {component.name}
                  </h3>
                  <div className="space-y-2">
                    {component.examples.map((example, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <div className={`w-2 h-2 rounded-full ${component.color.replace('text-', 'bg-')}`} />
                        {example}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Context Section */}
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-chart-5">+ Contexto</h3>
              <p className="text-muted-foreground leading-relaxed">
                O contexto adicional pode incluir informações como ID do agente, timestamp, estado do sistema,
                e metadados específicos da aplicação. Isso permite rastreamento e análise completa das
                expressões ao longo do tempo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExpressionModel;