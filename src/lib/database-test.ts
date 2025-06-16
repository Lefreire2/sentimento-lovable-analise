
import { supabase } from "@/integrations/supabase/client";

export const testDatabaseConnection = async () => {
    console.log('🧪 TEST - Testando conectividade CORRIGIDA do banco');
    
    try {
        // Teste com a tabela do André Araújo que sabemos que tem dados
        const { data, error, count } = await supabase
            .from('Lista_de_Mensagens_Andre_araujo')
            .select('*', { count: 'exact' })
            .limit(5);
        
        console.log('🧪 TEST - Resultado do teste (André Araújo):');
        console.log('  - Sucesso:', !error);
        console.log('  - Erro:', error);
        console.log('  - Count total:', count);
        console.log('  - Dados retornados:', data?.length || 0);
        console.log('  - Primeiro registro:', data?.[0]);
        
        if (error) {
            console.error('❌ TEST - Erro de conectividade:', error);
            return false;
        }
        
        if (count && count > 0) {
            console.log('✅ TEST - SUCESSO! Conectividade funcionando com', count, 'registros');
            return true;
        } else {
            console.log('⚠️ TEST - Conectividade OK mas tabela vazia');
            return true; // Conexão funciona mesmo se vazia
        }
        
    } catch (err) {
        console.error('💥 TEST - Exceção durante teste:', err);
        return false;
    }
};

export const testSpecificTable = async (tableName: string) => {
    console.log('🧪 TABLE-TEST - Testando tabela específica:', tableName);
    
    try {
        const { data, error, count } = await supabase
            .from(tableName as any)
            .select('*', { count: 'exact' })
            .limit(3);
        
        console.log(`🧪 TABLE-TEST - Resultado para ${tableName}:`);
        console.log('  - Sucesso:', !error);
        console.log('  - Erro:', error);
        console.log('  - Count total:', count);
        console.log('  - Dados retornados:', data?.length || 0);
        console.log('  - Amostra de dados:', data);
        
        return {
            success: !error,
            error,
            count,
            data
        };
        
    } catch (err) {
        console.error(`💥 TABLE-TEST - Exceção para ${tableName}:`, err);
        return {
            success: false,
            error: err,
            count: null,
            data: null
        };
    }
};

// Teste específico para o André Araújo com os 3.326 registros
export const testAndreAraujoData = async () => {
    console.log('🎯 ANDRÉ-TEST - Testando dados específicos do André Araújo');
    
    const tablesToTest = [
        'Lista_de_Mensagens_Andre_araujo',
        'Lista_mensagens_Andre_araujo'
    ];
    
    for (const tableName of tablesToTest) {
        console.log(`🔍 ANDRÉ-TEST - Testando ${tableName}...`);
        
        try {
            const { data, error, count } = await supabase
                .from(tableName as any)
                .select('*', { count: 'exact' })
                .limit(10);
            
            console.log(`📊 ANDRÉ-TEST - Resultado ${tableName}:`);
            console.log('  - Erro:', error);
            console.log('  - Count:', count);
            console.log('  - Dados:', data?.length || 0);
            
            if (!error && count && count > 0) {
                console.log(`✅ ANDRÉ-TEST - ENCONTROU DADOS em ${tableName}!`);
                console.log('  - Total de registros:', count);
                console.log('  - Amostra:', data?.slice(0, 2));
                return { tableName, count, data };
            }
        } catch (err) {
            console.error(`💥 ANDRÉ-TEST - Erro em ${tableName}:`, err);
        }
    }
    
    console.log('❌ ANDRÉ-TEST - Nenhuma tabela do André Araújo retornou dados');
    return null;
};
