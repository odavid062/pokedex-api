import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonService } from './pokemon.service';
import { SpellService } from './services/spell.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'spa-pokedex';
  
  // Pokémon
  pokemonName: string = '';
  pokemonData: Pokemon | null = null;
  errorMessage: string = '';

  // Spells
  spells: any[] = [];

  constructor(
    private pokemonService: PokemonService,
    private spellService: SpellService
  ) {}

  ngOnInit() {
    this.loadSpells();
  }

  searchPokemon() {
    if (this.pokemonName) {
      this.pokemonService.getPokemon(this.pokemonName).subscribe({
        next: (data: Pokemon) => {
          this.pokemonData = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.pokemonData = null;
          this.errorMessage = error.status === 404
            ? 'Pokémon não encontrado! Verifique o nome e tente novamente.'
            : 'Ocorreu um erro ao buscar o Pokémon. Tente novamente mais tarde.';
        }
      });
    }
  }

  loadSpells() {
    this.spellService.getSpells().subscribe(data => {
      this.spells = data;
    });
  }
}
