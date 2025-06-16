
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { BarChart3, Brain, TrendingUp, Users, Database, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dashboard de Análise
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Análise avançada de conversas e métricas de performance dos agentes
          </p>
          <Badge variant="outline" className="mt-4">
            <Database className="w-4 h-4 mr-2" />
            Conectado ao Supabase
          </Badge>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Dashboard Principal</CardTitle>
                  <CardDescription>
                    Análise completa de métricas e performance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Acesse visualizações detalhadas, análises de sentimento e métricas de tempo para todos os agentes.
              </p>
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="w-full"
              >
                Acessar Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-green-200">
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Zap className="w-3 h-3 mr-1" />
                Otimizado
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <CardTitle>Dashboard Otimizado</CardTitle>
                  <CardDescription>
                    Versão melhorada baseada no padrão André Araújo
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Nova versão unificada que aplica a lógica que funciona para André Araújo em todos os agentes.
              </p>
              <Button 
                onClick={() => navigate('/dashboard-optimized')} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Acessar Dashboard Otimizado
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="text-center p-6">
            <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Análise de IA</h3>
            <p className="text-sm text-muted-foreground">
              Insights inteligentes sobre conversas e padrões de comportamento
            </p>
          </div>
          
          <div className="text-center p-6">
            <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Métricas de Performance</h3>
            <p className="text-sm text-muted-foreground">
              Acompanhe KPIs em tempo real e identifique oportunidades
            </p>
          </div>
          
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Análise de Agentes</h3>
            <p className="text-sm text-muted-foreground">
              Compare performance entre diferentes agentes e equipes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
