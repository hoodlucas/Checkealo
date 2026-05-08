export type Profile = {
  id: string;

  email: string;

  full_name: string | null;

  phone: string | null;

  birth_date: string | null;

  diabetic: boolean;

  celiac: boolean;

  hypertensive: boolean;
};