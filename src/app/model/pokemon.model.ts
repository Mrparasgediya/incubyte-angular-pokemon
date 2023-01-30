export class PokemonModel {
    id?: number = 0;
    name: string = '';
    power: string = '';
    imageUrl: string = '';

    toString(): string {
        return `id: ${this.id}, name: ${this.name}, power: ${this.power}, imageUrl: ${this.imageUrl}`;
    }
}