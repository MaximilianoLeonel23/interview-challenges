import { useEffect, useState } from "react";
import { Pokemon } from "./types";
import random from "./api";
import ScoreTable from "./components/ScoreTable";
import ScoreDialog from "./components/ScoreDialog";
import PokemonImage from "./components/PokemonImage";
import PokemonInputs from "./components/PokemonInputs";

function App() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [showPokemon, setShowPokemon] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    message: "",
    show: false,
  });
  const [score, setScore] = useState({
    success: 0,
    mistakes: 0,
  });

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const pokemon: Pokemon = await random.random();

        setCurrentPokemon(pokemon);
      } catch (error) {
        console.log(error);
      }
    };

    getPokemon();
  }, []);

  useEffect(() => {
    if (score.mistakes != 0 || score.success != 0) {
      localStorage.setItem("score", JSON.stringify(score));
    } else {
      const scoreStorage = localStorage.getItem("score");
      if (scoreStorage) {
        setScore(JSON.parse(scoreStorage));
      }
    }
  }, [score]);

  const guessPokemon = () => {
    const selectedPokemonName = selectedPokemon
      .replace(".", "")
      .trim()
      .split(" ")
      .join("")
      .toLowerCase();
    if (currentPokemon?.name === selectedPokemonName) {
      return true;
    } else {
      return false;
    }
  };

  const getPokemon = async () => {
    const pokemon: Pokemon = await random.random();
    setCurrentPokemon(pokemon);
  };

  const handleGuessing = () => {
    if (dialog.show) return;
    const answer = guessPokemon();
    if (answer) {
      setDialog({
        message: "Adivinaste",
        show: true,
      });
      setScore((prevScore) => ({
        ...prevScore,
        success: prevScore.success + 1,
      }));
      setShowPokemon(true);
    } else {
      setDialog({
        message: "No adivinaste",
        show: true,
      });
      setScore((prevScore) => ({
        ...prevScore,
        mistakes: prevScore.mistakes + 1,
      }));
      setShowPokemon(true);
    }
  };

  const handleReplay = () => {
    setDialog({ message: "", show: false });
    setShowPokemon(false);
    setSelectedPokemon("");
    getPokemon();
  };

  if (!currentPokemon) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="main_container">
      <div className="table_container">
        <ScoreTable score={score} />
      </div>
      <h1 className="main_title">¿Quién es este Pokemon?</h1>
      <div className="pokemon_image_container">
        <ScoreDialog dialog={dialog} />
        <PokemonImage
          showPokemon={showPokemon}
          currentPokemon={currentPokemon}
        />
      </div>
      <PokemonInputs
        value={selectedPokemon}
        onChange={(e) => setSelectedPokemon(e.target.value)}
        onGuess={handleGuessing}
        onReplay={handleReplay}
      />
    </main>
  );
}

export default App;
