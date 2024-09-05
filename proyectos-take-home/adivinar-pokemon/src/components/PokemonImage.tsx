interface Props {
  currentPokemon: {
    id: number;
    name: string;
    image: string;
  };
  showPokemon: boolean;
}

function PokemonImage({ currentPokemon, showPokemon }: Props) {
  return (
    <img
      className={`pokemon_image ${
        showPokemon == true ? "" : "invisible_image"
      }`}
      src={currentPokemon.image}
      alt={currentPokemon.name}
    />
  );
}

export default PokemonImage;
