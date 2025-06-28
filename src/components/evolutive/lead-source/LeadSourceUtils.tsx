
import { 
  Globe,
  Instagram,
  Search,
  MessageSquare
} from 'lucide-react';

export const getSourceIcon = (source: string) => {
  if (source.toLowerCase().includes('instagram')) return <Instagram className="h-4 w-4" />;
  if (source.toLowerCase().includes('google') || source.toLowerCase().includes('search')) return <Search className="h-4 w-4" />;
  if (source.toLowerCase().includes('whatsapp')) return <MessageSquare className="h-4 w-4" />;
  return <Globe className="h-4 w-4" />;
};

export const getSourceColor = (rate: string) => {
  const numRate = parseFloat(rate.replace('%', ''));
  if (numRate >= 40) return 'text-green-600';
  if (numRate >= 25) return 'text-yellow-600';
  return 'text-red-600';
};
