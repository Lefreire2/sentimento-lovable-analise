
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BarChart3,
  ArrowRight,
  Zap,
  RefreshCw,
  Sparkles
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sistema Evolutivo
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transforme seu atendimento reativo em um sistema preditivo e otimizado. 
            Análise de intenção por IA, otimização de agendamentos e closed-loop marketing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/evolutive-system">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Brain className="mr-2 h-5 w-5" />
                Acessar Sistema Evolutivo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                <BarChart3 className="mr-2 h-5 w-5" />
                Dashboard Legado
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <Card className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Brain className="h-8 w-8 text-blue-600" />
                <Badge variant="secondary">IA</Badge>
              </div>
              <CardTitle className="text-lg">Análise de Intenção</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Algoritmos de IA analisam conversas em tempo real, identificando nível de intenção e probabilidade de conversão
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Target className="h-8 w-8 text-green-600" />
                <Badge variant="secondary">Otimização</Badge>
              </div>
              <CardTitle className="text-lg">Agendamentos Inteligentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sistema preditivo que otimiza horários, canais e abordagens para maximizar conversões
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <RefreshCw className="h-8 w-8 text-purple-600" />
                <Badge variant="secondary">Closed-Loop</Badge>
              </div>
              <CardTitle className="text-lg">Feedback Contínuo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dados de conversão alimentam otimizações de marketing, criando um ciclo de melhoria contínua
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <Badge variant="secondary">Preditivo</Badge>
              </div>
              <CardTitle className="text-lg">Machine Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Modelos preditivos aprendem continuamente, melhorando a precisão das análises e recomendações
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Process Flow */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Como Funciona o Sistema Evolutivo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Captura de Dados</h3>
              <p className="text-sm text-muted-foreground">
                Conversas do WhatsApp são analisadas em tempo real
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Análise IA</h3>
              <p className="text-sm text-muted-foreground">
                Algoritmos determinam intenção e momento ideal de contato
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Otimização</h3>
              <p className="text-sm text-muted-foreground">
                Sistema gera estratégias personalizadas de agendamento
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Closed-Loop</h3>
              <p className="text-sm text-muted-foreground">
                Resultados otimizam campanhas futuras automaticamente
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Revolucionar seu Atendimento?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Transforme leads em agendamentos qualificados com inteligência artificial
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/evolutive-system">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                <Zap className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
            
            <Link to="/dashboard-optimized">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ver Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
