
// Utilitários para segurança e sanitização de dados

export interface SensitiveDataPattern {
  type: string;
  pattern: RegExp;
  description: string;
  risk: 'high' | 'medium' | 'low';
  maskFunction?: (value: string) => string;
}

export const SENSITIVE_DATA_PATTERNS: SensitiveDataPattern[] = [
  {
    type: 'CPF',
    pattern: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g,
    description: 'Número de CPF brasileiro',
    risk: 'high',
    maskFunction: (value: string) => value.replace(/(\d{3})\d{3}(\d{3})\d{2}/, '$1.***.***-**')
  },
  {
    type: 'Cartão de Crédito',
    pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    description: 'Número de cartão de crédito',
    risk: 'high',
    maskFunction: (value: string) => value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-****-****-$4')
  },
  {
    type: 'CVV',
    pattern: /\b\d{3,4}\b(?=.*(?:cvv|cvc|código|segurança|security))/gi,
    description: 'Código de segurança do cartão',
    risk: 'high',
    maskFunction: () => '***'
  },
  {
    type: 'RG',
    pattern: /\b\d{1,2}\.?\d{3}\.?\d{3}-?[\dXx]\b/g,
    description: 'Número de RG',
    risk: 'medium',
    maskFunction: (value: string) => value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.***.***-$4')
  },
  {
    type: 'Conta Bancária',
    pattern: /\b\d{4,8}-?\d{1}\b/g,
    description: 'Número de conta bancária',
    risk: 'high',
    maskFunction: (value: string) => value.replace(/(\d{2})(\d+)(\d{2})/, '$1****$3')
  },
  {
    type: 'Agência Bancária',
    pattern: /\b\d{4}-?\d{1}\b/g,
    description: 'Número de agência bancária',
    risk: 'medium',
    maskFunction: (value: string) => value.replace(/(\d{2})(\d{2})/, '$1**')
  },
  {
    type: 'PIX',
    pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
    description: 'Chave PIX UUID',
    risk: 'medium',
    maskFunction: (value: string) => value.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-****-****-****-$5')
  }
];

export const detectSensitiveData = (text: string): Array<{
  type: string;
  value: string;
  risk: string;
  startIndex: number;
  endIndex: number;
}> => {
  const findings: Array<{
    type: string;
    value: string;
    risk: string;
    startIndex: number;
    endIndex: number;
  }> = [];

  if (!text || typeof text !== 'string') {
    return findings;
  }

  SENSITIVE_DATA_PATTERNS.forEach(pattern => {
    let match;
    const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);
    
    while ((match = regex.exec(text)) !== null) {
      findings.push({
        type: pattern.type,
        value: match[0],
        risk: pattern.risk,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
  });

  return findings;
};

export const sanitizeText = (text: string, replacementChar: string = '*'): string => {
  if (!text || typeof text !== 'string') {
    return text;
  }

  let sanitizedText = text;
  
  SENSITIVE_DATA_PATTERNS.forEach(pattern => {
    if (pattern.risk === 'high') {
      sanitizedText = sanitizedText.replace(pattern.pattern, (match) => {
        if (pattern.maskFunction) {
          return pattern.maskFunction(match);
        }
        return match.replace(/./g, replacementChar);
      });
    }
  });

  return sanitizedText;
};

export const validateDataBeforeStorage = (data: Record<string, any>): {
  isValid: boolean;
  violations: Array<{
    field: string;
    type: string;
    value: string;
    risk: string;
  }>;
  sanitizedData: Record<string, any>;
} => {
  const violations: Array<{
    field: string;
    type: string;
    value: string;
    risk: string;
  }> = [];
  
  const sanitizedData: Record<string, any> = {};

  Object.entries(data).forEach(([field, value]) => {
    if (value && typeof value === 'string') {
      const findings = detectSensitiveData(value);
      
      findings.forEach(finding => {
        violations.push({
          field,
          type: finding.type,
          value: finding.value,
          risk: finding.risk
        });
      });

      // Sanitizar dados de alto risco automaticamente
      sanitizedData[field] = sanitizeText(value);
    } else {
      sanitizedData[field] = value;
    }
  });

  return {
    isValid: violations.filter(v => v.risk === 'high').length === 0,
    violations,
    sanitizedData
  };
};

export const generateDataSecurityReport = (violations: Array<{
  field: string;
  type: string;
  value: string;
  risk: string;
}>): {
  summary: {
    total: number;
    high: number;
    medium: number;
    low: number;
  };
  recommendations: string[];
  criticalFields: string[];
} => {
  const summary = {
    total: violations.length,
    high: violations.filter(v => v.risk === 'high').length,
    medium: violations.filter(v => v.risk === 'medium').length,
    low: violations.filter(v => v.risk === 'low').length
  };

  const recommendations: string[] = [];
  const criticalFields: string[] = [];

  if (summary.high > 0) {
    recommendations.push('Remova ou mascare imediatamente dados sensíveis de alto risco (CPF, cartões de crédito)');
    criticalFields.push(...violations.filter(v => v.risk === 'high').map(v => v.field));
  }

  if (summary.medium > 0) {
    recommendations.push('Considere mascarar dados de médio risco (RG, contas bancárias)');
  }

  if (summary.total > 10) {
    recommendations.push('Implemente um processo automatizado de sanitização de dados');
  }

  recommendations.push('Configure alertas para detecção automática de dados sensíveis em tempo real');
  recommendations.push('Treine a equipe sobre políticas de proteção de dados pessoais (LGPD)');

  return {
    summary,
    recommendations,
    criticalFields: [...new Set(criticalFields)]
  };
};

// Função para criar hash de dados sensíveis (para evitar duplicação)
export const createDataHash = (sensitiveValue: string): string => {
  // Implementação simples de hash para demonstração
  // Em produção, use uma biblioteca de hash segura
  let hash = 0;
  if (sensitiveValue.length === 0) return hash.toString();
  
  for (let i = 0; i < sensitiveValue.length; i++) {
    const char = sensitiveValue.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

// Verificar se um dado já existe baseado no hash
export const checkForDuplicateSensitiveData = (
  newData: string, 
  existingHashes: string[]
): boolean => {
  const newHash = createDataHash(newData);
  return existingHashes.includes(newHash);
};
