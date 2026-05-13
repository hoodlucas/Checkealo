import { supabase } from '../lib/supabase';

type UpdateProfileDTO = {
  userId: string;
  fullName: string;
  phone: string;
  birthDate: string;
  conditions: string[];
};

export async function updateProfile(
  data: UpdateProfileDTO
) {
  const {
    userId,
    fullName,
    phone,
    birthDate,
    conditions,
  } = data;

  // actualizar perfil
  const { error: profileError } =
    await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone,
        birth_date: birthDate,
      })
      .eq('id', userId);

  if (profileError) {
    throw profileError;
  }

  // eliminar relaciones previas
  const { error: deleteError } =
    await supabase
      .from('user_conditions')
      .delete()
      .eq('user_id', userId);

  if (deleteError) {
    throw deleteError;
  }

  // buscar IDs de condiciones
  const {
    data: conditionsData,
    error: conditionsError,
  } = await supabase
    .from('conditions')
    .select('id, name')
    .in('name', conditions);

  if (conditionsError) {
    throw conditionsError;
  }

  // preparar relaciones
  const relations =
    conditionsData.map(condition => ({
      user_id: userId,
      condition_id: condition.id,
    }));

  // insertar relaciones
  const { error: relationError } =
    await supabase
      .from('user_conditions')
      .insert(relations);

  if (relationError) {
    throw relationError;
  }

  return true;
}