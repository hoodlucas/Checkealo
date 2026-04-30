import 'dotenv/config';

export default {
    expo: {
        name:'Checkealo',
        slug:'checkealo',
        extra:{
            supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
            supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_KEY,
        },
    },
};