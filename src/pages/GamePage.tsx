import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import TicTacToe from "@/components/games/TicTacToe";
import MemoryGame from "@/components/games/MemoryGame";
import SnakeGame from "@/components/games/SnakeGame";
import ColorMatch from "@/components/games/ColorMatch";

const gameComponents = {
  "tic-tac-toe": TicTacToe,
  "memory-game": MemoryGame,
  "snake-game": SnakeGame,
  "color-match": ColorMatch,
  "puzzle-slider": () => <div className="text-center p-8">Coming Soon!</div>,
  "word-game": () => <div className="text-center p-8">Coming Soon!</div>,
};

const gameInfo = {
  "tic-tac-toe": {
    title: "Tic Tac Toe",
    instructions: "Click on empty squares to place your mark. Get three in a row to win!"
  },
  "memory-game": {
    title: "Memory Cards",
    instructions: "Click cards to flip them. Match pairs to clear the board!"
  },
  "snake-game": {
    title: "Snake Classic",
    instructions: "Use WASD or arrow keys to move. Collect food to grow!"
  },
  "color-match": {
    title: "Color Match",
    instructions: "Click the button that matches the displayed color word!"
  },
  "puzzle-slider": {
    title: "Puzzle Slider",
    instructions: "Coming soon - slide tiles to complete the puzzle!"
  },
  "word-game": {
    title: "Word Builder",
    instructions: "Coming soon - create words from given letters!"
  },
};

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  
  if (!gameId || !gameComponents[gameId as keyof typeof gameComponents]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Game Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">The requested game could not be found.</p>
            <Link to="/">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const GameComponent = gameComponents[gameId as keyof typeof gameComponents];
  const info = gameInfo[gameId as keyof typeof gameInfo];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">{info.title}</h1>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                All Games
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">{info.instructions}</p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <GameComponent />
        </div>
      </main>
    </div>
  );
};

export default GamePage;