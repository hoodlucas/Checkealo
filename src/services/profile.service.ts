import { supabase } from "@/lib/supabase";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      email,
      full_name,
      phone,
      birth_date,
      user_conditions (
        conditions (
          id,
          name,
          forbidden_ingredients,
          max_sugar,
          max_sodium,
          description
        )
      )
    `)
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return {
    ...data,
    conditions:
      data.user_conditions?.map(
        (item: any) => item.conditions
      ) ?? [],
  };
}