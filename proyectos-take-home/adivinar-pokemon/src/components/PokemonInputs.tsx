interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuess: () => void;
  onReplay: () => void;
}

function PokemonInputs({ value, onChange, onGuess, onReplay }: Props) {
  return (
    <div className="input_container">
      <input
        className="nes-input"
        value={value}
        id="pokemon_name_field"
        type="text"
        onChange={onChange}
      />
      <div>
        <button onClick={onGuess} type="button" className="nes-btn is-primary">
          Adivinar
        </button>
        <button type="button" className="nes-btn" onClick={onReplay}>
          Volver a jugar
        </button>
      </div>
    </div>
  );
}

export default PokemonInputs;
