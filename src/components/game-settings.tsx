
'use client';

import { useState } from 'react';
import type { GameSettings } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGame } from '@/contexts/game-context';
import LanguageToggle from './language-toggle';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Loader2, User, HelpCircle, Rows3, Grid, CheckSquare } from 'lucide-react';
import { generateAvatar } from '@/ai/flows/avatar-generator';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    if (!playerName.trim()) {
      toast({
        title: t.language === 'es' ? '¡Espera!' : 'Hold on!',
        description: t.language === 'es' ? 'Por favor, ingresa tu nombre para comenzar.' : 'Please enter your name to start.',
        variant: "destructive"
      });
      return;
    }
    onStartGame(settings);
  };

  return (
    <TooltipProvider>
    <div className="w-full max-w-lg">
       <Card className="bg-card/80 backdrop-blur-sm border-4 border-primary/80 shadow-2xl shadow-amber-900/20 rounded-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-end absolute top-4 right-4">
            <LanguageToggle />
          </div>
          <h1 className="text-6xl font-headline text-amber-900/80 drop-shadow-sm -rotate-2">{t.appName}</h1>
          <CardDescription className="text-4xl tracking-wider font-body -rotate-1">{t.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8 px-8">
            <div className='space-y-2'>
              <Label className="text-xl font-body text-foreground/80 -rotate-1">{t.enterNameToPlay}</Label>
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
                  <Label htmlFor="name" className="text-3xl font-body font-bold tracking-wider -rotate-1">{t.yourName}</Label>
                  <Input
                    id="name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder={t.language === 'es' ? 'ej., Luisa' : 'e.g., Luisa'}
                    className="rounded-xl h-12 text-3xl font-body tracking-wider"
                  />
                </div>
                <Button onClick={handleGenerateAvatar} disabled={!playerName || isGenerating} type="button" size="lg" className="rounded-xl h-12 text-lg">
                  {isGenerating ? <Loader2 className="animate-spin" /> : t.generateAvatar}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-center">
                <div className="flex-1 border-b-2 border-dashed border-primary/20"></div>
                <h3 className="text-xl font-headline text-foreground/80 tracking-wide px-4">{t.gameRules}</h3>
                <div className="flex-1 border-b-2 border-dashed border-primary/20"></div>
              </div>
              <div className="space-y-3">
                <Label className="text-3xl font-body font-bold tracking-wider -rotate-1">{t.winCondition}</Label>
                <RadioGroup
                  value={settings.winCondition}
                  onValueChange={(value) => setSettings({ ...settings, winCondition: value as 'line' | 'full' | 'corners' })}
                  className="grid grid-cols-3 gap-2"
                >
                  <Label htmlFor="line" className="flex flex-col items-center gap-2 p-2 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors cursor-pointer">
                    <RadioGroupItem value="line" id="line" className="sr-only"/>
                    <div className="w-16 h-12 bg-muted/80 rounded grid grid-cols-4 grid-rows-2 gap-1 p-1">
                        <div className="bg-primary rounded-sm col-span-4"></div>
                        <div className="bg-muted rounded-sm col-span-4"></div>
                    </div>
                    <span className="text-2xl font-body tracking-wider">{t.line}</span>
                  </Label>
                  <Label htmlFor="corners" className="flex flex-col items-center gap-2 p-2 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors cursor-pointer">
                    <RadioGroupItem value="corners" id="corners" className="sr-only"/>
                    <div className="w-16 h-12 bg-muted/80 rounded grid grid-cols-4 grid-rows-2 gap-1 p-1">
                        <div className="bg-primary rounded-sm"></div>
                        <div className="bg-muted rounded-sm col-span-2"></div>
                        <div className="bg-primary rounded-sm"></div>
                        <div className="bg-primary rounded-sm"></div>
                        <div className="bg-muted rounded-sm col-span-2"></div>
                        <div className="bg-primary rounded-sm"></div>
                    </div>
                    <span className="text-2xl font-body tracking-wider">{t.corners}</span>
                  </Label>
                  <Label htmlFor="full" className="flex flex-col items-center gap-2 p-2 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors cursor-pointer">
                    <RadioGroupItem value="full" id="full" className="sr-only"/>
                    <div className="w-16 h-12 bg-muted/80 rounded grid grid-cols-4 grid-rows-2 gap-1 p-1">
                        <div className="bg-primary rounded-sm col-span-4"></div>
                        <div className="bg-primary rounded-sm col-span-4"></div>
                    </div>
                    <span className="text-2xl font-body tracking-wider">{t.fullBoard}</span>
                  </Label>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-center">
                  <div className="flex-1 border-b-2 border-dashed border-primary/20"></div>
                  <h3 className="text-xl font-headline text-foreground/80 tracking-wide px-4">{t.gameSetup}</h3>
                  <div className="flex-1 border-b-2 border-dashed border-primary/20"></div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="board-count" className="text-3xl font-body font-bold tracking-wider -rotate-1">{t.howManyCartons}</Label>
                <Select
                  value={String(settings.boardCount)}
                  onValueChange={(value) => setSettings({ ...settings, boardCount: Number(value) })}
                >
                  <SelectTrigger id="board-count" className="h-12 rounded-xl border-2 border-primary text-2xl font-body tracking-wider">
                    <SelectValue placeholder="Select number of boards" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={String(num)} className="text-2xl font-body tracking-wider">
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-3xl font-body font-bold tracking-wider -rotate-1">{t.marking}</Label>
                <RadioGroup
                  value={settings.autoMark ? 'automatic' : 'manual'}
                  onValueChange={(value) => setSettings({ ...settings, autoMark: value === 'automatic' })}
                  className="grid grid-cols-2 gap-4"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="marking-manual" className="flex items-center gap-2 p-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors cursor-pointer">
                        <RadioGroupItem value="manual" id="marking-manual" />
                        <span className="text-2xl font-body tracking-wider">{t.manual}</span>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.manualMarkingTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="marking-automatic" className="flex items-center gap-2 p-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors cursor-pointer">
                        <RadioGroupItem value="automatic" id="marking-automatic" />
                        <span className="text-2xl font-body tracking-wider">{t.automatic}</span>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.automaticMarkingTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 pt-8 pb-8">
            <Button type="submit" size="lg" className="w-full text-3xl h-16 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!playerName.trim()}>
              {t.play}
            </Button>
          </CardFooter>
        </form>
       </Card>
    </div>
    </TooltipProvider>
  );
}
