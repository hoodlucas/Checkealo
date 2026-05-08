export default class DiagnosisService {
  /**
   * Evalúa un producto comparándolo con las condiciones del usuario.
   * @param product El objeto producto de la API
   * @param userConditions Array de condiciones del usuario
   */
  static checkProduct(product: any, userConditions: any[]) {
    const warnings: string[] = [];
    const ingredients = (product.ingredients || "").toLowerCase();

    const hasIngredientConditions = userConditions.some(
      (c) =>
        c.forbidden_ingredients &&
        Array.isArray(c.forbidden_ingredients) &&
        c.forbidden_ingredients.length > 0
    );

    if (!ingredients && hasIngredientConditions) {
      return {
        status: "uncertain",
        warnings: [
          "No hay información de ingredientes disponible para este producto.",
        ],
        isSafe: false,
      };
    }

    userConditions.forEach((cond) => {
      // 1. Verificar Ingredientes Prohibidos
      if (
        cond.forbidden_ingredients &&
        Array.isArray(cond.forbidden_ingredients) &&
        ingredients
      ) {
        const found = cond.forbidden_ingredients.filter((ing: string) =>
          ingredients.includes(ing.toLowerCase())
        );

        if (found.length > 0) {
          warnings.push(
            `No apto para ${cond.name}: contiene ${found.join(", ")}.`
          );
        }
      }

      // 2. Verificar Azúcar
      if (
        cond.max_sugar !== null &&
        cond.max_sugar !== undefined &&
        product.sugar > cond.max_sugar
      ) {
        warnings.push(
          `Exceso de azúcar para ${cond.name} (${product.sugar}g > ${cond.max_sugar}g).`
        );
      }

      // 3. Verificar Sodio
      if (
        cond.max_sodium !== null &&
        cond.max_sodium !== undefined &&
        product.sodium > cond.max_sodium
      ) {
        warnings.push(
          `Exceso de sodio para ${cond.name} (${product.sodium}g > ${cond.max_sodium}g).`
        );
      }
    });

    return {
      status: warnings.length === 0 ? "safe" : "danger",
      warnings: warnings,
      isSafe: warnings.length === 0,
    };
  }
}