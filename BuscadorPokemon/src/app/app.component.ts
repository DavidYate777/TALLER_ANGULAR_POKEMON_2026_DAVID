import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  query = '';
  pokemon: Pokemon | null = null;
  loading = false;
  errorMessage = '';

  // Sugerencias rápidas para que el usuario pueda probar sin escribir.
  readonly suggestions = ['ditto', 'pikachu', 'charizard', 'bulbasaur', 'gengar', 'mewtwo'];

  constructor(private pokemonService: PokemonService) {}

  onSubmit(): void {
    const term = this.query.trim();
    if (!term) {
      this.errorMessage = 'Escribe el nombre de un Pokémon para buscar.';
      this.pokemon = null;
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.pokemonService.search(term).subscribe({
      next: (result) => {
        this.pokemon = result;
        this.loading = false;
      },
      error: () => {
        this.pokemon = null;
        this.loading = false;
        this.errorMessage = `No encontramos ningún Pokémon llamado "${term}". Revisa el nombre e inténtalo de nuevo.`;
      },
    });
  }

  searchSuggestion(name: string): void {
    this.query = name;
    this.onSubmit();
  }

  formatId(id: number): string {
    return '#' + id.toString().padStart(3, '0');
  }
}
