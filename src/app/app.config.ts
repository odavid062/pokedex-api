import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { authInterceptor } from './interceptors/auth.interceptor'; // Importando o interceptor
import { PokemonService } from './pokemon.service';
import { SpellService } from './services/spell.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), // Usando com interceptors
    PokemonService,
    SpellService
  ]
};
