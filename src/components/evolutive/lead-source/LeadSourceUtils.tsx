
import { 
  Globe,
  Instagram,
  Search,
  MessageSquare,
  Facebook,
  Users,
  ExternalLink
} from 'lucide-react';

export const getSourceIcon = (source: string) => {
  const normalizedSource = source.toLowerCase();
  
  if (normalizedSource.includes('instagram') || normalizedSource.includes('insta')) {
    return <Instagram className="h-4 w-4 text-pink-500" />;
  }
  if (normalizedSource.includes('facebook') || normalizedSource.includes('fb')) {
    return <Facebook className="h-4 w-4 text-blue-600" />;
  }
  if (normalizedSource.includes('google') || normalizedSource.includes('search') || normalizedSource.includes('pesquisa')) {
    return <Search className="h-4 w-4 text-blue-500" />;
  }
  if (normalizedSource.includes('website') || normalizedSource.includes('site')) {
    return <ExternalLink className="h-4 w-4 text-green-600" />;
  }
  if (normalizedSource.includes('referral') || normalizedSource.includes('indicação')) {
    return <Users className="h-4 w-4 text-purple-500" />;
  }
  if (normalizedSource.includes('whatsapp') || normalizedSource.includes('whats')) {
    return <MessageSquare className="h-4 w-4 text-green-500" />;
  }
  
  return <Globe className="h-4 w-4 text-gray-500" />;
};

export const getSourceColor = (rate: string) => {
  const numRate = parseFloat(rate.replace('%', '')) || 0;
  if (numRate >= 30) return 'text-green-600';
  if (numRate >= 15) return 'text-yellow-600';
  if (numRate >= 5) return 'text-orange-600';
  return 'text-red-600';
};

export const getSourceDisplayName = (source: string) => {
  const displayNames: Record<string, string> = {
    'instagram': 'Instagram',
    'facebook': 'Facebook',
    'google': 'Google/Pesquisa',
    'website': 'Site/Landing Page',
    'referral': 'Indicação',
    'whatsapp': 'WhatsApp Direto',
    'unknown': 'Fonte Desconhecida'
  };
  
  return displayNames[source.toLowerCase()] || source.charAt(0).toUpperCase() + source.slice(1);
};

