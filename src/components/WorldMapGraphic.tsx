import React from 'react';

interface WorldMapGraphicProps {
  className?: string;
  opacity?: number;
}

/**
 * WorldMapGraphic - A subtle, refined vector world map illustration
 * used as an ambient executive watermark across the trade intelligence terminal.
 */
export const WorldMapGraphic: React.FC<WorldMapGraphicProps> = ({
  className = 'w-full h-full text-emerald-950/5 pointer-events-none select-none',
  opacity = 0.05
}) => {
  return (
    <svg
      viewBox="0 0 1000 500"
      className={className}
      fill="currentColor"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="executiveGrid" width="25" height="25" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.75" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>

      {/* Subtle coordinate grid lines */}
      <line x1="0" y1="125" x2="1000" y2="125" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
      <line x1="0" y1="250" x2="1000" y2="250" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.6" />
      <line x1="0" y1="375" x2="1000" y2="375" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
      <line x1="250" y1="0" x2="250" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
      <line x1="500" y1="0" x2="500" y2="500" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.6" />
      <line x1="750" y1="0" x2="750" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />

      {/* Equator & Prime Meridian markers */}
      <rect width="1000" height="500" fill="url(#executiveGrid)" />

      {/* North America */}
      <path d="M120 70 Q160 50 220 60 Q260 80 280 130 Q270 170 240 190 Q220 220 200 240 Q170 230 150 180 Q130 150 110 110 Z" />
      <path d="M220 40 Q250 30 280 40 Q300 70 270 80 Z" /> {/* Greenland */}
      <path d="M150 110 Q190 100 220 120 Q200 150 160 140 Z" /> {/* Hudson area */}

      {/* Central & South America */}
      <path d="M210 245 Q240 260 250 300 Q260 360 240 430 Q210 440 200 380 Q190 320 205 270 Z" />

      {/* Europe & Scandinavia (Cold climate focal cluster) */}
      <path d="M470 80 Q500 70 520 90 Q510 120 490 130 Q460 110 470 80 Z" /> {/* Scandinavia / Norway / Sweden / Finland */}
      <path d="M450 120 Q480 110 500 130 Q490 170 450 170 Q430 150 450 120 Z" /> {/* Western / Central Europe / Germany / Switzerland */}
      <path d="M420 115 Q435 110 440 125 Q430 140 415 130 Z" /> {/* UK & Ireland */}

      {/* Africa */}
      <path d="M460 180 Q530 175 560 220 Q565 290 520 360 Q480 370 460 300 Q440 240 460 180 Z" />

      {/* Asia & India (Origin Hub) */}
      <path d="M540 80 Q650 60 760 90 Q820 120 840 190 Q780 230 720 220 Q670 250 640 280 Q620 240 590 200 Q550 160 540 120 Z" />
      <path d="M625 210 Q660 215 670 260 Q650 300 635 315 Q620 280 615 240 Z" fill="currentColor" opacity="1.4" /> {/* India Subcontinent highlighted */}
      <path d="M820 140 Q850 130 845 170 Q830 180 815 160 Z" /> {/* Japan */}

      {/* Southeast Asia & Oceania */}
      <path d="M720 280 Q760 270 780 310 Q740 330 710 300 Z" />
      <path d="M760 340 Q840 330 860 390 Q830 440 760 420 Q740 380 760 340 Z" /> {/* Australia */}
      <path d="M870 410 Q890 400 890 430 Q870 440 865 420 Z" /> {/* New Zealand */}

      {/* Subtle strategic trade vectors connecting Mumbai/India to Northern Europe, North America, and East Asia */}
      <g stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.45" fill="none">
        <path d="M635 250 Q550 170 475 115" /> {/* India to Scandinavia/Central Europe */}
        <path d="M635 250 Q400 120 230 150" /> {/* India to North America */}
        <path d="M635 250 Q740 200 830 160" /> {/* India to Japan */}
      </g>

      {/* Subtle origin pulse pin at Mumbai / India */}
      <circle cx="635" cy="250" r="3.5" fill="#047857" opacity="0.8" />
      <circle cx="635" cy="250" r="7" stroke="#047857" strokeWidth="0.75" fill="none" opacity="0.5" />
    </svg>
  );
};
