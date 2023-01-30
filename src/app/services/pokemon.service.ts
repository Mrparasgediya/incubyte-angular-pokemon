import { PokemonModel } from './../model/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'http://localhost:3000/pokemon'
  constructor(private http: HttpClient) {  }
   getPokemons() {
      return this.http.get<PokemonModel[]>(this.baseUrl);
      // return [
      //   {
      //     id: 1,
      //     name: "Bulbasaur",
      //     power: "Grass",
      //     imageUrl: "1",
      //   },
      //   {
      //     id: 2,
      //     name: "Charizard",
      //     power: "Fire",
      //     imageUrl: "2",
      //   },
      //   {
      //     id: 3,
      //     name: "Squirtle",
      //     power: "Water",
      //     imageUrl: "3",
      //   }
      // ]
   }

   postPokemons(pokemon: PokemonModel) {
    return this.http.post<PokemonModel>(this.baseUrl, pokemon);
   }
}
