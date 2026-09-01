// Modelo simplificado con lo que necesitamos mostrar en la UI.
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number; // decímetros
  weight: number; // hectogramos
}

// Estructura parcial de la respuesta real de la PokeAPI.
export interface PokeApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      ['official-artwork']?: {
        front_default: string | null;
      };
      dream_world?: {
        front_default: string | null;
      };
    };
  };
  types: { slot: number; type: { name: string } }[];
}
