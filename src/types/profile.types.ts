export type HealthCondition = {
  id: string;
  name: string;
  forbidden_ingredients: string[] | null;
  max_sugar: number | null;
  max_sodium: number | null;
  description: string | null;
};

export type Profile = {
  id: string;

  email: string;

  full_name: string | null;

  phone: string | null;

  birth_date: string | null;

  conditions: HealthCondition[];
};