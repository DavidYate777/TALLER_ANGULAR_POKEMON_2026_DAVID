import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon, PokeApiResponse } from './pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Busca un Pokémon por nombre o id. La API espera minúsculas y sin espacios.
  search(query: string): Observable<Pokemon> {
    const term = query.trim().toLowerCase().replace(/\s+/g, '-');
    return this.http
      .get<PokeApiResponse>(`${this.baseUrl}/${term}`)
      .pipe(map((res) => this.toPokemon(res)));
  }

  private toPokemon(res: PokeApiResponse): Pokemon {
    const artwork =
      res.sprites.other?.['official-artwork']?.front_default ??
      res.sprites.other?.dream_world?.front_default ??
      res.sprites.front_default ??
      '';

    return {
      id: res.id,
      name: res.name,
      image: artwork,
      types: res.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
      height: res.height,
      weight: res.weight,
    };
  }
}
