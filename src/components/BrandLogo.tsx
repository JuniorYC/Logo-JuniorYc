import React from 'react';

export type AnatomyFocus = 'all' | 'J' | 'Y' | 'C' | 'circuit';

interface SquareMonogramIconProps {
  className?: string;
  showGrid?: boolean;
  focusPart?: AnatomyFocus;
  circularMask?: boolean;
}

/**
 * Minimalist geometric "JYC" monogram icon inside a 1:1 square (128x128).
 * Crisp White (#FFFFFF) architectural block strokes + Cobalt Blue (#2563EB)
 * engineering accent geometry on solid Deep Navy (#0F172A) background.
 * No borders, no shadows, no gradients, no text.
 */
export const SquareMonogramIcon: React.FC<SquareMonogramIconProps> = ({
  className = 'w-full h-full block',
  showGrid = false,
  focusPart = 'all',
  circularMask = false,
}) => {
  const dimOpacity = (part: AnatomyFocus) =>
    focusPart === 'all' || focusPart === part ? 1 : 0.16;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      role="img"
      aria-label="JYC geometric monogram icon"
      className={className}
      shapeRendering="geometricPrecision"
    >
      {circularMask && (
        <defs>
          <clipPath id="jyc-circle-clip">
            <circle cx="64" cy="64" r="64" />
          </clipPath>
        </defs>
      )}

      <g clipPath={circularMask ? 'url(#jyc-circle-clip)' : undefined}>
        {/* Solid Deep Navy #0F172A square canvas */}
        <rect width="128" height="128" fill="#0F172A" />

        {showGrid && (
          <g aria-hidden="true">
            {/* Safe area & inscribed circular avatar boundary */}
            <rect
              x="16"
              y="26"
              width="96"
              height="76"
              fill="none"
              stroke="#334155"
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
            <circle
              cx="64"
              cy="64"
              r="61.2"
              fill="none"
              stroke="#1E3A8A"
              strokeWidth="0.6"
              strokeDasharray="3 2"
            />
            {[16, 25, 35, 44, 49, 59.5, 64, 68.5, 79, 84, 93, 112].map((x) => (
              <line
                key={`sqx-${x}`}
                x1={x}
                y1="8"
                x2={x}
                y2="120"
                stroke={x === 64 ? '#1D4ED8' : '#1E293B'}
                strokeWidth="0.5"
              />
            ))}
            {[26, 35, 60, 64, 68, 75, 93, 102].map((y) => (
              <line
                key={`sqy-${y}`}
                x1="8"
                y1={y}
                x2="120"
                y2={y}
                stroke={y === 64 ? '#1D4ED8' : '#1E293B'}
                strokeWidth="0.5"
              />
            ))}
          </g>
        )}

        {/* Letter J — Crisp White #FFFFFF */}
        <g
          fill="#FFFFFF"
          style={{
            opacity: dimOpacity('J'),
            transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Upper vertical column with 45° top-left architectural chamfer */}
          <path d="M39 26H44V60H35V30L39 26Z" />
          {/* Lower J return with 10u inner cavity & 45° outer bottom-left bevel */}
          <path d="M35 68H44V102H22L16 96V75H25V93H35V68Z" />
        </g>

        {/* Letter Y — Crisp White #FFFFFF */}
        <g
          fill="#FFFFFF"
          style={{
            opacity: dimOpacity('Y'),
            transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Symmetric architectural V-fork */}
          <path d="M49 26H58.5L64 43L69.5 26H79L68.5 60H59.5L49 26Z" />
          {/* Lower central structural column */}
          <path d="M59.5 68H68.5V102H59.5V68Z" />
        </g>

        {/* Letter C — Crisp White #FFFFFF */}
        <g
          fill="#FFFFFF"
          style={{
            opacity: dimOpacity('C'),
            transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Upper spine & arm with 45° outer chamfer + angled terminal cut */}
          <path d="M90 26H112V31L108 35H93V60H84V32L90 26Z" />
          {/* Lower spine & arm with 45° outer chamfer + angled terminal cut */}
          <path d="M84 68H93V93H108L112 97V102H90L84 96V68Z" />
        </g>

        {/* Technological Engineering Line Cut & Accent Geometry — Cobalt Blue #2563EB */}
        <g
          style={{
            opacity: dimOpacity('circuit'),
            transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <path
            d="M20.5 68L24.5 64H101.5L105.5 60"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3.2"
            strokeLinecap="butt"
            strokeLinejoin="miter"
          />
          {/* Origin engineering node above J hook */}
          <circle cx="20.5" cy="68" r="3.4" fill="#2563EB" />
          {/* Central nexus node inside Y junction */}
          <circle cx="64" cy="64" r="4.2" fill="#2563EB" />
          <circle cx="64" cy="64" r="1.5" fill="#0F172A" />
          {/* Terminal node inside C aperture */}
          <circle cx="105.5" cy="60" r="3.4" fill="#2563EB" />
        </g>
      </g>
    </svg>
  );
};

interface MonogramMarkProps {
  className?: string;
  showGrid?: boolean;
  focusPart?: AnatomyFocus;
  includeBackground?: boolean;
}

export const MonogramMark: React.FC<MonogramMarkProps> = ({
  className = 'w-full h-auto',
  showGrid = false,
  focusPart = 'all',
  includeBackground = false,
}) => {
  const dimOpacity = (part: AnatomyFocus) =>
    focusPart === 'all' || focusPart === part ? 1 : 0.16;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 136 100"
      role="img"
      aria-label="Monograma geométrico JYC"
      className={className}
      shapeRendering="geometricPrecision"
    >
      {includeBackground && <rect width="136" height="100" fill="#FFFFFF" />}

      {showGrid && (
        <g aria-hidden="true">
          <rect
            x="8"
            y="8"
            width="120"
            height="84"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          {[8, 18, 30, 40, 47, 63, 68, 73, 89, 96, 106, 128].map((x) => (
            <line
              key={`gx-${x}`}
              x1={x}
              y1="2"
              x2={x}
              y2="98"
              stroke={x === 68 ? '#93C5FD' : '#E2E8F0'}
              strokeWidth="0.5"
            />
          ))}
          {[8, 18, 45.5, 50, 54.5, 66, 82, 92].map((y) => (
            <line
              key={`gy-${y}`}
              x1="2"
              y1={y}
              x2="134"
              y2={y}
              stroke={y === 50 ? '#93C5FD' : '#E2E8F0'}
              strokeWidth="0.5"
            />
          ))}
        </g>
      )}

      <g
        fill="#0F172A"
        style={{
          opacity: dimOpacity('J'),
          transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path d="M30 8H40V45.5H30V8Z" />
        <path d="M30 54.5H40V92H14L8 86V66H18V82H30V54.5Z" />
      </g>

      <g
        fill="#0F172A"
        style={{
          opacity: dimOpacity('Y'),
          transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path d="M47 8H58L68 31.5L78 8H89L73 45.5H63L47 8Z" />
        <path d="M63 54.5H73V92H63V54.5Z" />
      </g>

      <g
        fill="#0F172A"
        style={{
          opacity: dimOpacity('C'),
          transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path d="M102 8H128V18H106V45.5H96V14L102 8Z" />
        <path d="M96 54.5H106V82H128V92H102L96 86V54.5Z" />
      </g>

      <g
        style={{
          opacity: dimOpacity('circuit'),
          transition: 'opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path
          d="M13 56L19 50H115L121 44"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.4"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <circle cx="13" cy="56" r="3" fill="#2563EB" />
        <circle cx="68" cy="50" r="3.6" fill="#2563EB" />
        <circle cx="68" cy="50" r="1.3" fill="#FFFFFF" />
        <circle cx="121" cy="44" r="3" fill="#2563EB" />
      </g>
    </svg>
  );
};

interface LockupProps {
  className?: string;
  showGrid?: boolean;
}

export const HorizontalLockup: React.FC<LockupProps> = ({
  className = 'w-full h-auto',
  showGrid = false,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 728 116"
      role="img"
      aria-label="Logo corporativo JYC — Ing. Junior Yupanqui Contreras, Consultoría Empresarial & Tecnología"
      className={className}
      shapeRendering="geometricPrecision"
    >
      <rect width="728" height="116" fill="#FFFFFF" />

      {showGrid && (
        <g aria-hidden="true">
          <rect
            x="16"
            y="16"
            width="696"
            height="84"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="0.75"
            strokeDasharray="3 3"
          />
          <rect
            x="16"
            y="16"
            width="120"
            height="84"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="0.75"
          />
          <line x1="172" y1="8" x2="172" y2="108" stroke="#93C5FD" strokeWidth="0.75" />
          <line
            x1="8"
            y1="58"
            x2="720"
            y2="58"
            stroke="#BFDBFE"
            strokeWidth="0.75"
            strokeDasharray="4 3"
          />
          <line x1="168" y1="52" x2="712" y2="52" stroke="#E2E8F0" strokeWidth="0.75" />
          <line x1="168" y1="79" x2="712" y2="79" stroke="#E2E8F0" strokeWidth="0.75" />
        </g>
      )}

      <g transform="translate(8, 8)">
        <g fill="#0F172A">
          <path d="M30 8H40V45.5H30V8Z" />
          <path d="M30 54.5H40V92H14L8 86V66H18V82H30V54.5Z" />
          <path d="M47 8H58L68 31.5L78 8H89L73 45.5H63L47 8Z" />
          <path d="M63 54.5H73V92H63V54.5Z" />
          <path d="M102 8H128V18H106V45.5H96V14L102 8Z" />
          <path d="M96 54.5H106V82H128V92H102L96 86V54.5Z" />
        </g>
        <path
          d="M13 56L19 50H115L121 44"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.4"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <circle cx="13" cy="56" r="3" fill="#2563EB" />
        <circle cx="68" cy="50" r="3.6" fill="#2563EB" />
        <circle cx="68" cy="50" r="1.3" fill="#FFFFFF" />
        <circle cx="121" cy="44" r="3" fill="#2563EB" />
      </g>

      <text
        x="172"
        y="52"
        fill="#0F172A"
        fontFamily="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif"
        fontSize="21.5"
        fontWeight="700"
        letterSpacing="3.0"
      >
        ING. JUNIOR YUPANQUI CONTRERAS
      </text>
      <text
        x="172"
        y="79"
        fill="#0F172A"
        fontFamily="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif"
        fontSize="12.2"
        fontWeight="500"
        letterSpacing="2.8"
      >
        CONSULTORÍA EMPRESARIAL &amp; TECNOLOGÍA
      </text>
    </svg>
  );
};

export const VerticalLockup: React.FC<LockupProps> = ({
  className = 'w-full h-auto',
  showGrid = false,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 680 224"
      role="img"
      aria-label="Logo vertical JYC — Ing. Junior Yupanqui Contreras"
      className={className}
      shapeRendering="geometricPrecision"
    >
      <rect width="680" height="224" fill="#FFFFFF" />

      {showGrid && (
        <g aria-hidden="true">
          <line x1="340" y1="8" x2="340" y2="216" stroke="#93C5FD" strokeWidth="0.75" />
          <rect
            x="24"
            y="24"
            width="632"
            height="176"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="0.75"
            strokeDasharray="3 3"
          />
        </g>
      )}

      <g transform="translate(261.8, 18) scale(1.15)">
        <g fill="#0F172A">
          <path d="M30 8H40V45.5H30V8Z" />
          <path d="M30 54.5H40V92H14L8 86V66H18V82H30V54.5Z" />
          <path d="M47 8H58L68 31.5L78 8H89L73 45.5H63L47 8Z" />
          <path d="M63 54.5H73V92H63V54.5Z" />
          <path d="M102 8H128V18H106V45.5H96V14L102 8Z" />
          <path d="M96 54.5H106V82H128V92H102L96 86V54.5Z" />
        </g>
        <path
          d="M13 56L19 50H115L121 44"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.4"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <circle cx="13" cy="56" r="3" fill="#2563EB" />
        <circle cx="68" cy="50" r="3.6" fill="#2563EB" />
        <circle cx="68" cy="50" r="1.3" fill="#FFFFFF" />
        <circle cx="121" cy="44" r="3" fill="#2563EB" />
      </g>

      <text
        x="340"
        y="165"
        textAnchor="middle"
        fill="#0F172A"
        fontFamily="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif"
        fontSize="21.5"
        fontWeight="700"
        letterSpacing="3.2"
      >
        ING. JUNIOR YUPANQUI CONTRERAS
      </text>
      <text
        x="340"
        y="192"
        textAnchor="middle"
        fill="#0F172A"
        fontFamily="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif"
        fontSize="12.2"
        fontWeight="500"
        letterSpacing="2.8"
      >
        CONSULTORÍA EMPRESARIAL &amp; TECNOLOGÍA
      </text>
    </svg>
  );
};
