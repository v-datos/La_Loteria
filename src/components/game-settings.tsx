'use client';

import { useState } from 'react';
import type { GameSettings } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useGame } from '@/contexts/game-context';
import LanguageToggle from './language-toggle';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Loader2, User } from 'lucide-react';
import { generateAvatar } from '@/ai/flows/avatar-generator';
import { useToast } from '@/hooks/use-toast';

interface GameSettingsProps {
  onStartGame: (settings: GameSettings) => void;
}

export default function GameSettingsComponent({ onStartGame }: GameSettingsProps) {
  const [settings, setSettings] = useState<GameSettings>({
    winCondition: 'line',
    boardCount: 1,
    autoMark: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { t, playerName, setPlayerName, avatarUrl, setAvatarUrl } = useGame();
  const { toast } = useToast();

  const handleGenerateAvatar = async () => {
    if (!playerName) return;
    setIsGenerating(true);
    try {
      const result = await generateAvatar({ name: playerName });
      setAvatarUrl(result.avatarDataUri);
    } catch (error) {
      console.error('Avatar generation failed:', error);
      toast({
        title: 'Error',
        description: 'Could not generate avatar. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(settings);
  };

  return (
    <div className="w-full max-w-md">
       <Card className="bg-card/80 backdrop-blur-sm border-4 border-primary/80 shadow-2xl shadow-amber-900/20">
        <CardHeader className="text-center">
          <div className="flex justify-end absolute top-4 right-4">
            <LanguageToggle />
          </div>
          <h1 className="text-5xl font-bold font-headline text-amber-900/80 drop-shadow-sm">{t.appName}</h1>
          <CardDescription className="text-lg">{t.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex items-end gap-4">
              <div className="flex-shrink-0">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarImage src={avatarUrl} alt={playerName} />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow space-y-2">
                <Label htmlFor="name" className="text-lg">{t.yourName}</Label>
                <Input
                  id="name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="e.g., Luisa"
                />
              </div>
              <Button onClick={handleGenerateAvatar} disabled={!playerName || isGenerating} type="button">
                {isGenerating ? <Loader2 className="animate-spin" /> : t.generateAvatar}
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-lg">{t.winCondition}</Label>
              <RadioGroup
                value={settings.winCondition}
                onValueChange={(value) => setSettings({ ...settings, winCondition: value as 'line' | 'full' })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="line" id="line" />
                  <Label htmlFor="line">{t.line}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">{t.fullBoard}</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="board-count" className="text-lg">{t.howManyCartons}</Label>
              <Select
                value={String(settings.boardCount)}
                onValueChange={(value) => setSettings({ ...settings, boardCount: Number(value) })}
              >
                <SelectTrigger id="board-count">
                  <SelectValue placeholder="Select number of boards" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-lg">{t.marking}</Label>
              <div className="flex items-center gap-4">
                <span>{t.manual}</span>
                <Switch
                  checked={settings.autoMark}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoMark: checked })}
                />
                <span>{t.automatic}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full text-xl py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              {t.play}
            </Button>
          </CardFooter>
        </form>
       </Card>
    </div>
  );
}
