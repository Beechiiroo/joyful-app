import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

type Player = 'X' | 'O' | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (newBoard: Player[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameOver(false);
    setWinner(null);
  };

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} wins!`;
    if (gameOver) return "It's a tie!";
    return `Player ${currentPlayer}'s turn`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tic Tac Toe</CardTitle>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">{getStatusMessage()}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {board.map((cell, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className="h-16 text-2xl font-bold"
              onClick={() => handleClick(index)}
              disabled={!!cell || gameOver}
            >
              {cell}
            </Button>
          ))}
        </div>

        {gameOver && (
          <Button onClick={resetGame} className="w-full">
            Play Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TicTacToe;