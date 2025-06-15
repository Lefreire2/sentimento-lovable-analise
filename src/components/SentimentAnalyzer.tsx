
import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Smile, Frown } from "lucide-react";

interface AnalysisResult {
  label: 'POSITIVE' | 'NEGATIVE';
  score: number;
}

const SentimentAnalyzer = () => {
  const [text, setText] = useState("Lovable is an amazing tool that helps me build applications faster than ever before!");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const classifier = useRef<any>(null);

  const analyzeSentiment = useCallback(async () => {
    if (!text.trim()) {
      setResult(null);
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      if (!classifier.current) {
        const { pipeline } = await import('@huggingface/transformers');
        classifier.current = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
      }
      const output = await classifier.current(text);
      if (output && output.length > 0) {
        setResult(output[0]);
      }
    } catch (error) {
      console.error("Error during sentiment analysis:", error);
    } finally {
      setLoading(false);
    }
  }, [text]);

  const getResultBadge = () => {
    if (!result) return null;

    const { label, score } = result;
    const scorePercent = (score * 100).toFixed(1);

    if (label === 'POSITIVE') {
      return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 text-base py-2 px-4 shadow-sm"><Smile className="mr-2 h-5 w-5" /> Positivo ({scorePercent}%)</Badge>;
    }
    if (label === 'NEGATIVE') {
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 text-base py-2 px-4 shadow-sm"><Frown className="mr-2 h-5 w-5" /> Negativo ({scorePercent}%)</Badge>;
    }
    return null;
  };

  return (
    <Card className="w-full shadow-lg transition-shadow hover:shadow-xl border-t-4 border-primary">
      <CardHeader>
        <CardTitle>Analisador de Sentimento</CardTitle>
        <CardDescription>Insira um texto (em inglês) para ver a mágica acontecer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., I love Lovable! It's so easy to build apps."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="resize-none focus:ring-2 focus:ring-primary/50"
        />
        {loading && (
           <div className="flex justify-center items-center pt-4 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Analisando... Este processo pode levar um momento.</span>
          </div>
        )}
        {result && !loading && (
          <div className="flex justify-center pt-4">
            {getResultBadge()}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={analyzeSentiment} disabled={loading || !text.trim()} className="w-full">
          {!loading && 'Analisar Texto'}
          {loading && 'Analisando...'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SentimentAnalyzer;
