export const TYPES = {
    IPokemonRepository: Symbol.for("IPokemonRepository"),
    IPokemonUC: Symbol.for("IPokemonUC"),
    PokemonVM: Symbol.for("PokemonVM"),
};

/**
 * 1. Es un "Contrato de Infraestructura"
La forma de la respuesta (tener una clave llamada results) es una decisión del programador de la PokeAPI, no es una regla de tu negocio. Si mañana cambias de API y la nueva usa la clave data en lugar de results, solo cambias este tipo en core y no tienes que tocar tus entidades de dominio.

2. Reutilización (DRY - Don't Repeat Yourself)
Si tu app crece y empiezas a consultar "Berries", "Items" o "Moves" de la PokeAPI, todos usarán el mismo formato de respuesta. Tenerlo en core/types permite que todos los repositorios compartan el mismo molde.

3. Desacoplamiento (Separación de Capas)
Tu entidad Pokemon debe ser "pura" (solo name y url). No debería saber que existe una propiedad llamada results o un contador de la API.

Domain: Conoce al Pokemon.

Core/Data: Conoce la ApiResponse (el envoltorio). **/

export interface ApiResponse<T> {
    results: T[];
}


