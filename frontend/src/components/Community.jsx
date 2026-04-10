import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Github, MessageSquare, BookOpen, Mail, Users } from 'lucide-react';

export const Community = () => {
  const communityLinks = [
    {
      icon: Github,
      title: 'GitHub',
      description: 'Contribua com código, reporte issues e acompanhe o desenvolvimento.',
      action: 'Acessar Repositório',
      link: 'https://github.com',
      color: 'text-foreground',
      bgColor: 'bg-foreground/10',
    },
    {
      icon: MessageSquare,
      title: 'Discord',
      description: 'Junte-se à comunidade para tirar dúvidas e compartilhar projetos.',
      action: 'Entrar no Discord',
      link: 'https://discord.com',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: BookOpen,
      title: 'Documentação',
      description: 'Guias completos, referência de API e tutoriais passo a passo.',
      action: 'Ver Documentação',
      link: '#docs',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Users,
      title: 'Contribua',
      description: 'Ajude a melhorar o VEIL com suas ideias, código e feedback.',
      action: 'Como Contribuir',
      link: 'https://github.com',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <section id="community" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Junte-se à <span className="text-gradient-cyber">Comunidade</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            VEIL é um projeto open source. Sua participação é fundamental para o crescimento do framework.
          </p>
        </div>

        {/* Community Links */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {communityLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Card
                key={index}
                className="group bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-lg ${link.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${link.color}`} />
                    </div>
                    <CardTitle className="text-xl">{link.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {link.description}
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                      {link.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Pronto para Começar?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Clone o repositório, explore os exemplos e comece a criar interfaces expressivas para seus robôs hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-cyan" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Clonar Repositório
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#simulator">
                  Testar Simulador
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Community;