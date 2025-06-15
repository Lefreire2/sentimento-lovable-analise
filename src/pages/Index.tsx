
import SentimentAnalyzer from "@/components/SentimentAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 selection:bg-primary/20">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            Sistema de Análise de Sentimentos
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Uma ferramenta inteligente que utiliza IA para analisar o sentimento de um texto diretamente no seu navegador.
          </p>
        </header>
        <main>
          <SentimentAnalyzer />
        </main>
        <footer className="text-center text-sm text-gray-400 dark:text-gray-500">
          <p>Desenvolvido com ❤️ usando Lovable & Hugging Face Transformers.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
