'use client';

import { useGame } from '@/contexts/game-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useGame();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <Globe className="h-5 w-5" />
      <span>{language === 'en' ? t.spanish : t.english}</span>
    </Button>
  );
}
