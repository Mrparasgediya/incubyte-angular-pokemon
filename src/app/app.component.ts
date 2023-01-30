import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Notification } from './model/notification.model';
import { PokemonModel } from './model/pokemon.model';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  addPokemonForm: FormGroup;
  allPokemons: PokemonModel[];
  pokemonsToDisplay: PokemonModel[];
  isNotificationOn: boolean = false;
  notification: Notification | null


  constructor(private fb: FormBuilder, private pokemonService: PokemonService) {
    this.addPokemonForm = fb.group({});
    this.allPokemons = [];
    this.pokemonsToDisplay = [];
    this.notification = null;
  }

  ngOnInit(): void {
    this.addPokemonForm = this.fb.group({
      name: this.fb.control(''),
      id: this.fb.control(null),
      power: this.fb.control(''),
    });

    const handleFetchAllNotification = (fetchedPokemons: PokemonModel[]) => {
      this.allPokemons = fetchedPokemons;
    }

    this.pokemonService.getPokemons().subscribe({
      next: handleFetchAllNotification.bind(this),
      error: (error) => {
        this.showNotification(new Notification('error', error.message))

      }
    });
  }

  clearForm() {
    this.Name.setValue('');
    this.Power.setValue('');
    this.Id.setValue(0);
  }

  getImageId(id: number): string {
    if (id < 10) {
      return ("00" + id)
    };
    if (id < 100) {
      return ("0" + id);
    }
    return String(id);
  }

  addPokemon() {
    const pokemon: PokemonModel = {
      id: this.Id.value,
      name: this.Name.value,
      power: this.Power.value,
      imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getImageId(this.Id.value)}.png`
    }

    const handleNextResponse = (savedPokemon: PokemonModel) => {
      this.allPokemons = this.allPokemons.concat([savedPokemon]);
      this.showNotification(new Notification('success', `Pokemon ${savedPokemon.name} added successfully!`))
      this.clearForm();
    }

    const handleErrorResponse = (error: any) => {
      this.showNotification(new Notification('error', error.message))
      this.clearForm();
    }

    this.pokemonService.postPokemons(pokemon).subscribe({
      next: handleNextResponse.bind(this),
      error: handleErrorResponse.bind(this)
    });
  }

  showNotification(notification: Notification) {
    this.isNotificationOn = true;
    this.notification = notification;
    setTimeout(() => {
      this.hideNotification()
    }, 3000);
  }

  hideNotification() {
    this.isNotificationOn = false;
    this.notification = null;
  }


  public get Name(): FormControl {
    return this.addPokemonForm.get('name') as FormControl;
  }

  public get Power(): FormControl {
    return this.addPokemonForm.get('power') as FormControl;
  }

  public get Id(): FormControl {
    return this.addPokemonForm.get('id') as FormControl;
  }
}
