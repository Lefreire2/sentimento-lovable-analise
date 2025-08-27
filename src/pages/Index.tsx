
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Clock, 
  Zap,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Star,
  CheckCircle
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with demo badge */}
      <div className="bg-marcus-cyan text-white py-2 text-center text-sm font-medium">
        Demonstração Real em &lt; de 3 Minutos
      </div>

      <div className="container mx-auto px-4">
        
        {/* Hero Section */}
        <div className="py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Se você acha que uma IA ainda não consegue fazer o trabalho inteiro de uma equipe de marketing...{" "}
            <span className="text-marcus-cyan">Então veja esse vídeo por 3 minutos</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto">
            Veja como o Léo.AI criou uma campanha completa de Dia dos Pais em menos de 3 minutos, 
            analisou resultados em tempo real e otimizou automaticamente para reduzir o custo por lead.
          </p>

          {/* Video placeholder */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-marcus-cyan hover:bg-marcus-cyan/90 text-white rounded-full w-20 h-20">
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                🔇
              </div>
            </div>
          </div>
          
          <Button size="lg" className="bg-marcus-cyan hover:bg-marcus-cyan/90 text-white px-8 py-6 text-lg">
            Contratar o Léo.AI
          </Button>

          {/* Support logos */}
          <div className="mt-12 flex justify-center items-center gap-8 opacity-60">
            <span className="text-sm font-medium">Apoio</span>
            <div className="flex items-center gap-6">
              <img src="/placeholder.svg" alt="Antler" className="h-8" />
              <img src="/placeholder.svg" alt="Microsoft for Startups" className="h-8" />
            </div>
          </div>
        </div>

        {/* How Marcus Works */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como o Léo.AI Funciona na Prática</h2>
            <h3 className="text-xl md:text-2xl font-semibold text-muted-foreground">
              Resultados que você vai ver desde o primeiro dia
            </h3>
            <p className="text-muted-foreground mt-2">
              Não é só tecnologia. São resultados práticos que impactam diretamente no seu faturamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-marcus-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-marcus-cyan">3 min</span>
                </div>
                <CardTitle className="text-lg">Criação de Campanhas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Crie campanhas completas no Meta Ads com público, orçamento e criativos
                </p>
                <div className="bg-gray-100 p-3 rounded-lg text-xs text-left italic">
                  "Léo.AI, cria uma campanha para promover meu curso de inglês, público de 25-45 anos interessados em idiomas"
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-marcus-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-marcus-cyan">24/7</span>
                </div>
                <CardTitle className="text-lg">Otimização Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Otimiza suas campanhas existentes para reduzir custos e melhorar resultados
                </p>
                <div className="bg-gray-100 p-3 rounded-lg text-xs text-left italic">
                  "Analisa minhas campanhas ativas e otimiza as que estão com CPL alto"
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-marcus-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-marcus-cyan">5 min</span>
                </div>
                <CardTitle className="text-lg">Criativos de Alto Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Gera anúncios, textos e imagens que convertem baseados em templates comprovados
                </p>
                <div className="bg-gray-100 p-3 rounded-lg text-xs text-left italic">
                  "Cria 5 criativos diferentes para minha academia, estilo antes e depois"
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-marcus-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-marcus-cyan">2 min</span>
                </div>
                <CardTitle className="text-lg">Posts para Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Produz conteúdo orgânico para Instagram e Facebook alinhado com suas campanhas
                </p>
                <div className="bg-gray-100 p-3 rounded-lg text-xs text-left italic">
                  "Faz 10 posts para Instagram sobre meu restaurante, com dicas e promoções"
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Creative Templates Section */}
        <section className="py-16 bg-gray-50 -mx-4 px-4 rounded-3xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Criativos de Alto Impacto</h2>
            <h3 className="text-xl font-semibold text-muted-foreground mb-4">
              Templates testados que realmente convertem
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Temos uma base de templates dos criativos que mais convertem. O Marcus adapta cada um especificamente para sua marca e nicho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <img src="/placeholder.svg" alt="Criativo para academia - exemplo 1" className="rounded-lg aspect-square object-cover" />
            <img src="/placeholder.svg" alt="Criativo para academia - exemplo 2" className="rounded-lg aspect-square object-cover" />
            <img src="/placeholder.svg" alt="Criativo para academia - exemplo 3" className="rounded-lg aspect-square object-cover" />
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Por que nossos criativos convertem mais?</h4>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              Estamos ativamente treinando o Léo.AI com templates de criativos que comprovadamente geraram resultados. 
              O Léo.AI pega esses templates e adapta com as fotos do seu produto, identidade de marca e textos personalizados.
            </p>
          </div>
        </section>

        {/* WhatsApp Management Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gestão simples via WhatsApp</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Esqueça plataformas complexas e interfaces complicadas. Com o Léo.AI, você gerencia todo o marketing da sua empresa via WhatsApp, de forma natural e eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-8 h-8 text-marcus-cyan mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Comunicação natural</h3>
                  <p className="text-muted-foreground">Converse com o Léo.AI como se fosse um funcionário real via WhatsApp</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-marcus-cyan mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Respostas instantâneas</h3>
                  <p className="text-muted-foreground">Receba atualizações sempre que solicitar</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <BarChart3 className="w-8 h-8 text-marcus-cyan mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Relatórios automatizados</h3>
                  <p className="text-muted-foreground">Receba análises de performance semanais diretamente no WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-marcus-cyan mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Execução Rápida</h3>
                  <p className="text-muted-foreground">Solicite mudanças e veja o Léo.AI executando em tempo real</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Chat Mockup */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="bg-green-500 text-white p-3 rounded-t-2xl flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div>
                  <div className="font-semibold">Léo.AI</div>
                  <div className="text-sm opacity-90">● online</div>
                </div>
              </div>
              
              <div className="p-4 space-y-4 bg-green-50 min-h-[300px]">
                <div className="bg-white p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">Oi! Acabei de ajustar o público da campanha - foquei em empresários de 25-45 anos interessados em marketing.</p>
                  <span className="text-xs text-gray-500">09:15</span>
                </div>
                
                <div className="bg-white p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">Melhorei os anúncios e já temos 47 pessoas interessadas hoje! 8 de cada 100 viram clientes e cada contato custa só R$ 18,50.</p>
                  <span className="text-xs text-gray-500">09:16</span>
                </div>

                <div className="bg-green-500 text-white p-3 rounded-lg max-w-[70%] ml-auto">
                  <p className="text-sm">Ótimo! Como está a qualidade dos contatos?</p>
                  <span className="text-xs opacity-70">09:17</span>
                </div>

                <div className="bg-white p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">Excelente! 85% dos contatos são realmente interessados. Custo 40% menor que o planejado e 12 de cada 100 pessoas clicam. Vou aumentar o orçamento para trazer mais contatos!</p>
                  <span className="text-xs text-gray-500">09:18</span>
                </div>
              </div>
              
              <div className="p-3 border-t flex items-center gap-2">
                <input 
                  className="flex-1 p-2 border rounded-full text-sm" 
                  placeholder="Digite uma mensagem..."
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* Business Success Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Empresas que já estão <span className="text-marcus-cyan">dominando seus mercados</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Veja os resultados que diferentes tipos de empresas estão alcançando com o Léo.AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Academias e Fitness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Geração de leads qualificados de pessoas interessadas em treinar
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Clínicas e Consultórios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Captação de pacientes em potencial direto no WhatsApp
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Consultorias Financeiras</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Leads interessados em soluções financeiras e investimentos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Distribuidoras</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Geração de leads B2B para aumento de vendas corporativas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Restaurantes e Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Captação de novos clientes famintos na região de entrega
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Agências de Marketing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Eliminação do trabalho operacional para foco em estratégia
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Imobiliárias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Leads qualificados de pessoas procurando imóveis para comprar
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Escolas e Cursos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Captação de estudantes interessados em se matricular
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contrate o funcionário que mais vai trazer resultado e que você vai pagar o menor salário.
            </h2>
            <p className="text-lg text-muted-foreground">
              Enquanto uma agência ou time de marketing pode custar R$3.000+ por mês, o Léo.AI trabalha 24/7 por menos de R$500. Não há comparação de custo-benefício.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
            <Card className="relative border-2">
              <CardHeader className="text-center">
                <h3 className="text-lg font-semibold">Plano Essential</h3>
                <div className="text-3xl font-bold text-marcus-cyan mb-2">R$ 797/mês</div>
                <p className="text-sm text-muted-foreground">"Salário" do seu gerente de marketing</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Gerenciamento de até R$1.000 de investimento mensal no Meta Ads</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Criativos automatizados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Landing pages de alta conversão</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Gerenciamento automático de campanhas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Otimização contínua de performance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Relatórios semanais detalhados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Suporte via WhatsApp</span>
                </div>
                <Button className="w-full mt-4 bg-marcus-cyan hover:bg-marcus-cyan/90">
                  Contratar o Léo.AI
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-2">
              <CardHeader className="text-center">
                <h3 className="text-lg font-semibold">Plano Premium</h3>
                <div className="text-3xl font-bold text-marcus-cyan mb-2">R$ 997/mês</div>
                <p className="text-sm text-muted-foreground">"Salário" do seu gerente de marketing</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Sem limite de investimento mensal no Meta Ads</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Acompanhamento humano de especialistas nas suas campanhas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Criativos automatizados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Landing pages de alta conversão</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Gerenciamento automático de campanhas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Otimização contínua de performance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Relatórios semanais detalhados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Suporte via WhatsApp</span>
                </div>
                <Button className="w-full mt-4 bg-marcus-cyan hover:bg-marcus-cyan/90">
                  Contratar o Léo.AI
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-muted-foreground mb-8">
            ✅ Cancele quando quiser • ✅ 7 dias de garantia
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Todos os preços em reais (BRL). Cobrança mensal sem fidelidade.
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <Button size="lg" className="bg-marcus-cyan hover:bg-marcus-cyan/90 text-white px-12 py-6 text-xl">
            Quero Começar Agora
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Index;
