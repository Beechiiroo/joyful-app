import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Gamepad2, Zap, Brain, Target, Puzzle } from "lucide-react";

const games = [
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Classic strategy game for two players",
    category: "Strategy",
    icon: Target,
    difficulty: "Easy",
    players: "2 Players"
  },
  {
    id: "memory-game",
    title: "Memory Cards",
    description: "Test your memory with matching cards",
    category: "Memory",
    icon: Brain,
    difficulty: "Medium",
    players: "1 Player"
  },
  {
    id: "snake-game",
    title: "Snake Classic",
    description: "Navigate the snake to collect food",
    category: "Arcade",
    icon: Zap,
    difficulty: "Medium",
    players: "1 Player"
  },
  {
    id: "puzzle-slider",
    title: "Puzzle Slider",
    description: "Slide tiles to complete the image",
    category: "Puzzle",
    icon: Puzzle,
    difficulty: "Hard",
    players: "1 Player"
  },
  {
    id: "color-match",
    title: "Color Match",
    description: "Match colors as fast as you can",
    category: "Speed",
    icon: Target,
    difficulty: "Easy",
    players: "1 Player"
  },
  {
    id: "word-game",
    title: "Word Builder",
    description: "Create words from given letters",
    category: "Word",
    icon: Brain,
    difficulty: "Medium",
    players: "1 Player"
  }
];

const categories = ["All", "Strategy", "Memory", "Arcade", "Puzzle", "Speed", "Word"];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">GameHub Pro</h1>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Games Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const IconComponent = game.icon;
            return (
              <Link key={game.id} to={`/game/${game.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{game.category}</Badge>
                      <span className="text-sm text-muted-foreground">{game.players}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No games found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground">
            © 2024 GameHub Pro - Professional Gaming Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;