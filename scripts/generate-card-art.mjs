// Generates the static Lotería card artwork in public/cards/.
// Run with: node scripts/generate-card-art.mjs
// Each illustration is drawn in a 200x200 box and placed on a 300x400 card
// with the card number at the top and the Spanish name on a banner below.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'cards');

const C = {
  ink: '#2b1d14',
  red: '#c0392b',
  orange: '#e67e22',
  yellow: '#f4c430',
  green: '#2e8b57',
  dkgreen: '#1e5e3a',
  lime: '#8bc34a',
  blue: '#2e86c1',
  navy: '#1b4f72',
  sky: '#aed6f1',
  brown: '#8b4513',
  tan: '#d2a26b',
  cream: '#fdf2e3',
  white: '#ffffff',
  pink: '#e91e63',
  rose: '#f5a3b5',
  purple: '#7d3c98',
  gray: '#95a5a6',
  silver: '#cfd8dc',
  black: '#2c2c2c',
  skin: '#e8b48a',
};

// Card order and ids must match src/lib/loteria-cards.ts.
const ART = {
  abanico: `
    <path d="M100 170 L20 70 A110 110 0 0 1 180 70 Z" fill="${C.red}"/>
    <path d="M100 170 L45 52 M100 170 L72 42 M100 170 L100 40 M100 170 L128 42 M100 170 L155 52" fill="none"/>
    <path d="M28 78 A100 100 0 0 1 172 78" fill="none" stroke="${C.yellow}" stroke-width="8"/>
    <rect x="90" y="160" width="20" height="30" rx="4" fill="${C.brown}"/>`,
  acha: `
    <rect x="92" y="40" width="16" height="150" rx="6" fill="${C.tan}" transform="rotate(20 100 115)"/>
    <path d="M70 30 Q20 40 25 100 L95 80 L90 40 Z" fill="${C.silver}"/>`,
  anafe: `
    <rect x="40" y="90" width="120" height="70" rx="8" fill="${C.gray}"/>
    <path d="M50 160 L40 195 M150 160 L160 195" fill="none"/>
    <rect x="30" y="80" width="140" height="14" rx="4" fill="${C.black}"/>
    <path d="M75 75 Q65 55 80 40 Q85 60 95 50 Q100 70 85 75 Z" fill="${C.orange}"/>
    <path d="M115 75 Q105 50 125 35 Q128 55 138 50 Q138 70 125 75 Z" fill="${C.red}"/>
    <circle cx="70" cy="125" r="8" fill="${C.black}"/><circle cx="100" cy="125" r="8" fill="${C.black}"/><circle cx="130" cy="125" r="8" fill="${C.black}"/>`,
  ancla: `
    <circle cx="100" cy="35" r="16" fill="none" stroke-width="10" stroke="${C.navy}"/>
    <rect x="93" y="50" width="14" height="130" fill="${C.navy}"/>
    <rect x="65" y="65" width="70" height="12" rx="4" fill="${C.navy}"/>
    <path d="M30 120 Q40 185 100 185 Q160 185 170 120" fill="none" stroke="${C.navy}" stroke-width="12"/>
    <path d="M18 128 L30 105 L44 128 Z M156 128 L170 105 L182 128 Z" fill="${C.navy}"/>`,
  'árbol': `
    <rect x="88" y="120" width="24" height="70" fill="${C.brown}"/>
    <circle cx="100" cy="70" r="50" fill="${C.green}"/>
    <circle cx="60" cy="100" r="32" fill="${C.green}"/>
    <circle cx="140" cy="100" r="32" fill="${C.green}"/>
    <circle cx="80" cy="60" r="6" fill="${C.red}"/><circle cx="125" cy="80" r="6" fill="${C.red}"/><circle cx="65" cy="105" r="6" fill="${C.red}"/>`,
  'avión': `
    <path d="M20 100 Q20 85 40 85 L170 85 Q190 92 170 115 L40 115 Q20 115 20 100 Z" fill="${C.white}"/>
    <path d="M90 90 L60 30 L85 30 L130 90 Z M90 110 L60 170 L85 170 L130 110 Z" fill="${C.red}"/>
    <path d="M30 88 L15 55 L35 55 L52 88 Z" fill="${C.red}"/>
    <circle cx="150" cy="98" r="5" fill="${C.sky}"/><circle cx="132" cy="98" r="5" fill="${C.sky}"/><circle cx="114" cy="98" r="5" fill="${C.sky}"/>`,
  bandera: `
    <rect x="35" y="20" width="10" height="175" fill="${C.brown}"/>
    <path d="M45 30 L175 30 L175 63 L45 63 Z" fill="${C.yellow}"/>
    <path d="M45 63 L175 63 L175 96 L45 96 Z" fill="${C.navy}"/>
    <path d="M45 96 L175 96 L175 129 L45 129 Z" fill="${C.red}"/>
    <g fill="${C.white}" stroke="none"><circle cx="90" cy="72" r="4"/><circle cx="105" cy="68" r="4"/><circle cx="120" cy="68" r="4"/><circle cx="135" cy="72" r="4"/></g>`,
  barco: `
    <path d="M10 175 Q55 160 100 175 T190 175" fill="none" stroke="${C.blue}" stroke-width="8"/>
    <path d="M20 130 L180 130 L155 168 L45 168 Z" fill="${C.brown}"/>
    <rect x="96" y="25" width="8" height="105" fill="${C.ink}"/>
    <path d="M108 30 L108 120 L170 120 Z" fill="${C.white}"/>
    <path d="M92 40 L92 120 L40 120 Z" fill="${C.cream}"/>
    <path d="M104 25 L135 15 L104 5 Z" fill="${C.red}"/>`,
  barril: `
    <path d="M50 30 Q30 100 50 180 L150 180 Q170 100 150 30 Z" fill="${C.tan}"/>
    <ellipse cx="100" cy="30" rx="50" ry="12" fill="${C.brown}"/>
    <path d="M42 65 L158 65 M37 140 L163 140" fill="none" stroke="${C.black}" stroke-width="8"/>
    <path d="M80 45 Q72 105 80 175 M120 45 Q128 105 120 175" fill="none" stroke-width="2"/>`,
  botella: `
    <path d="M85 20 L115 20 L115 65 Q145 85 145 115 L145 185 L55 185 L55 115 Q55 85 85 65 Z" fill="${C.green}"/>
    <rect x="82" y="10" width="36" height="16" rx="3" fill="${C.brown}"/>
    <rect x="62" y="120" width="76" height="40" rx="4" fill="${C.cream}"/>
    <path d="M70 100 L70 175" fill="none" stroke="${C.white}" stroke-width="5" opacity="0.6"/>`,
  botuto: `
    <path d="M30 140 Q20 70 90 40 Q160 20 175 70 Q185 110 150 140 Q110 175 30 140 Z" fill="${C.rose}"/>
    <path d="M30 140 L10 170 L50 155 Z" fill="${C.cream}"/>
    <path d="M90 40 Q120 70 150 140 M60 55 Q95 95 110 155 M130 30 Q150 70 172 85" fill="none" stroke-width="3"/>`,
  campana: `
    <path d="M100 20 Q50 30 45 110 L30 150 L170 150 L155 110 Q150 30 100 20 Z" fill="${C.yellow}"/>
    <rect x="25" y="148" width="150" height="14" rx="6" fill="${C.orange}"/>
    <circle cx="100" cy="175" r="14" fill="${C.orange}"/>
    <rect x="92" y="6" width="16" height="18" rx="4" fill="${C.brown}"/>`,
  caracol: `
    <path d="M15 175 Q15 150 50 150 L170 150 Q190 150 185 175 Z" fill="${C.tan}"/>
    <path d="M170 150 Q175 120 160 110 M180 152 Q192 120 182 105" fill="none"/>
    <circle cx="160" cy="108" r="5" fill="${C.ink}"/><circle cx="182" cy="103" r="5" fill="${C.ink}"/>
    <circle cx="90" cy="105" r="58" fill="${C.orange}"/>
    <path d="M90 105 m0 -10 a10 10 0 1 1 -10 10 a20 20 0 1 1 20 20 a32 32 0 1 1 -32 -32 a46 46 0 1 1 46 46" fill="none" stroke-width="5"/>`,
  casa: `
    <rect x="40" y="90" width="120" height="100" fill="${C.cream}"/>
    <path d="M20 95 L100 25 L180 95 Z" fill="${C.red}"/>
    <rect x="85" y="130" width="30" height="60" fill="${C.brown}"/>
    <rect x="52" y="110" width="25" height="25" fill="${C.sky}"/><rect x="123" y="110" width="25" height="25" fill="${C.sky}"/>
    <rect x="135" y="35" width="16" height="35" fill="${C.brown}"/>`,
  cebolla: `
    <path d="M100 30 Q45 90 50 135 Q55 185 100 185 Q145 185 150 135 Q155 90 100 30 Z" fill="${C.purple}"/>
    <path d="M100 32 Q75 100 85 182 M100 32 Q125 100 115 182" fill="none" stroke="${C.rose}" stroke-width="4"/>
    <path d="M100 30 Q95 10 85 5 M100 30 Q105 10 118 6" fill="none" stroke="${C.green}" stroke-width="6"/>
    <path d="M85 185 L80 197 M100 185 L100 198 M115 185 L120 197" fill="none" stroke-width="3"/>`,
  serrucho: `
    <path d="M30 90 L165 60 L175 105 L35 130 Z" fill="${C.silver}"/>
    <path d="M35 130 L42 140 L50 128 L58 138 L66 125 L74 135 L82 122 L90 132 L98 119 L106 129 L114 116 L122 126 L130 113 L138 123 L146 110 L154 120 L162 107 L175 105" fill="${C.silver}"/>
    <path d="M140 50 Q200 40 195 90 Q190 120 170 110 L160 60 Z" fill="${C.brown}"/>
    <ellipse cx="177" cy="78" rx="8" ry="14" fill="${C.cream}"/>`,
  collar: `
    <path d="M30 40 Q30 150 100 160 Q170 150 170 40" fill="none" stroke="${C.ink}" stroke-width="3"/>
    <g fill="${C.white}"><circle cx="32" cy="60" r="9"/><circle cx="38" cy="90" r="9"/><circle cx="50" cy="117" r="9"/><circle cx="68" cy="140" r="9"/><circle cx="132" cy="140" r="9"/><circle cx="150" cy="117" r="9"/><circle cx="162" cy="90" r="9"/><circle cx="168" cy="60" r="9"/></g>
    <path d="M100 150 L120 175 L100 200 L80 175 Z" fill="${C.red}"/>`,
  copa: `
    <path d="M45 25 L155 25 Q155 100 100 115 Q45 100 45 25 Z" fill="${C.yellow}"/>
    <rect x="93" y="112" width="14" height="50" fill="${C.yellow}"/>
    <path d="M60 185 Q60 160 100 160 Q140 160 140 185 Z" fill="${C.yellow}"/>
    <path d="M52 40 L148 40" fill="none" stroke="${C.red}" stroke-width="8"/>
    <circle cx="100" cy="75" r="10" fill="${C.red}"/>`,
  corona: `
    <path d="M30 150 L20 60 L65 105 L100 40 L135 105 L180 60 L170 150 Z" fill="${C.yellow}"/>
    <rect x="28" y="145" width="144" height="30" rx="4" fill="${C.orange}"/>
    <circle cx="20" cy="58" r="9" fill="${C.red}"/><circle cx="100" cy="38" r="10" fill="${C.red}"/><circle cx="180" cy="58" r="9" fill="${C.red}"/>
    <circle cx="65" cy="160" r="7" fill="${C.blue}"/><circle cx="100" cy="160" r="7" fill="${C.green}"/><circle cx="135" cy="160" r="7" fill="${C.blue}"/>`,
  dado: `
    <path d="M40 70 L110 40 L170 70 L100 100 Z" fill="${C.white}"/>
    <path d="M40 70 L100 100 L100 180 L40 150 Z" fill="${C.cream}"/>
    <path d="M100 100 L170 70 L170 150 L100 180 Z" fill="${C.silver}"/>
    <g fill="${C.red}" stroke="none"><ellipse cx="105" cy="70" rx="9" ry="5"/>
    <circle cx="57" cy="100" r="6"/><circle cx="83" cy="150" r="6"/>
    <circle cx="118" cy="105" r="6"/><circle cx="152" cy="92" r="6"/><circle cx="118" cy="150" r="6"/><circle cx="152" cy="137" r="6"/></g>`,
  domino: `
    <rect x="60" y="15" width="80" height="170" rx="12" fill="${C.white}"/>
    <path d="M65 100 L135 100" fill="none" stroke-width="5"/>
    <g fill="${C.ink}" stroke="none"><circle cx="82" cy="38" r="8"/><circle cx="118" cy="78" r="8"/><circle cx="100" cy="58" r="8"/>
    <circle cx="82" cy="125" r="8"/><circle cx="118" cy="125" r="8"/><circle cx="82" cy="162" r="8"/><circle cx="118" cy="162" r="8"/></g>`,
  embudo: `
    <path d="M25 30 L175 30 L112 120 L112 190 L88 190 L88 120 Z" fill="${C.silver}"/>
    <ellipse cx="100" cy="30" rx="75" ry="14" fill="${C.gray}"/>
    <path d="M150 50 Q190 60 185 90" fill="none" stroke-width="6"/>`,
  escalera: `
    <path d="M55 10 L40 195 M145 10 L160 195" fill="none" stroke="${C.brown}" stroke-width="12"/>
    <path d="M52 40 L148 40 M49 75 L151 75 M46 110 L154 110 M44 145 L156 145 M42 180 L158 180" fill="none" stroke="${C.tan}" stroke-width="9"/>`,
  escoba: `
    <rect x="94" y="5" width="12" height="120" rx="5" fill="${C.brown}" />
    <path d="M85 120 L115 120 L155 190 L45 190 Z" fill="${C.yellow}"/>
    <path d="M80 135 L120 135" fill="none" stroke="${C.red}" stroke-width="7"/>
    <path d="M70 150 L58 188 M85 150 L80 188 M100 150 L100 188 M115 150 L120 188 M130 150 L142 188" fill="none" stroke-width="2"/>`,
  estrella: `
    <path d="M100 15 L124 75 L190 78 L138 118 L156 182 L100 146 L44 182 L62 118 L10 78 L76 75 Z" fill="${C.yellow}"/>
    <path d="M100 55 L112 88 L146 90 L120 110 L128 143 L100 125 L72 143 L80 110 L54 90 L88 88 Z" fill="${C.orange}" stroke="none"/>`,
  flecha: `
    <path d="M30 170 L155 45" fill="none" stroke="${C.brown}" stroke-width="10"/>
    <path d="M185 15 L170 75 L150 50 L125 30 Z" fill="${C.silver}"/>
    <path d="M30 170 L15 150 L45 140 Z M30 170 L50 185 L60 155 Z M45 155 L28 135 L58 125 Z" fill="${C.red}"/>`,
  florero: `
    <path d="M70 110 Q40 140 60 190 L140 190 Q160 140 130 110 L120 95 L80 95 Z" fill="${C.blue}"/>
    <path d="M60 150 L140 150" fill="none" stroke="${C.yellow}" stroke-width="6"/>
    <path d="M95 95 L80 50 M100 95 L100 40 M105 95 L125 50" fill="none" stroke="${C.green}" stroke-width="5"/>
    <circle cx="78" cy="42" r="14" fill="${C.pink}"/><circle cx="100" cy="30" r="14" fill="${C.yellow}"/><circle cx="127" cy="42" r="14" fill="${C.red}"/>`,
  gallina: `
    <ellipse cx="95" cy="120" rx="65" ry="50" fill="${C.tan}"/>
    <circle cx="145" cy="70" r="28" fill="${C.tan}"/>
    <path d="M135 42 Q140 25 150 38 Q158 22 165 45 Z" fill="${C.red}"/>
    <path d="M170 68 L192 75 L170 82 Z" fill="${C.yellow}"/>
    <path d="M160 85 Q168 100 156 100 Z" fill="${C.red}"/>
    <circle cx="153" cy="65" r="4" fill="${C.ink}"/>
    <path d="M30 110 Q10 80 25 60 Q40 90 45 100" fill="${C.brown}"/>
    <path d="M80 165 L75 192 M110 165 L115 192" fill="none" stroke="${C.orange}" stroke-width="5"/>`,
  garza: `
    <ellipse cx="85" cy="110" rx="45" ry="28" fill="${C.white}"/>
    <path d="M115 100 Q140 80 125 50 Q115 25 140 20" fill="none" stroke="${C.white}" stroke-width="16"/>
    <path d="M115 100 Q140 80 125 50 Q115 25 140 20" fill="none" stroke-width="2"/>
    <circle cx="142" cy="20" r="12" fill="${C.white}"/>
    <path d="M152 18 L195 25 L152 26 Z" fill="${C.yellow}"/>
    <circle cx="144" cy="17" r="3" fill="${C.ink}"/>
    <path d="M80 135 L75 195 M95 135 L105 195" fill="none" stroke="${C.ink}" stroke-width="4"/>
    <path d="M40 110 L10 125 L45 120 Z" fill="${C.white}"/>
    <path d="M30 190 Q100 180 180 190" fill="none" stroke="${C.blue}" stroke-width="6"/>`,
  gato: `
    <ellipse cx="100" cy="150" rx="55" ry="45" fill="${C.orange}"/>
    <circle cx="100" cy="80" r="45" fill="${C.orange}"/>
    <path d="M62 55 L60 15 L90 40 Z M138 55 L140 15 L110 40 Z" fill="${C.orange}"/>
    <ellipse cx="83" cy="78" rx="7" ry="10" fill="${C.green}"/><ellipse cx="117" cy="78" rx="7" ry="10" fill="${C.green}"/>
    <path d="M94 95 L106 95 L100 102 Z" fill="${C.pink}"/>
    <path d="M100 102 Q92 112 85 106 M100 102 Q108 112 115 106 M70 98 L40 92 M70 104 L40 108 M130 98 L160 92 M130 104 L160 108" fill="none" stroke-width="2"/>
    <path d="M150 170 Q195 160 180 115" fill="none" stroke="${C.orange}" stroke-width="12"/>`,
  granada: `
    <circle cx="100" cy="115" r="70" fill="${C.red}"/>
    <path d="M80 50 L75 25 L90 38 L100 18 L110 38 L125 25 L120 50 Z" fill="${C.red}"/>
    <path d="M100 115 L100 185" fill="none" stroke-width="2"/>
    <g fill="${C.rose}" stroke="none"><circle cx="75" cy="110" r="7"/><circle cx="90" cy="130" r="7"/><circle cx="70" cy="140" r="7"/><circle cx="125" cy="110" r="7"/><circle cx="112" cy="132" r="7"/><circle cx="132" cy="140" r="7"/></g>`,
  guitarra: `
    <rect x="92" y="5" width="16" height="95" fill="${C.brown}"/>
    <rect x="86" y="0" width="28" height="22" rx="4" fill="${C.black}"/>
    <path d="M100 85 Q55 80 60 120 Q35 140 55 175 Q75 200 100 192 Q125 200 145 175 Q165 140 140 120 Q145 80 100 85 Z" fill="${C.orange}"/>
    <circle cx="100" cy="135" r="16" fill="${C.black}"/>
    <rect x="82" y="165" width="36" height="8" fill="${C.black}"/>
    <path d="M96 10 L96 168 M104 10 L104 168" fill="none" stroke-width="1.5"/>`,
  hoja: `
    <path d="M30 175 Q20 60 170 25 Q180 150 30 175 Z" fill="${C.green}"/>
    <path d="M30 175 Q90 110 165 32 M75 125 L70 80 M100 98 L105 60 M75 125 L120 128 M100 98 L145 100" fill="none" stroke="${C.dkgreen}" stroke-width="4"/>`,
  bombillo: `
    <path d="M100 15 Q45 15 45 75 Q45 105 75 130 L75 150 L125 150 L125 130 Q155 105 155 75 Q155 15 100 15 Z" fill="${C.yellow}"/>
    <rect x="75" y="150" width="50" height="35" rx="4" fill="${C.silver}"/>
    <path d="M75 162 L125 162 M75 174 L125 174" fill="none" stroke-width="3"/>
    <path d="M85 125 L85 95 L95 80 L105 95 L115 80 L115 125" fill="none" stroke="${C.orange}" stroke-width="3"/>
    <path d="M15 60 L30 65 M185 60 L170 65 M30 15 L42 28 M170 15 L158 28" fill="none" stroke="${C.orange}" stroke-width="5"/>`,
  lampara: `
    <path d="M60 20 L140 20 L170 95 L30 95 Z" fill="${C.yellow}"/>
    <rect x="94" y="95" width="12" height="70" fill="${C.brown}"/>
    <path d="M55 190 Q55 165 100 165 Q145 165 145 190 Z" fill="${C.brown}"/>
    <path d="M30 95 L170 95" fill="none" stroke="${C.red}" stroke-width="6"/>`,
  lentes: `
    <circle cx="55" cy="105" r="38" fill="${C.sky}" stroke-width="8"/>
    <circle cx="145" cy="105" r="38" fill="${C.sky}" stroke-width="8"/>
    <path d="M93 100 Q100 88 107 100 M17 98 L2 80 M183 98 L198 80" fill="none" stroke-width="8"/>
    <path d="M38 90 L50 80 M128 90 L140 80" fill="none" stroke="${C.white}" stroke-width="5"/>`,
  libro: `
    <path d="M100 50 Q60 30 15 40 L15 165 Q60 155 100 175 Z" fill="${C.white}"/>
    <path d="M100 50 Q140 30 185 40 L185 165 Q140 155 100 175 Z" fill="${C.cream}"/>
    <path d="M10 45 L10 175 Q60 165 100 185 Q140 165 190 175 L190 45" fill="none" stroke="${C.red}" stroke-width="7"/>
    <path d="M30 70 L85 78 M30 90 L85 98 M30 110 L85 118 M115 78 L170 70 M115 98 L170 90 M115 118 L170 110" fill="none" stroke-width="3"/>`,
  llave: `
    <circle cx="55" cy="100" r="40" fill="${C.yellow}"/>
    <circle cx="55" cy="100" r="15" fill="${C.cream}"/>
    <rect x="92" y="92" width="100" height="16" fill="${C.yellow}"/>
    <path d="M160 108 L160 135 L175 135 L175 108 M135 108 L135 128 L148 128 L148 108" fill="${C.yellow}"/>`,
  luna: `
    <rect x="0" y="0" width="200" height="200" rx="10" fill="${C.navy}" stroke="none"/>
    <path d="M120 25 A75 75 0 1 0 120 175 A90 90 0 0 1 120 25 Z" fill="${C.yellow}"/>
    <g fill="${C.white}" stroke="none"><circle cx="150" cy="50" r="4"/><circle cx="170" cy="120" r="3"/><circle cx="140" cy="160" r="4"/><circle cx="30" cy="30" r="3"/></g>`,
  mango: `
    <path d="M60 50 Q120 10 165 70 Q190 140 130 180 Q60 205 35 140 Q20 90 60 50 Z" fill="${C.orange}"/>
    <path d="M60 50 Q120 10 165 70 Q140 70 110 90 Q75 85 60 50 Z" fill="${C.yellow}" stroke="none" opacity="0.8"/>
    <path d="M95 35 L100 15" fill="none" stroke="${C.brown}" stroke-width="6"/>
    <path d="M100 18 Q130 0 155 18 Q130 32 100 18 Z" fill="${C.green}"/>`,
  mano: `
    <path d="M55 190 L55 110 L30 80 Q22 68 35 62 L65 90 L65 30 Q65 18 77 18 Q88 18 88 30 L88 80 L90 15 Q90 3 102 3 Q114 3 114 15 L113 80 L118 25 Q120 13 132 15 Q143 18 141 30 L136 85 L145 50 Q148 40 158 43 Q168 47 164 58 L150 125 Q145 160 135 190 Z" fill="${C.skin}"/>
    <path d="M60 175 L140 175" fill="none" stroke="${C.red}" stroke-width="8"/>`,
  manzana: `
    <path d="M100 55 Q60 30 35 70 Q15 120 50 170 Q75 200 100 185 Q125 200 150 170 Q185 120 165 70 Q140 30 100 55 Z" fill="${C.red}"/>
    <path d="M100 55 Q98 35 108 18" fill="none" stroke="${C.brown}" stroke-width="7"/>
    <path d="M108 35 Q135 15 160 30 Q135 50 108 35 Z" fill="${C.green}"/>
    <path d="M55 80 Q45 100 50 120" fill="none" stroke="${C.white}" stroke-width="6" opacity="0.7"/>`,
  maracas: `
    <ellipse cx="65" cy="65" rx="40" ry="50" fill="${C.red}" transform="rotate(-20 65 65)"/>
    <path d="M85 110 L115 190" fill="none" stroke="${C.brown}" stroke-width="12"/>
    <ellipse cx="135" cy="65" rx="40" ry="50" fill="${C.yellow}" transform="rotate(20 135 65)"/>
    <path d="M115 110 L85 190" fill="none" stroke="${C.brown}" stroke-width="12"/>
    <path d="M40 60 Q65 75 90 50 M110 50 Q135 75 160 60" fill="none" stroke="${C.green}" stroke-width="6"/>`,
  mariposa: `
    <path d="M100 100 Q60 10 20 40 Q5 80 100 100 Z" fill="${C.orange}"/>
    <path d="M100 100 Q140 10 180 40 Q195 80 100 100 Z" fill="${C.orange}"/>
    <path d="M100 105 Q30 110 40 165 Q70 185 100 105 Z" fill="${C.yellow}"/>
    <path d="M100 105 Q170 110 160 165 Q130 185 100 105 Z" fill="${C.yellow}"/>
    <ellipse cx="100" cy="105" rx="8" ry="45" fill="${C.black}"/>
    <path d="M96 62 Q85 35 75 30 M104 62 Q115 35 125 30" fill="none" stroke-width="3"/>
    <circle cx="50" cy="55" r="8" fill="${C.white}"/><circle cx="150" cy="55" r="8" fill="${C.white}"/>`,
  mascara: `
    <path d="M20 70 Q100 30 180 70 Q185 140 140 150 Q110 155 100 130 Q90 155 60 150 Q15 140 20 70 Z" fill="${C.purple}"/>
    <ellipse cx="62" cy="95" rx="20" ry="14" fill="${C.cream}"/><ellipse cx="138" cy="95" rx="20" ry="14" fill="${C.cream}"/>
    <path d="M25 70 Q10 40 35 25 M175 70 Q190 40 165 25" fill="none" stroke="${C.yellow}" stroke-width="6"/>
    <path d="M40 130 L40 190" fill="none" stroke="${C.brown}" stroke-width="7"/>
    <circle cx="100" cy="70" r="7" fill="${C.yellow}"/>`,
  martillo: `
    <rect x="90" y="60" width="20" height="135" rx="6" fill="${C.brown}"/>
    <path d="M40 30 L150 30 L170 45 L170 75 L40 75 Q25 75 25 52 Q25 30 40 30 Z" fill="${C.gray}"/>
    <path d="M150 30 L185 15 L185 35 L170 45 Z" fill="${C.gray}"/>`,
  ojo: `
    <path d="M10 100 Q100 20 190 100 Q100 180 10 100 Z" fill="${C.white}"/>
    <circle cx="100" cy="100" r="35" fill="${C.blue}"/>
    <circle cx="100" cy="100" r="16" fill="${C.black}"/>
    <circle cx="90" cy="90" r="6" fill="${C.white}" stroke="none"/>
    <path d="M30 70 L15 50 M65 50 L58 28 M100 42 L100 20 M135 50 L142 28 M170 70 L185 50" fill="none" stroke-width="4"/>`,
  oreja: `
    <path d="M70 180 Q40 180 50 140 Q30 110 40 60 Q55 15 105 15 Q160 15 165 70 Q170 110 135 135 Q115 150 115 170 Q110 195 70 180 Z" fill="${C.skin}"/>
    <path d="M75 140 Q65 100 75 70 Q90 45 115 50 Q140 58 138 85 Q135 105 115 110 Q100 112 98 128" fill="none" stroke-width="5"/>`,
  'pájaro': `
    <ellipse cx="95" cy="110" rx="60" ry="42" fill="${C.blue}"/>
    <circle cx="145" cy="75" r="28" fill="${C.blue}"/>
    <path d="M170 70 L195 80 L170 88 Z" fill="${C.orange}"/>
    <circle cx="152" cy="70" r="5" fill="${C.ink}"/>
    <path d="M60 100 Q100 70 120 115 Q90 140 60 100 Z" fill="${C.navy}"/>
    <path d="M40 115 L5 95 L15 130 Z" fill="${C.navy}"/>
    <ellipse cx="110" cy="130" rx="25" ry="12" fill="${C.yellow}" stroke="none"/>
    <path d="M85 150 L80 180 M105 150 L110 180 M20 180 L180 180" fill="none" stroke="${C.brown}" stroke-width="5"/>`,
  paraguas: `
    <path d="M10 100 Q100 -10 190 100 Q167 85 145 100 Q122 85 100 100 Q77 85 55 100 Q32 85 10 100 Z" fill="${C.red}"/>
    <path d="M100 40 Q78 70 55 100 M100 40 Q122 70 145 100" fill="none" stroke-width="3"/>
    <path d="M100 100 L100 170 Q100 190 82 190 Q65 190 65 172" fill="none" stroke="${C.ink}" stroke-width="8"/>
    <rect x="96" y="20" width="8" height="15" fill="${C.ink}"/>`,
  patilla: `
    <path d="M10 70 L190 70 A90 90 0 0 1 10 70 Z" fill="${C.green}"/>
    <path d="M22 70 L178 70 A78 78 0 0 1 22 70 Z" fill="${C.white}" stroke="none"/>
    <path d="M28 70 L172 70 A72 72 0 0 1 28 70 Z" fill="${C.red}" stroke="none"/>
    <g fill="${C.black}" stroke="none"><ellipse cx="70" cy="95" rx="4" ry="7"/><ellipse cx="100" cy="110" rx="4" ry="7"/><ellipse cx="130" cy="95" rx="4" ry="7"/><ellipse cx="85" cy="125" rx="4" ry="7"/><ellipse cx="115" cy="125" rx="4" ry="7"/><ellipse cx="55" cy="80" rx="4" ry="7"/><ellipse cx="145" cy="80" rx="4" ry="7"/></g>`,
  pato: `
    <path d="M25 115 Q30 175 100 175 Q170 175 175 125 Q150 135 130 120 L40 110 Z" fill="${C.yellow}"/>
    <circle cx="130" cy="75" r="32" fill="${C.yellow}"/>
    <path d="M155 80 Q195 80 190 95 Q170 100 150 92 Z" fill="${C.orange}"/>
    <circle cx="138" cy="68" r="5" fill="${C.ink}"/>
    <path d="M60 125 Q90 110 115 140 Q85 155 60 125 Z" fill="${C.orange}"/>
    <path d="M5 185 Q50 170 100 185 T195 185" fill="none" stroke="${C.blue}" stroke-width="6"/>`,
  peine: `
    <rect x="15" y="60" width="170" height="35" rx="8" fill="${C.pink}"/>
    <g fill="${C.pink}">${Array.from({ length: 14 }, (_, i) => `<rect x="${22 + i * 11.5}" y="92" width="7" height="${i % 2 ? 60 : 70}" rx="3"/>`).join('')}</g>`,
  pelota: `
    <circle cx="100" cy="100" r="85" fill="${C.white}"/>
    <path d="M100 15 A85 85 0 0 1 185 100 L100 100 Z" fill="${C.red}"/>
    <path d="M100 185 A85 85 0 0 1 15 100 L100 100 Z" fill="${C.blue}"/>
    <path d="M15 100 A85 85 0 0 1 100 15 L100 100 Z" fill="${C.yellow}"/>
    <circle cx="100" cy="100" r="85" fill="none"/>
    <circle cx="100" cy="100" r="15" fill="${C.white}"/>`,
  pescado: `
    <path d="M20 100 Q80 30 150 100 Q80 170 20 100 Z" fill="${C.blue}"/>
    <path d="M145 100 L190 60 L180 100 L190 140 Z" fill="${C.blue}"/>
    <circle cx="50" cy="90" r="7" fill="${C.white}"/><circle cx="50" cy="90" r="3" fill="${C.ink}"/>
    <path d="M75 70 Q90 100 75 130 M95 70 Q110 100 95 130 M115 75 Q128 100 115 125" fill="none" stroke="${C.sky}" stroke-width="4"/>
    <path d="M70 62 Q95 35 120 70" fill="${C.navy}"/>`,
  pica: `
    <path d="M100 15 Q130 60 170 85 Q195 115 170 140 Q145 160 110 140 Q120 175 140 190 L60 190 Q80 175 90 140 Q55 160 30 140 Q5 115 30 85 Q70 60 100 15 Z" fill="${C.black}"/>`,
  pimpina: `
    <path d="M70 60 Q20 90 30 150 Q40 195 100 195 Q160 195 170 150 Q180 90 130 60 Z" fill="${C.tan}"/>
    <rect x="78" y="25" width="44" height="40" fill="${C.tan}"/>
    <rect x="72" y="18" width="56" height="12" rx="4" fill="${C.brown}"/>
    <path d="M130 70 Q180 70 165 120" fill="none" stroke="${C.tan}" stroke-width="14"/>
    <path d="M30 130 Q100 145 170 130" fill="none" stroke="${C.red}" stroke-width="7"/>`,
  pipa: `
    <path d="M20 70 L120 115" fill="none" stroke="${C.black}" stroke-width="12"/>
    <path d="M115 90 L175 90 L170 165 Q140 185 120 165 Z" fill="${C.brown}"/>
    <ellipse cx="145" cy="90" rx="30" ry="9" fill="${C.black}"/>
    <path d="M140 75 Q130 55 145 40 Q160 25 150 5" fill="none" stroke="${C.gray}" stroke-width="5"/>`,
  'piña': `
    <ellipse cx="100" cy="135" rx="55" ry="62" fill="${C.yellow}"/>
    <path d="M55 105 L145 165 M50 140 L120 192 M75 80 L155 135 M145 105 L55 165 M150 140 L80 192 M125 80 L45 135" fill="none" stroke="${C.orange}" stroke-width="3"/>
    <path d="M100 75 L80 10 L95 45 L100 0 L105 45 L120 10 L100 75 Z M95 72 L55 30 L85 70 Z M105 72 L145 30 L115 70 Z" fill="${C.green}"/>`,
  pluma: `
    <path d="M40 185 Q50 110 110 50 Q150 15 180 15 Q175 60 140 100 Q90 155 40 185 Z" fill="${C.sky}"/>
    <path d="M30 195 L170 30" fill="none" stroke="${C.navy}" stroke-width="4"/>
    <path d="M80 140 L60 125 M100 115 L82 100 M120 92 L102 75 M95 140 L120 145 M115 117 L140 120 M135 92 L160 92" fill="none" stroke="${C.navy}" stroke-width="2"/>`,
  reloj: `
    <rect x="75" y="0" width="50" height="45" rx="6" fill="${C.brown}"/>
    <rect x="75" y="155" width="50" height="45" rx="6" fill="${C.brown}"/>
    <circle cx="100" cy="100" r="62" fill="${C.yellow}"/>
    <circle cx="100" cy="100" r="50" fill="${C.white}"/>
    <path d="M100 100 L100 62 M100 100 L128 112" fill="none" stroke-width="6"/>
    <g fill="${C.ink}" stroke="none"><circle cx="100" cy="58" r="3"/><circle cx="142" cy="100" r="3"/><circle cx="100" cy="142" r="3"/><circle cx="58" cy="100" r="3"/></g>
    <rect x="162" y="92" width="14" height="16" rx="3" fill="${C.yellow}"/>`,
  rosa: `
    <path d="M100 95 Q95 150 100 195" fill="none" stroke="${C.green}" stroke-width="7"/>
    <path d="M100 150 Q70 130 55 145 Q75 165 100 150 Z M100 170 Q130 150 145 165 Q125 185 100 170 Z" fill="${C.green}"/>
    <circle cx="100" cy="65" r="48" fill="${C.red}"/>
    <path d="M100 65 m0 -8 a8 8 0 1 1 -8 8 a16 16 0 1 1 16 16 a26 26 0 1 1 -26 -26 a36 36 0 1 1 36 36" fill="none" stroke="#8e1b10" stroke-width="4"/>`,
  zarcillos: `
    <path d="M60 15 L60 45 M140 15 L140 45" fill="none" stroke="${C.yellow}" stroke-width="5"/>
    <circle cx="60" cy="15" r="8" fill="${C.yellow}"/><circle cx="140" cy="15" r="8" fill="${C.yellow}"/>
    <circle cx="60" cy="100" r="50" fill="none" stroke="${C.yellow}" stroke-width="10"/>
    <circle cx="140" cy="100" r="50" fill="none" stroke="${C.yellow}" stroke-width="10"/>
    <path d="M60 150 L72 175 L60 195 L48 175 Z M140 150 L152 175 L140 195 L128 175 Z" fill="${C.red}"/>`,
  silla: `
    <path d="M50 10 L50 195 M150 10 L150 195" fill="none" stroke="${C.brown}" stroke-width="12"/>
    <path d="M50 25 L150 25 M50 55 L150 55 M50 85 L150 85" fill="none" stroke="${C.tan}" stroke-width="10"/>
    <path d="M25 120 L175 120 L165 140 L35 140 Z" fill="${C.tan}"/>
    <path d="M40 140 L35 195 M160 140 L165 195 M45 170 L155 170" fill="none" stroke="${C.brown}" stroke-width="8"/>`,
  sombrero: `
    <ellipse cx="100" cy="135" rx="95" ry="35" fill="${C.yellow}"/>
    <path d="M60 135 Q55 50 100 35 Q145 50 140 135 Z" fill="${C.yellow}"/>
    <path d="M58 112 Q100 125 142 112 L141 128 Q100 140 59 128 Z" fill="${C.red}"/>
    <path d="M20 140 Q100 170 180 140" fill="none" stroke="${C.green}" stroke-width="5"/>`,
  tambor: `
    <path d="M30 60 L30 160 Q100 195 170 160 L170 60 Z" fill="${C.red}"/>
    <ellipse cx="100" cy="60" rx="70" ry="22" fill="${C.cream}"/>
    <path d="M30 70 L65 165 L100 75 L135 175 L170 70" fill="none" stroke="${C.yellow}" stroke-width="4"/>
    <path d="M60 30 L120 5 M140 30 L190 15" fill="none" stroke="${C.brown}" stroke-width="7"/>`,
  tasa: `
    <path d="M30 70 L150 70 L140 160 Q90 180 40 160 Z" fill="${C.white}"/>
    <path d="M148 90 Q190 90 185 120 Q180 145 142 140" fill="none" stroke-width="12" stroke="${C.ink}"/>
    <path d="M148 90 Q190 90 185 120 Q180 145 142 140" fill="none" stroke-width="6" stroke="${C.white}"/>
    <ellipse cx="90" cy="70" rx="60" ry="12" fill="${C.brown}"/>
    <ellipse cx="90" cy="180" rx="80" ry="12" fill="${C.blue}"/>
    <path d="M45 115 L135 115" fill="none" stroke="${C.blue}" stroke-width="7"/>
    <path d="M70 50 Q60 35 75 20 M105 50 Q95 35 110 20" fill="none" stroke="${C.gray}" stroke-width="4"/>`,
  tetera: `
    <ellipse cx="100" cy="125" rx="65" ry="58" fill="${C.blue}"/>
    <path d="M38 115 Q5 100 10 60 L25 60 Q30 95 45 100 Z" fill="${C.blue}"/>
    <path d="M160 100 Q200 100 195 140 Q190 175 155 160" fill="none" stroke="${C.navy}" stroke-width="10"/>
    <path d="M60 72 Q100 55 140 72 Z" fill="${C.navy}"/>
    <circle cx="100" cy="55" r="10" fill="${C.navy}"/>
    <path d="M45 130 L155 130" fill="none" stroke="${C.white}" stroke-width="6"/>`,
  tierra: `
    <circle cx="100" cy="100" r="85" fill="${C.blue}"/>
    <path d="M55 40 Q85 30 95 55 Q80 80 95 100 Q80 130 60 120 Q40 95 45 70 Z" fill="${C.green}"/>
    <path d="M120 30 Q160 45 170 80 Q150 90 135 75 Q115 65 120 30 Z" fill="${C.green}"/>
    <path d="M115 120 Q150 110 160 135 Q145 170 120 165 Q105 145 115 120 Z" fill="${C.green}"/>`,
  tijeras: `
    <path d="M100 100 L180 20 L190 30 Z" fill="${C.silver}"/>
    <path d="M100 100 L25 30 Q30 20 40 22 Z" fill="${C.silver}"/>
    <circle cx="100" cy="100" r="6" fill="${C.ink}"/>
    <path d="M100 100 L65 150 M100 100 L135 150" fill="none" stroke="${C.red}" stroke-width="10"/>
    <circle cx="55" cy="165" r="22" fill="none" stroke="${C.red}" stroke-width="10"/>
    <circle cx="145" cy="165" r="22" fill="none" stroke="${C.red}" stroke-width="10"/>`,
  'trébol': `
    <path d="M100 105 Q110 160 140 195" fill="none" stroke="${C.dkgreen}" stroke-width="8"/>
    <g fill="${C.green}">
    <path d="M100 100 Q50 100 45 60 Q45 30 70 30 Q100 30 100 60 Q100 30 130 30 Q155 30 155 60 Q150 100 100 100 Z" transform="rotate(0 100 100)"/>
    <path d="M100 100 Q50 100 45 60 Q45 30 70 30 Q100 30 100 60 Q100 30 130 30 Q155 30 155 60 Q150 100 100 100 Z" transform="rotate(120 100 100)"/>
    <path d="M100 100 Q50 100 45 60 Q45 30 70 30 Q100 30 100 60 Q100 30 130 30 Q155 30 155 60 Q150 100 100 100 Z" transform="rotate(240 100 100)"/></g>`,
  'tres pelotas': `
    <circle cx="100" cy="55" r="42" fill="${C.red}"/>
    <circle cx="55" cy="140" r="42" fill="${C.blue}"/>
    <circle cx="145" cy="140" r="42" fill="${C.yellow}"/>
    <g fill="none" stroke="${C.white}" stroke-width="5"><path d="M80 35 Q90 25 102 25"/><path d="M35 120 Q45 110 57 110"/><path d="M125 120 Q135 110 147 110"/></g>`,
  trompeta: `
    <path d="M20 100 L120 92 L190 40 L190 160 L120 108 Z" fill="${C.yellow}"/>
    <ellipse cx="190" cy="100" rx="10" ry="60" fill="${C.orange}"/>
    <rect x="5" y="90" width="20" height="20" rx="4" fill="${C.orange}"/>
    <rect x="60" y="65" width="9" height="30" fill="${C.yellow}"/><rect x="78" y="65" width="9" height="30" fill="${C.yellow}"/><rect x="96" y="65" width="9" height="30" fill="${C.yellow}"/>
    <path d="M50 108 Q80 150 115 108" fill="none" stroke="${C.yellow}" stroke-width="8"/>`,
  'yo-yo': `
    <path d="M100 5 L100 70" fill="none" stroke-width="3"/>
    <circle cx="100" cy="5" r="6" fill="${C.red}"/>
    <circle cx="100" cy="125" r="70" fill="${C.red}"/>
    <circle cx="100" cy="125" r="45" fill="${C.yellow}"/>
    <circle cx="100" cy="125" r="12" fill="${C.ink}"/>`,
  trompo: `
    <path d="M30 70 Q100 30 170 70 Q160 130 100 185 Q40 130 30 70 Z" fill="${C.red}"/>
    <path d="M38 95 Q100 75 162 95 M60 135 Q100 120 140 135" fill="none" stroke="${C.yellow}" stroke-width="8"/>
    <rect x="90" y="20" width="20" height="30" rx="5" fill="${C.brown}"/>
    <path d="M100 185 L100 198" fill="none" stroke="${C.gray}" stroke-width="5"/>`,
  uvas: `
    <path d="M100 30 Q100 10 115 5" fill="none" stroke="${C.brown}" stroke-width="6"/>
    <path d="M100 25 Q130 0 160 20 Q130 40 100 25 Z" fill="${C.green}"/>
    <g fill="${C.purple}">${[[70, 50], [100, 50], [130, 50], [55, 80], [85, 80], [115, 80], [145, 80], [70, 110], [100, 110], [130, 110], [85, 140], [115, 140], [100, 170]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16"/>`).join('')}</g>`,
  vaso: `
    <path d="M45 20 L155 20 L140 190 L60 190 Z" fill="${C.sky}" opacity="0.9"/>
    <path d="M52 80 L148 80 L140 190 L60 190 Z" fill="${C.orange}"/>
    <path d="M68 35 L78 175" fill="none" stroke="${C.white}" stroke-width="6"/>
    <path d="M120 0 L105 120" fill="none" stroke="${C.red}" stroke-width="7"/>`,
  berenjena: `
    <path d="M85 45 Q40 70 35 130 Q35 190 95 190 Q165 185 165 125 Q160 80 120 50 Z" fill="${C.purple}"/>
    <path d="M80 50 Q100 20 125 50 Q115 65 100 55 Q90 65 80 50 Z" fill="${C.green}"/>
    <path d="M102 30 Q100 10 112 2" fill="none" stroke="${C.green}" stroke-width="7"/>
    <path d="M60 110 Q55 140 70 165" fill="none" stroke="${C.white}" stroke-width="6" opacity="0.6"/>`,
  zanahoria: `
    <path d="M60 50 Q100 30 130 55 L60 190 Z" fill="${C.orange}" transform="rotate(-15 100 100)"/>
    <path d="M70 80 L95 85 M65 115 L85 118 M60 150 L75 152" fill="none" stroke-width="3" transform="rotate(-15 100 100)"/>
    <path d="M100 45 Q90 10 70 5 M105 45 Q110 15 125 0 M110 48 Q135 25 160 25" fill="none" stroke="${C.green}" stroke-width="8"/>`,
  zapato: `
    <path d="M20 160 L20 70 Q40 60 65 70 Q80 110 120 115 Q185 120 190 160 Z" fill="${C.brown}"/>
    <rect x="15" y="158" width="180" height="16" rx="5" fill="${C.black}"/>
    <path d="M60 85 L90 80 M68 98 L100 93 M78 110 L108 105" fill="none" stroke="${C.cream}" stroke-width="4"/>`,
};

export function cardSlug(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderCard(number, name, art) {
  const label = escapeXml(name.toUpperCase());
  const fontSize = label.length > 10 ? 26 : 32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
<rect width="300" height="400" rx="14" fill="${C.cream}"/>
<rect x="10" y="10" width="280" height="380" rx="8" fill="none" stroke="#d2691e" stroke-width="6"/>
<text x="26" y="52" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="bold" fill="${C.ink}">${number}</text>
<g transform="translate(50 70)" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${art}
</g>
<rect x="24" y="310" width="252" height="62" rx="6" fill="#d2691e"/>
<text x="150" y="352" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="bold" fill="${C.white}">${label}</text>
</svg>
`;
}

async function main() {
  // Read the ficha list straight from the TS source so the two can't drift.
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'lib', 'loteria-cards.ts'), 'utf8');
  const names = [...src.matchAll(/\{ es: '([^']+)'/g)].map((m) => m[1]);
  const unique = [...new Set(names)].slice(0, 80);

  mkdirSync(OUT_DIR, { recursive: true });
  const missing = unique.filter((n) => !ART[n]);
  if (missing.length) throw new Error(`No artwork defined for: ${missing.join(', ')}`);

  unique.forEach((name, i) => {
    writeFileSync(join(OUT_DIR, `${cardSlug(name)}.svg`), renderCard(i + 1, name, ART[name]));
  });
  console.log(`Wrote ${unique.length} cards to ${OUT_DIR}`);
}

main();
