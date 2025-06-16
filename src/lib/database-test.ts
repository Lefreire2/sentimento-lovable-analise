
import { supabase } from "@/integrations/supabase/client";

export const testDatabaseConnection = async () => {
    console.log('🧪 TEST - Iniciando teste de conectividade com o banco');
    
    try {
        // Teste básico de conectividade
        const { data, error } = await supabase
            .from('Lista_mensagens_Andre_araujo')
            .select('count', { count: 'exact', head: true });
        
        console.log('🧪 TEST - Resultado do teste:');
        console.log('  - Sucesso:', !error);
        console.log('  - Erro:', error);
        console.log('  - Count:', data);
        
        if (error) {
            console.error('❌ TEST - Erro de conectividade:', error);
            return false;
        }
        
        console.log('✅ TEST - Conectividade funcionando');
        return true;
        
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
            .limit(1);
        
        console.log(`🧪 TABLE-TEST - Resultado para ${tableName}:`);
        console.log('  - Sucesso:', !error);
        console.log('  - Erro:', error);
        console.log('  - Count:', count);
        console.log('  - Dados:', data);
        
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
