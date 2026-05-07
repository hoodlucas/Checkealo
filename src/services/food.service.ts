export interface ProductData {
    name: string;
    ingredients: string;
    brands: string;
    image: string;
    // Agregamos estos dos para que el evaluador pueda comparar con la BD
    sugar: number;
    sodium: number;
}

export const FoodService = {
    async getProductByEan(barcode: string): Promise<ProductData | null> {
        try {
            // Agregamos 'nutriments' a los fields de la consulta
            const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,ingredients_text,brands,image_front_url,nutriments`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 0) {
                console.log("Producto no encontrado en la base de datos");
                return null;
            }

            const { product } = data;

            return {
                name: product.product_name || "Producto desconocido",
                ingredients: product.ingredients_text || "",
                brands: product.brands || "Marca desconocida",
                image: product.image_front_url || "",
                // Mapeamos los nutrientes. Open Food Facts usa 'sugars_100g' y 'sodium_100g'
                sugar: product.nutriments?.sugars_100g || 0,
                sodium: product.nutriments?.sodium_100g || 0,
            };
        } catch (error) {
            console.error("Error al conectar con la API de alimentos:", error);
            throw error;
        }
    }
};