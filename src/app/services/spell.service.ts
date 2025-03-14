import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // 'of' é utilizado para emitir um valor fixo, como um array vazio
import { catchError } from 'rxjs/operators';

// Definindo a interface para os feitiços (spells)
interface Spell {
  id: number;
  name: string;
  description: string;
  // Adicione outros campos conforme necessário
}

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'; 

  constructor(private http: HttpClient) {}

  // Método para obter a lista de feitiços
  getSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao buscar feitiços', error);
        // Retorna um array vazio em caso de erro, para evitar quebrar a aplicação
        return of([]);  // Retorna um array vazio como fallback
      })
    );
  }
}
