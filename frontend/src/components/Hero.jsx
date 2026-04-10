import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Github, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 glow-cyan">
                <Sparkles className="h-3 w-3 mr-1" />
                Framework Open Source
              </Badge>
              
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gradient-cyber">VEIL</span>
                  <br />
                  <span className="text-foreground">Visual Emotional</span>
                  <br />
                  <span className="text-foreground">Interface Language</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Um framework open source para comunicação de estados internos de agentes autônomos através de expressões oculares robóticas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="glow-cyan text-base" asChild>
                  <a href="#simulator">
                    Experimentar Simulador
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-base border-primary/30 hover:bg-primary/10" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    Ver no GitHub
                  </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">ESP32</div>
                  <div className="text-sm text-muted-foreground">Compatível</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">MQTT</div>
                  <div className="text-sm text-muted-foreground">Integração</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">MIT</div>
                  <div className="text-sm text-muted-foreground">Licença</div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative">
              <div className="relative float">
                <img
                  src="https://images.unsplash.com/photo-1750096319146-6310519b5af2"
                  alt="Robotic Eye Interface"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;