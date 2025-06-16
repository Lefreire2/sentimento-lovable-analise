
-- Verificar se há dados na tabela de métricas do André Araújo
SELECT COUNT(*) as total_metrics FROM "Lista_mensagens_Andre_araujo";

-- Verificar se há dados na tabela básica do André Araújo  
SELECT COUNT(*) as total_basic FROM "Lista_de_Mensagens_Andre_araujo";

-- Verificar uma amostra dos dados da tabela de métricas (se houver)
SELECT * FROM "Lista_mensagens_Andre_araujo" LIMIT 3;

-- Verificar uma amostra dos dados da tabela básica (se houver)
SELECT * FROM "Lista_de_Mensagens_Andre_araujo" LIMIT 3;
