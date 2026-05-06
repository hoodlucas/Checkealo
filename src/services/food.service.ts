export interface ProductData {
    name: string;
    ingredients: string;
    brands: string;
    image: string;
}

export const FoodService = {
    async getProductByEan(barcode: string): Promise<ProductData | null> {
        try {
        // URL de la API de Open Food Facts (v2)
        const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,ingredients_text,brands,image_front_url`;
        
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
        };
        } catch (error) {
        console.error("Error al conectar con la API de alimentos:", error);
        throw error;
        }
    }
};