
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Database,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { agentTables } from '@/lib/agents';

interface SensitiveDataPattern {
  type: string;
  pattern: RegExp;
  description: string;
  risk: 'high' | 'medium' | 'low';
}

interface SensitiveDataFound {
  agent: string;
  table: string;
  recordId: string;
  field: string;
  dataType: string;
  value: string;
  risk: string;
}

const SENSITIVE_PATTERNS: SensitiveDataPattern[] = [
  {
    type: 'CPF',
    pattern: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g,
    description: 'Número de CPF brasileiro',
    risk: 'high'
  },
  {
    type: 'Cartão de Crédito',
    pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    description: 'Número de cartão de crédito',
    risk: 'high'
  },
  {
    type: 'CVV',
    pattern: /\b\d{3,4}\b(?=.*(?:cvv|cvc|código|segurança))/gi,
    description: 'Código de segurança do cartão',
    risk: 'high'
  },
  {
    type: 'RG',
    pattern: /\b\d{1,2}\.?\d{3}\.?\d{3}-?[\dXx]\b/g,
    description: 'Número de RG',
    risk: 'medium'
  },
  {
    type: 'Telefone',
    pattern: /\b(?:\+55\s?)?\(?(\d{2})\)?\s?9?\d{4}-?\d{4}\b/g,
    description: 'Número de telefone',
    risk: 'low'
  },
  {
    type: 'Email',
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    description: 'Endereço de email',
    risk: 'low'
  }
];

