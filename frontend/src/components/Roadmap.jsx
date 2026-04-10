import React from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, Circle } from 'lucide-react';

export const Roadmap = () => {
  const roadmapItems = [
    { phase: 'Concluído', status: 'done', items: [
      'Definição do conceito',
      'Taxonomia de expressões',
      'Prototipação inicial',
    ]},
    { phase: 'Em Desenvolvimento', status: 'progress', items: [
      'Firmware ESP32 MVP',
      'Diretrizes de design visual',
      'SDK Python',
    ]},
    { phase: 'Planejado', status: 'planned', items: [
      'SDK JavaScript',
      'Simulador web interativo',
      'Site de documentação',
      'Biblioteca de expressões ampliada',
      'Suporte para mais displays',
      'Integração ROS',
    ]},
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'done': return 'text-secondary';
      case 'progress': return 'text-primary';
      case 'planned': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'done') {
      return <CheckCircle2 className="h-5 w-5 text-secondary" />;
    }
    return <Circle className="h-5 w-5" />;
  };

  return (
    <section id="roadmap" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient-cyber">Roadmap</span> do Projeto
          </h2>
          <p className="text-lg text-muted-foreground">
            Acompanhe o progresso e as próximas etapas do desenvolvimento do VEIL.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-muted" />
            
            <div className="space-y-8">
              {roadmapItems.map((phase, phaseIndex) => (
                <div key={phaseIndex} className="relative">
                  <Card className="ml-12 bg-card/50 backdrop-blur border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`absolute -left-12 w-8 h-8 rounded-full bg-background border-2 ${phase.status === 'done' ? 'border-secondary' : phase.status === 'progress' ? 'border-primary' : 'border-muted'} flex items-center justify-center`}>
                          {getStatusIcon(phase.status)}
                        </div>
                        <h3 className={`text-xl font-bold ${getStatusColor(phase.status)}`}>
                          {phase.phase}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${phase.status === 'done' ? 'text-secondary' : phase.status === 'progress' ? 'text-primary' : 'text-muted-foreground/50'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;