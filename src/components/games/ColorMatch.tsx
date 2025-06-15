import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Play } from "lucide-react";

const colors = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#f97316' },
];

const ColorMatch = () => {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [displayedWord, setDisplayedWord] = useState(colors[0].name);
  const [wordColor, setWordColor] = useState(colors[0].value);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  const generateRound = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomWord = colors[Math.floor(Math.random() * colors.length)];
    const randomWordColor = colors[Math.floor(Math.random() * colors.length)];
    
    setCurrentColor(randomColor);
    setDisplayedWord(randomWord.name);
    setWordColor(randomWordColor.value);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setStreak(0);
    generateRound();
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setStreak(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!gameStarted || gameOver) return;

    if (isCorrect) {
      setScore(prev => prev + (10 + streak * 2));
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    generateRound();
  };

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Initial round generation
  useEffect(() => {
    generateRound();
  }, []);

  const isCorrect = currentColor.name === displayedWord;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Color Match</CardTitle>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!gameStarted && !gameOver && (
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Click "Yes" if the word matches the color, "No" if it doesn't!
            </p>
            <Button onClick={startGame} className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          </div>
        )}

        {gameStarted && (
          <>
            <div className="flex justify-between mb-4 text-sm">
              <span>Score: {score}</span>
              <span>Time: {timeLeft}s</span>
              <span>Streak: {streak}</span>
            </div>

            <div className="text-center mb-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Target Color:</p>
                <div 
                  className="w-20 h-20 mx-auto rounded-lg border-2 border-border"
                  style={{ backgroundColor: currentColor.value }}
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Word:</p>
                <p 
                  className="text-4xl font-bold"
                  style={{ color: wordColor }}
                >
                  {displayedWord}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => handleAnswer(isCorrect)}
                className="h-16 text-lg"
                variant="default"
              >
                YES
              </Button>
              <Button 
                onClick={() => handleAnswer(!isCorrect)}
                className="h-16 text-lg"
                variant="outline"
              >
                NO
              </Button>
            </div>
          </>
        )}

        {gameOver && (
          <div className="text-center">
            <div className="mb-4 p-4 bg-secondary rounded-lg">
              <p className="text-lg font-semibold mb-2">Time's Up!</p>
              <p className="text-2xl font-bold text-primary">Final Score: {score}</p>
              <p className="text-sm text-muted-foreground">Best Streak: {streak}</p>
            </div>
            <Button onClick={startGame} className="w-full">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorMatch;