import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { RefreshCcw, ShieldCheck, Clock } from 'lucide-react';
import DashboardStats from './DashboardStats';
import ExpressionChart from './ExpressionChart';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard = () => {
  const [telemetry, setTelemetry] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [latestRes, statsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/telemetry/latest?limit=10`),
          axios.get(`${BACKEND_URL}/api/telemetry/stats`)
        ]);
        setTelemetry(latestRes.data.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Erro ao buscar telemetria:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Auto-refresh a cada 10s
    return () => clearInterval(interval);
  }, [refreshKey, BACKEND_URL]);

  return (
    <section id="analytics" className="py-20 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Córtex Analytics Dashboard
            </h2>
            <p className="text-muted-foreground mt-1">
              Monitoramento biométrico e auditoria XAI em tempo real.
            </p>
          </div>
          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20 transition-all"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Sincronizar Córtex
          </button>
        </div>

        <DashboardStats stats={stats} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
          <Card className="md:col-span-4 bg-background/50 border-white/5 backdrop-blur-md">
            <CardHeader Gallant-Dark>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                Distribuição de Expressões
              </CardTitle>
              <CardDescription>Frequência de estados emocionais detectados pelo VisionModel.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpressionChart data={stats?.expressions} />
            </CardContent>
          </Card>

          <Card className="md:col-span-3 bg-background/50 border-white/5 backdrop-blur-md overflow-hidden">
            <CardHeader Gallant-Dark>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-400" />
                Live Feed (XAI)
              </CardTitle>
              <CardDescription>Últimas inferências justificadas pelo rEasoner.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5 max-h-[350px] overflow-y-auto custom-scrollbar">
                {telemetry.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-emerald-300 uppercase text-xs tracking-wider">
                        {item.expression}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {format(new Date(item.server_timestamp), 'HH:mm:ss', { locale: ptBR })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.explanation}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-[9px] py-0 border-white/10 font-mono">
                        V: {item.valence}
                      </Badge>
                      <Badge variant="outline" className="text-[9px] py-0 border-white/10 font-mono">
                        A: {item.arousal}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
