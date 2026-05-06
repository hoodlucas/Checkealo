export type HealthCondition = 'celiaco' | 'diabetico' | 'hipertenso';
export type DiagnosisStatus = 'safe' | 'danger' | 'uncertain';

interface DiagnosisResult {
    status: DiagnosisStatus;
    forbiddenIngredients: string[];
}

const PROHIBITED_WORDS: Record<HealthCondition, string[]> = {
    celiaco: [
        'trigo', 'avena', 'cebada', 'centeno', 'tacc', 'malta', 'almidón', 
        'harina', 'semolín', 'cuscús', 'espelta', 'gliadina', 'pan', 'rebozador', 'fideos'
    ],
    diabetico: [
        'azúcar', 'azucar', 'sucrosa', 'jarabe', 'fructosa', 'maltodextrina', 
        'miel', 'sacarosa', 'jmaf', 'dextrosa', 'melaza'
    ],
    hipertenso: [
        'sal', 'sodio', 'cloruro', 'bicarbonato', 'glutamato', 'benzoato'
    ]
};

// Frases que suelen venir en la API cuando no hay data real
const GARBAGE_PHRASES = [
    'not found', 'unknown', 'ver envase', 'consulte el empaque', 
    'no disponible', 'n/a', 'sin ingredientes', 'ingredients not',
    'no se encontraron ingredientes',
    'no hay ingredientes',
    'ingredientes no disponibles',
    'sin información',
];

export const DiagnosisService = {
    checkProduct: (productName: string, ingredients: string, condition: HealthCondition): DiagnosisResult => {
        const nameLower = (productName || "").toLowerCase();
        const ingredientsLower = (ingredients || "").toLowerCase();
        const forbidden = PROHIBITED_WORDS[condition];

        // Si se llama "Pan Lactal", aunque no haya ingredientes, es PELIGRO.
        const foundInName = forbidden.filter(word => nameLower.includes(word));
        if (foundInName.length > 0) {
            return { status: 'danger', forbiddenIngredients: foundInName };
        }

        // 2. ¿Los ingredientes tienen algo prohibido?
        const foundInIngredients = forbidden.filter(word => ingredientsLower.includes(word));
        if (foundInIngredients.length > 0) {
            return { status: 'danger', forbiddenIngredients: foundInIngredients };
        }

        // 3. VALIDACIÓN DE DUDA (UNCERTAIN)
        // Detectamos si el texto de ingredientes es "basura" o muy corto.
        const isGarbage = GARBAGE_PHRASES.some(phrase => ingredientsLower.includes(phrase));

        const hasRealIngredients =
            ingredientsLower.includes(',') || ingredientsLower.includes(';');

        if (!ingredients || isGarbage || !hasRealIngredients) {
            return { status: 'uncertain', forbiddenIngredients: [] };
        }
        
        
        // Si no hay ingredientes, o son muy pocos (menos de 20 chars), o es texto basura...
        if (!ingredients || ingredients.trim().length < 20 || isGarbage) {
            return { status: 'uncertain', forbiddenIngredients: [] };
        }

        // 4. SOLO SI PASÓ TODO LO ANTERIOR: Es seguro.
        return { status: 'safe', forbiddenIngredients: [] };
    }
};