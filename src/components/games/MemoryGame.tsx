import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎸'];

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      setMoves(prev => prev + 1);

      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        setCards(prev => prev.map(card => 
          card.id === firstCard || card.id === secondCard
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(prev => prev + 1);
        setFlippedCards([]);

        if (matches + 1 === emojis.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstCard || card.id === secondCard
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matches]);

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 || 
      flippedCards.includes(cardId) || 
      cards[cardId].isMatched
    ) {
      return;
    }

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Memory Game</CardTitle>
          <Button variant="outline" size="sm" onClick={initializeGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4 text-sm">
          <span>Moves: {moves}</span>
          <span>Matches: {matches}/{emojis.length}</span>
        </div>

        {gameWon && (
          <div className="text-center mb-4 p-4 bg-green-100 rounded-lg border">
            <p className="text-green-800 font-semibold">🎉 Congratulations!</p>
            <p className="text-green-700">You won in {moves} moves!</p>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <Button
              key={card.id}
              variant="outline"
              size="lg"
              className={`h-16 text-2xl transition-all duration-300 ${
                card.isFlipped || card.isMatched
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </Button>
          ))}
        </div>

        {gameWon && (
          <Button onClick={initializeGame} className="w-full mt-4">
            Play Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryGame;