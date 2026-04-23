import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Brain, Database, ShieldCheck, Activity } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const items = [
    {
      title: "Total de Ciclos",
      value: stats?.summary?.total_samples || 0,
      icon: Database,
      color: "text-blue-400"
    },
    {
      title: "Confiança Média",
      value: `${((stats?.expressions?.reduce((acc, curr) => acc + curr.avg_confidence, 0) || 0) / (stats?.expressions?.length || 1) * 100).toFixed(1)}%`,
      icon: ShieldCheck,
      color: "text-green-400"
    },
    {
      title: "Expressões Ativas",
      value: stats?.expressions?.length || 0,
      icon: Activity,
      color: "text-purple-400"
    },
    {
      title: "Auditoria UEAP",
      value: "Verificado",
      icon: Brain,
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <Card key={index} className="bg-background/50 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
