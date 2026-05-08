import { supabase } from '../lib/supabase';

export const ConditionsService = {
  /**
   * Obtiene las condiciones médicas vinculadas al usuario
   * y trae los detalles (ingredientes, azúcar, sodio) de cada una.
   */
  async getUserActiveConditions(userId: string) {
    const { data, error } = await supabase
      .from('user_conditions')
      .select(`
        condition_id,
        conditions (
          id,
          name,
          forbidden_ingredients,
          max_sugar,
          max_sodium
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error("Error al obtener condiciones de usuario:", error);
      return [];
    }

    // Retornamos solo la información de la condición, ignorando la tabla intermedia
    return data.map(item => item.conditions).filter(c => c !== null);
  },

  // testeando la conexión básica
  async testConnection() {
    const { data, error } = await supabase.from('conditions').select('count');
    if (error) console.error("Error de conexión:", error.message);
    else console.log("Conexión con Supabase exitosa. Filas en conditions:", data);
  }
};