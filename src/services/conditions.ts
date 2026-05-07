import { supabase } from '../lib/supabase';

export const ConditionsService = {
    async testConnection() {
        console.log("🧐 Consultando datos actuales desde el servicio...");

        const { data, error } = await supabase
        .from('conditions')
        .select('*');

        if (error) {
        console.log("❌ Error al leer:", error.message);
        return;
        }

        console.log("📊 Datos en la tabla:", data);
        
        if (data.length === 0) {
        console.log("⚪ La tabla está vacía.");
        } else {
        console.log("✅ ¡Conexión exitosa y datos recuperados!");
        }
    }
    };