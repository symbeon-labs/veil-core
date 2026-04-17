import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { Copy, Download, Play, RefreshCw } from 'lucide-react';

export const ExpressionSimulator = () => {
  const [shape, setShape] = useState('circle');
  const [color, setColor] = useState('cyan');
  const [intensity, setIntensity] = useState(50);
  const [effect, setEffect] = useState('static');
  const [isPlaying, setIsPlaying] = useState(false);
  const [xaiJustification, setXaiJustification] = useState("O sistema iniciou em modo manual. Acione o motor VEIL para raciocínio autônomo.");
  const [isProcessing, setIsProcessing] = useState(false);
  const shapes = [
    { value: 'circle', label: 'Círculo', path: 'M 50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0' },
    { value: 'oval', label: 'Oval', path: 'M 50 35 a 35 15 0 1 0 0 30 a 35 15 0 1 0 0 -30' },
    { value: 'diamond', label: 'Diamante', path: 'M 50 10 L 90 50 L 50 90 L 10 50 Z' },
    { value: 'angular', label: 'Angular', path: 'M 20 30 L 50 10 L 80 30 L 80 70 L 50 90 L 20 70 Z' },
    { value: 'squint', label: 'Semicerrado', path: 'M 10 50 Q 30 30 50 50 Q 70 30 90 50' },
    { value: 'wide', label: 'Largo', path: 'M 10 50 m 0 -30 a 40 30 0 1 0 80 0 a 40 30 0 1 0 -80 0' },
  ];

  const colors = [
    { value: 'cyan', label: 'Ciano', color: 'hsl(187 100% 50%)', description: 'Neutro/Normal' },
    { value: 'teal', label: 'Teal', color: 'hsl(167 85% 45%)', description: 'Processando' },
    { value: 'magenta', label: 'Magenta', color: 'hsl(345 100% 60%)', description: 'Alerta' },
    { value: 'yellow', label: 'Amarelo', color: 'hsl(45 90% 55%)', description: 'Atenção' },
    { value: 'red', label: 'Vermelho', color: 'hsl(0 84% 60%)', description: 'Erro' },
    { value: 'green', label: 'Verde', color: 'hsl(120 70% 50%)', description: 'Sucesso' },
    { value: 'purple', label: 'Roxo', color: 'hsl(280 65% 60%)', description: 'Pensando' },
    { value: 'blue', label: 'Azul', color: 'hsl(220 70% 50%)', description: 'Calmo' },
  ];

  const effects = [
    { value: 'static', label: 'Estático', description: 'Sem animação' },
    { value: 'blink', label: 'Piscar', description: 'Pisca periodicamente' },
    { value: 'pulse', label: 'Pulsar', description: 'Pulsa suavemente' },
    { value: 'scan', label: 'Scanner', description: 'Linha de escaneamento' },
    { value: 'spin', label: 'Girar', description: 'Rotação contínua' },
    { value: 'shake', label: 'Tremer', description: 'Tremor rápido' },
  ];

  const presets = [
    { name: 'Ocioso', shape: 'circle', color: 'cyan', intensity: 30, effect: 'pulse' },
    { name: 'Processando', shape: 'diamond', color: 'teal', intensity: 70, effect: 'scan' },
    { name: 'Alerta', shape: 'angular', color: 'magenta', intensity: 90, effect: 'pulse' },
    { name: 'Erro', shape: 'squint', color: 'red', intensity: 100, effect: 'shake' },
    { name: 'Sucesso', shape: 'wide', color: 'green', intensity: 80, effect: 'blink' },
    { name: 'Pensando', shape: 'oval', color: 'purple', intensity: 60, effect: 'spin' },
  ];

  const getCurrentColor = () => {
    const colorObj = colors.find(c => c.value === color);
    return colorObj ? colorObj.color : 'hsl(187 100% 50%)';
  };

  const getCurrentShape = () => {
    const shapeObj = shapes.find(s => s.value === shape);
    return shapeObj ? shapeObj.path : shapes[0].path;
  };

  const getAnimationClass = () => {
    if (!isPlaying) return '';
    switch(effect) {
      case 'blink': return 'animate-blink';
      case 'pulse': return 'animate-pulse-custom';
      case 'scan': return 'animate-scan';
      case 'spin': return 'animate-spin-slow';
      case 'shake': return 'animate-shake';
      default: return '';
    }
  };

  const generateCode = (language) => {
    const colorHex = getCurrentColor();
    if (language === 'json') {
      return JSON.stringify({
        agent_id: 'robot_01',
        timestamp: new Date().toISOString(),
        state: 'custom',
        expression: {
          shape: shape,
          color: color,
          intensity: intensity,
          effect: effect
        }
      }, null, 2);
    } else if (language === 'python') {
      return `from veil import Expression, VEILController

# Criar expressão
expression = Expression(
    shape="${shape}",
    color="${color}",
    intensity=${intensity},
    effect="${effect}"
)

# Aplicar ao dispositivo
controller = VEILController(device_id="robot_01")
controller.set_expression(expression)`;
    } else {
      return `import { Expression, VEILController } from 'veil-js';

// Create expression
const expression = new Expression({
  shape: "${shape}",
  color: "${color}",
  intensity: ${intensity},
  effect: "${effect}"
});

// Apply to device
const controller = new VEILController("robot_01");
controller.setExpression(expression);`;
    }
  };

  const copyCode = (language) => {
    navigator.clipboard.writeText(generateCode(language));
    toast.success(`Código ${language.toUpperCase()} copiado!`);
  };

  const applyPreset = (preset) => {
    setShape(preset.shape);
    setColor(preset.color);
    setIntensity(preset.intensity);
    setEffect(preset.effect);
    setIsPlaying(true);
    toast.success(`Preset "${preset.name}" aplicado!`);
  };

  const inferEmotionFromBackend = async () => {
    setIsProcessing(true);
    setXaiJustification("Analisando estímulo (Aguardando XAI Adapter)...");
    
    try {
      const response = await fetch("http://localhost:8000/api/veil/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sensor_id: "web_simulator_01",
          payload_size: 1024,
          data: "mock_bytes_from_browser_lidar"
        })
      });

      const result = await response.json();
      if (result.status === "success") {
        const expressionOutput = result.data.expression_output.components;
        // The generator currently sends: shape, color, effect.
        if (expressionOutput) {
          setShape(expressionOutput.shape || "circle");
          setColor(expressionOutput.color || "cyan");
          setEffect(expressionOutput.effect || "static");
          setIntensity(85); // Auto-intensity based on emotion
          setIsPlaying(true);
        }
        setXaiJustification(result.data.xai_justification || "Expressão gerada com sucesso pela regra determinística.");
        toast.success("Cognição emocional completa via API Local.");
      } else {
        toast.error("Erro no motor VEIL: " + result.message);
        setXaiJustification("Falha na conexão com o orquestrador.");
      }
    } catch (error) {
      toast.error("Servidor VEIL offline. Execute: uvicorn backend.server:app");
      setXaiJustification("Servidor Offline. Rode o uvicorn para habilitar o Edge Pipeline.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="simulator" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Simulador Interativo
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Experimente o <span className="text-gradient-cyber">VEIL</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Crie e teste expressões oculares em tempo real. Ajuste forma, cor, intensidade e efeitos para visualizar como seu robô se comunicará.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Eye Display */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle>Visualização</CardTitle>
                <CardDescription>Preview da expressão em tempo real</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Eye Display */}
                <div className="relative aspect-square bg-gradient-to-br from-background to-muted/20 rounded-xl flex items-center justify-center p-8">
                  <div className="absolute inset-0 grid-background opacity-10 rounded-xl" />
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-full h-full drop-shadow-2xl ${getAnimationClass()}`}
                    style={{
                      filter: `drop-shadow(0 0 ${intensity / 5}px ${getCurrentColor()})`
                    }}
                  >
                    <path
                      d={getCurrentShape()}
                      fill={getCurrentColor()}
                      opacity={intensity / 100}
                      stroke={getCurrentColor()}
                      strokeWidth="2"
                    />
                    {effect === 'scan' && isPlaying && (
                      <line
                        x1="10"
                        y1="50"
                        x2="90"
                        y2="50"
                        stroke={getCurrentColor()}
                        strokeWidth="1"
                        opacity="0.8"
                        className="scan-line"
                      />
                    )}
                  </svg>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    variant={isPlaying ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setIsPlaying(!isPlaying)}
                    data-testid="play-pause-button"
                  >
                    {isPlaying ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShape('circle');
                      setColor('cyan');
                      setIntensity(50);
                      setEffect('static');
                      setIsPlaying(false);
                    }}
                    data-testid="reset-button"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Presets */}
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Presets Rápidos</CardTitle>
                <CardDescription>Expressões pré-configuradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className="justify-start"
                      onClick={() => applyPreset(preset)}
                      data-testid={`preset-${preset.name.toLowerCase()}`}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Controls & Code & XAI */}
          <div className="space-y-6">
            
            {/* VEIL XAI Engine Box */}
            <Card className="bg-primary/5 backdrop-blur border-primary shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <RefreshCw className="w-24 h-24" />
              </div>
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Play className="w-5 h-5" /> Motor VEIL Core
                </CardTitle>
                <CardDescription>Inferência Dinâmica (API Python Local)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={inferEmotionFromBackend} 
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/80 hover:to-cyan-500/80"
                >
                  {isProcessing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Ativar Percepção Neural (Lidar Mock)
                </Button>
                <div className="bg-background/80 p-4 rounded-lg font-mono text-sm border border-border">
                  <span className="text-muted-foreground block mb-2">// Auditoria Explicável (XAI Log)</span>
                  <p className="text-foreground leading-relaxed">{xaiJustification}</p>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Controles</CardTitle>
                <CardDescription>Personalize a expressão</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shape */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Forma</label>
                  <Select value={shape} onValueChange={setShape}>
                    <SelectTrigger data-testid="shape-trigger">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {shapes.map((s) => (
                        <SelectItem key={s.value} value={s.value} data-testid={`shape-${s.value}`}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cor</label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger data-testid="color-trigger">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {colors.map((c) => (
                        <SelectItem key={c.value} value={c.value} data-testid={`color-${c.value}`}>
                          <div className="flex items-center gap-2 pointer-events-none">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: c.color }}
                            />
                            <span>{c.label} - {c.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Intensidade</label>
                    <span className="text-sm text-muted-foreground">{intensity}%</span>
                  </div>
                  <Slider
                    value={[intensity]}
                    onValueChange={(val) => setIntensity(val[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Effect */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Efeito</label>
                  <Select value={effect} onValueChange={setEffect}>
                    <SelectTrigger data-testid="effect-trigger">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {effects.map((e) => (
                        <SelectItem key={e.value} value={e.value} data-testid={`effect-${e.value}`}>
                          {e.label} - {e.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Code Export */}
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Exportar Código</CardTitle>
                <CardDescription>Use esta expressão no seu projeto</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="json" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="json">JSON</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="json" className="mt-4">
                    <div className="relative">
                      <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                        <code>{generateCode('json')}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyCode('json')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="python" className="mt-4">
                    <div className="relative">
                      <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                        <code>{generateCode('python')}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyCode('python')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="javascript" className="mt-4">
                    <div className="relative">
                      <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                        <code>{generateCode('javascript')}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyCode('javascript')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 45%, 55%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes pulse-custom {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-50px); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        .animate-blink {
          animation: blink 2s infinite;
        }
        
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
        
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-shake {
          animation: shake 0.3s infinite;
        }
      `}</style>
    </section>
  );
};

export default ExpressionSimulator;
