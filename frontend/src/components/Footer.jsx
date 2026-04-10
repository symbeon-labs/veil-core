import React from 'react';
import { Eye, Github, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Produto: [
      { label: 'Recursos', href: '#features' },
      { label: 'Simulador', href: '#simulator' },
      { label: 'Documentação', href: '#docs' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
    Desenvolvedores: [
      { label: 'Exemplos de Código', href: '#examples' },
      { label: 'SDK Python', href: '#' },
      { label: 'SDK JavaScript', href: '#' },
      { label: 'Hardware', href: '#hardware' },
    ],
    Comunidade: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Discord', href: 'https://discord.com' },
      { label: 'Contribuir', href: 'https://github.com' },
      { label: 'Licença MIT', href: 'https://opensource.org/licenses/MIT' },
    ],
  };

  return (
    <footer className="relative border-t border-border bg-background/50 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="relative">
                <Eye className="h-8 w-8 text-primary glow-cyan transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
              </div>
              <span className="text-xl font-bold text-gradient-cyber">VEIL</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Framework open source para comunicação expressiva de estados em agentes robóticos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@veil.dev"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VEIL Framework. Licença MIT.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="h-4 w-4 text-accent fill-accent" /> pela comunidade
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;