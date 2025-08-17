
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
    <div className="w-full max-w-lg">
       <Card className="bg-card/80 backdrop-blur-sm border-4 border-primary/80 shadow-2xl shadow-amber-900/20 rounded-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-end absolute top-4 right-4">
            <LanguageToggle />
          </div>
          <h1 className="text-6xl font-headline text-amber-900/80 drop-shadow-sm -rotate-2">{t.appName}</h1>
          <CardDescription className="text-2xl font-body">{t.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8 px-8">
            <div className="flex items-end gap-4">
              <div className="flex-shrink-0">
                <Avatar className="h-20 w-20 border-2 border-primary rounded-xl">
                  <AvatarImage src={avatarUrl} alt={playerName} />
                  <AvatarFallback className="rounded-xl">
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow space-y-2">
                <Label htmlFor="name" className="text-lg font-headline">{t.yourName}</Label>
                <Input
                  id="name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder={t.language === 'es' ? 'ej., Luisa' : 'e.g., Luisa'}
                  className="rounded-xl h-12 text-base"
                />
              </div>
              <Button onClick={handleGenerateAvatar} disabled={!playerName || isGenerating} type="button" className="rounded-xl h-12 font-headline">
                {isGenerating ? <Loader2 className="animate-spin" /> : t.generateAvatar}
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-headline">{t.winCondition}</Label>
              <RadioGroup
                value={settings.winCondition}
                onValueChange={(value) => setSettings({ ...settings, winCondition: value as 'line' | 'full' | 'corners' })}
                className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-xl border border-primary/20"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="line" id="line" />
                  <Label htmlFor="line" className="text-lg">{t.line}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corners" id="corners" />
                  <Label htmlFor="corners" className="text-lg">{t.corners}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="text-lg">{t.fullBoard}</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label htmlFor="board-count" className="text-lg font-headline">{t.howManyCartons}</Label>
              <Select
                value={String(settings.boardCount)}
                onValueChange={(value) => setSettings({ ...settings, boardCount: Number(value) })}
              >
                <SelectTrigger id="board-count" className="h-12 rounded-xl border-2 border-primary text-base">
                  <SelectValue placeholder="Select number of boards" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={String(num)} className="text-lg">
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-lg font-headline">{t.marking}</Label>
              <div className="flex items-center justify-between rounded-xl border-2 border-primary/20 bg-muted/50 p-2 h-12">
                <span className="px-2 text-lg">{t.manual}</span>
                <Switch
                  checked={settings.autoMark}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoMark: checked })}
                />
                <span className="px-2 text-lg">{t.automatic}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 pt-8 pb-8">
            <Button type="submit" size="lg" className="w-full text-2xl py-8 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-headline">
              {t.play}
            </Button>
          </CardFooter>
        </form>
       </Card>
    </div>
  );
}