export const DataSanitizer = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [sensitiveData, setSensitiveData] = useState<SensitiveDataFound[]>([]);
  const [showValues, setShowValues] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const scanForSensitiveData = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setSensitiveData([]);
    
    console.log('🔍 Iniciando varredura de dados sensíveis...');
    
    const foundData: SensitiveDataFound[] = [];
    const totalTables = agentTables.length;
    
    for (let i = 0; i < agentTables.length; i++) {
      const table = agentTables[i];
      console.log(`📊 Verificando tabela: ${table}`);
      
      try {
        // Buscar dados da tabela básica
        const { data: basicData, error: basicError } = await supabase
          .from(table as any)
          .select('*')
          .limit(1000);
        
        if (!basicError && basicData) {
          console.log(`📋 ${table}: ${basicData.length} registros encontrados`);
          
          // Verificar cada registro
          basicData.forEach((record: any) => {
            Object.entries(record).forEach(([field, value]) => {
              if (value && typeof value === 'string') {
                // Verificar cada padrão de dados sensíveis
                SENSITIVE_PATTERNS.forEach(pattern => {
                  const matches = value.match(pattern.pattern);
                  if (matches) {
                    matches.forEach(match => {
                      foundData.push({
                        agent: table,
                        table: table,
                        recordId: record.id || record.remoteJid || 'N/A',
                        field: field,
                        dataType: pattern.type,
                        value: match,
                        risk: pattern.risk
                      });
                    });
                  }
                });
              }
            });
          });
        }
        
        // Verificar tabela de métricas se existir
        const metricsTable = `Lista_mensagens_${table.replace('Lista_de_Mensagens_', '')}`;
        const { data: metricsData, error: metricsError } = await supabase
          .from(metricsTable as any)
          .select('*')
          .limit(100);
        
        if (!metricsError && metricsData) {
          console.log(`📈 ${metricsTable}: ${metricsData.length} registros de métricas`);
          
          metricsData.forEach((record: any) => {
            Object.entries(record).forEach(([field, value]) => {
              if (value && typeof value === 'string') {
                SENSITIVE_PATTERNS.forEach(pattern => {
                  const matches = value.match(pattern.pattern);
                  if (matches) {
                    matches.forEach(match => {
                      foundData.push({
                        agent: table,
                        table: metricsTable,
                        recordId: record.id || record.remoteJid || 'N/A',
                        field: field,
                        dataType: pattern.type,
                        value: match,
                        risk: pattern.risk
                      });
                    });
                  }
                });
              }
            });
          });
        }
        
      } catch (error) {
        console.error(`❌ Erro ao verificar ${table}:`, error);
      }
      
      setScanProgress(((i + 1) / totalTables) * 100);
    }
    
    // Remover duplicatas
    const uniqueData = foundData.filter((item, index, self) => 
      index === self.findIndex((t) => 
        t.agent === item.agent && 
        t.field === item.field && 
        t.value === item.value &&
        t.recordId === item.recordId
      )
    );
    
    setSensitiveData(uniqueData);
    setIsScanning(false);
    
    console.log(`✅ Varredura concluída: ${uniqueData.length} dados sensíveis encontrados`);
  };

  const maskSensitiveValue = (value: string, type: string): string => {
    if (!showValues) {
      switch (type) {
        case 'CPF':
          return value.replace(/\d{3}(\d{3})\d{3}(\d{2})/, '***.$1.***-$2');
        case 'Cartão de Crédito':
          return value.replace(/\d{4}(\d{4})\d{4}(\d{4})/, '****-$1-****-$2');
        case 'CVV':
          return '***';
        case 'RG':
          return value.replace(/\d{2}(\d{3})\d{3}(\d{1})/, '**.$1.***-$2');
        default:
          return value.substring(0, 3) + '***' + value.substring(value.length - 2);
      }
    }
    return value;
  };

  const removeSensitiveData = async () => {
    setIsRemoving(true);
    console.log('🧹 Iniciando remoção de dados sensíveis...');
    
    const highRiskData = sensitiveData.filter(item => item.risk === 'high');
    
    for (const item of highRiskData) {
      try {
        // Substituir dados sensíveis por versão mascarada
        const maskedValue = item.value.replace(/./g, '*');
        
        const { error } = await supabase
          .from(item.table as any)
          .update({ [item.field]: maskedValue })
          .eq('id', item.recordId);
        
        if (error) {
          console.error(`❌ Erro ao sanitizar ${item.table}:`, error);
        } else {
          console.log(`✅ Sanitizado: ${item.dataType} em ${item.table}`);
        }
      } catch (error) {
        console.error(`❌ Erro geral na sanitização:`, error);
      }
    }
    
    setIsRemoving(false);
    // Reescanear após remoção
    await scanForSensitiveData();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const groupedData = sensitiveData.reduce((acc, item) => {
    const key = item.dataType;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, SensitiveDataFound[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sanitização de Dados Sensíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={scanForSensitiveData}
                disabled={isScanning}
                className="flex items-center gap-2"
              >
                <Database className="h-4 w-4" />
                {isScanning ? 'Verificando...' : 'Verificar Dados Sensíveis'}
              </Button>
              
              {sensitiveData.length > 0 && (
                <>
                  <Button
                    onClick={() => setShowValues(!showValues)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showValues ? 'Ocultar' : 'Mostrar'} Valores
                  </Button>
                  
                  <Button
                    onClick={removeSensitiveData}
                    disabled={isRemoving}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {isRemoving ? 'Removendo...' : 'Sanitizar Dados de Alto Risco'}
                  </Button>
                </>
              )}
            </div>

            {isScanning && (
              <div className="space-y-2">
                <Progress value={scanProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Verificando dados sensíveis em todas as tabelas... {Math.round(scanProgress)}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {sensitiveData.length > 0 && (
        <div className="space-y-4">
          {/* Resumo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Resumo dos Dados Encontrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <div className="text-2xl font-bold text-red-700">
                    {sensitiveData.filter(item => item.risk === 'high').length}
                  </div>
                  <div className="text-sm text-red-600">Alto Risco</div>
                  <div className="text-xs text-red-500">CPF, Cartões, CVV</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-700">
                    {sensitiveData.filter(item => item.risk === 'medium').length}
                  </div>
                  <div className="text-sm text-yellow-600">Médio Risco</div>
                  <div className="text-xs text-yellow-500">RG, Documentos</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="text-2xl font-bold text-blue-700">
                    {sensitiveData.filter(item => item.risk === 'low').length}
                  </div>
                  <div className="text-sm text-blue-600">Baixo Risco</div>
                  <div className="text-xs text-blue-500">Email, Telefone</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes por tipo */}
          {Object.entries(groupedData).map(([dataType, items]) => (
            <Card key={dataType}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Dados do Tipo: {dataType}</span>
                  <Badge variant={getRiskBadgeVariant(items[0].risk)}>
                    {items.length} encontrados
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getRiskColor(item.risk)}`}></div>
                          <span className="font-medium">{item.agent}</span>
                          <span className="text-sm text-gray-500">• {item.field}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Valor: <code className="bg-gray-200 px-1 rounded">
                            {maskSensitiveValue(item.value, item.dataType)}
                          </code>
                        </div>
                      </div>
                      <Badge variant={getRiskBadgeVariant(item.risk)}>
                        {item.risk}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isScanning && sensitiveData.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Nenhum dado sensível encontrado
              </h3>
              <p className="text-gray-600">
                Todas as tabelas foram verificadas e estão seguras.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
