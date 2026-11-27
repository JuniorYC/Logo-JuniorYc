import React, { useState } from 'react';
import { Check, Circle, Copy, Download, Grid, Square } from 'lucide-react';
import {
  AnatomyFocus,
  HorizontalLockup,
  MonogramMark,
  SquareMonogramIcon,
  VerticalLockup,
} from './components/BrandLogo';
import {
  buildStandaloneSvg,
  downloadPng,
  downloadSvg,
  getExportFilename,
  LogoVariant,
} from './utils/logoExport';

type IconSizePreset = '256' | '128' | '64' | '32';

const ICON_SIZE_PX: Record<IconSizePreset, number> = {
  '256': 256,
  '128': 128,
  '64': 64,
  '32': 32,
};

const ANATOMY_DETAILS: Record<
  AnatomyFocus,
  { title: string; metric: string; description: string }
> = {
  all: {
    title: 'Intertwined Square Monogram Architecture',
    metric: '128 × 128 u · 9.0 u block strokes',
    description:
      'Centered JYC letterforms inside a borderless #0F172A square with 5-unit inter-letter separation and a 61.2-unit circular avatar safe radius.',
  },
  J: {
    title: 'Initial J — Chamfered Structural Anchor',
    metric: '28 u width · 10 u internal cavity',
    description:
      'Architectural vertical column with a 45° top-left chamfer and wide 10-unit hook cavity engineered to remain crisp down to 24px.',
  },
  Y: {
    title: 'Initial Y — Symmetric Convergence Axis',
    metric: '30 u width · 64 u centerline',
    description:
      'Balanced upper V-vectors converge onto the central nexus node and anchor into a 9-unit structural lower column.',
  },
  C: {
    title: 'Initial C — Precision Beveled Aperture',
    metric: '28 u width · 45° terminal cuts',
    description:
      'Outer 45° chamfers and angled inner terminal cuts frame the open right chamber where the Cobalt Blue trace terminates.',
  },
  circuit: {
    title: 'Cobalt Blue Engineering Line Cut',
    metric: '3.2 u trace · 8.0 u signal channel',
    description:
      'Sharp #2563EB precision trace stepping at 45° angles across the central 8-unit horizontal channel with three geometric nodes.',
  },
};

const COLOR_SWATCHES = [
  {
    name: 'Deep Navy',
    role: 'Square icon background & primary lockup type',
    hex: '#0F172A',
    rgb: '15, 23, 42',
    contrast: '17.7 : 1 AAA',
    bgClass: 'bg-[#0F172A]',
    borderClass: 'border-[#0F172A]',
  },
  {
    name: 'Pure White',
    role: 'Monogram block strokes & corporate canvas',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    contrast: '17.7 : 1 on Navy',
    bgClass: 'bg-[#FFFFFF]',
    borderClass: 'border-slate-200',
  },
  {
    name: 'Cobalt Blue',
    role: 'Precision engineering line cut & nodes',
    hex: '#2563EB',
    rgb: '37, 99, 235',
    contrast: 'Accent geometry',
    bgClass: 'bg-[#2563EB]',
    borderClass: 'border-[#2563EB]',
  },
];

export default function App() {
  const [iconSize, setIconSize] = useState<IconSizePreset>('256');
  const [circularMask, setCircularMask] = useState(false);
  const [showHeroGrid, setShowHeroGrid] = useState(false);
  const [focusPart, setFocusPart] = useState<AnatomyFocus>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [codeVariant, setCodeVariant] = useState<LogoVariant | null>(null);
  const [exportingPng, setExportingPng] = useState<LogoVariant | null>(null);

  const handleCopyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1800);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  const handleDownloadPng = async (variant: LogoVariant) => {
    setExportingPng(variant);
    try {
      await downloadPng(variant);
    } finally {
      setExportingPng(null);
    }
  };

  const activeAnatomy = ANATOMY_DETAILS[focusPart];
  const currentPx = ICON_SIZE_PX[iconSize];

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      {/* Top Navigation Bar — 3-Zone Swiss Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#monogram-icon"
            className="text-base font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
          >
            JYC Identity
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#monogram-icon"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Square Icon
            </a>
            <a
              href="#scale-test"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Avatar Scale
            </a>
            <a
              href="#geometry"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Geometry
            </a>
            <a
              href="#exports"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Brand Exports
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => downloadSvg('square-icon')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download Icon SVG</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero: Borderless Square Monogram Icon Showcase (No text below, no shadows, no borders) */}
        <section id="monogram-icon" className="border-b border-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Square Monogram Icon · Flat 2D Vector System
                </p>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] text-balance">
                  JYC Architectural Monogram Mark
                </h1>
              </div>
              <p className="text-sm text-slate-600 max-w-md">
                Borderless Deep Navy square icon engineered in crisp White and Cobalt Blue for
                executive avatars and digital brand marks.
              </p>
            </div>

            {/* Pure Presentation Stage — zero border on the icon, zero text below the icon */}
            <div className="bg-slate-50 border border-slate-200 px-6 py-16 md:py-20 flex items-center justify-center min-h-[320px] md:min-h-[384px]">
              <div
                style={{ width: currentPx, height: currentPx }}
                className="transition-all duration-200 ease-out shrink-0"
              >
                <SquareMonogramIcon
                  showGrid={showHeroGrid}
                  circularMask={circularMask}
                />
              </div>
            </div>

            {/* Studio Control Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="group"
                  aria-label="Icon pixel size"
                  className="inline-flex items-center border border-slate-200 bg-slate-50 p-0.5"
                >
                  {(['256', '128', '64', '32'] as IconSizePreset[]).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setIconSize(preset)}
                      className={`px-3 py-1.5 text-xs font-medium font-mono tabular-nums transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        iconSize === preset
                          ? 'bg-white text-[#0F172A] border border-slate-200'
                          : 'text-slate-600 hover:text-[#0F172A] border border-transparent'
                      }`}
                    >
                      {preset}px
                    </button>
                  ))}
                </div>

                <div
                  role="group"
                  aria-label="Avatar crop mask"
                  className="inline-flex items-center border border-slate-200 bg-slate-50 p-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setCircularMask(false)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      !circularMask
                        ? 'bg-white text-[#0F172A] border border-slate-200'
                        : 'text-slate-600 hover:text-[#0F172A] border border-transparent'
                    }`}
                  >
                    <Square className="w-3 h-3" aria-hidden="true" />
                    <span>Square 1:1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCircularMask(true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      circularMask
                        ? 'bg-white text-[#0F172A] border border-slate-200'
                        : 'text-slate-600 hover:text-[#0F172A] border border-transparent'
                    }`}
                  >
                    <Circle className="w-3 h-3" aria-hidden="true" />
                    <span>Circle Avatar</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHeroGrid((prev) => !prev)}
                  aria-pressed={showHeroGrid}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    showHeroGrid
                      ? 'border-[#2563EB] text-[#2563EB] bg-blue-50/40'
                      : 'border-slate-200 text-slate-600 hover:text-[#0F172A] bg-white'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{showHeroGrid ? 'Grid: On' : 'Grid: Off'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadSvg('square-icon')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Export SVG</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPng('square-icon')}
                  disabled={exportingPng === 'square-icon'}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{exportingPng === 'square-icon' ? 'Rendering...' : 'Export PNG'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText('hero-square-svg', buildStandaloneSvg('square-icon'))
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-slate-200 text-slate-700 hover:text-[#0F172A] hover:border-[#0F172A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedKey === 'hero-square-svg' ? (
                    <Check className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  <span>{copiedKey === 'hero-square-svg' ? 'SVG Copied' : 'Copy SVG'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Micro-Scale Legibility Verification Strip */}
        <section id="scale-test" className="border-b border-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1.5">
                  Micro-Scale Legibility
                </p>
                <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">
                  Social Media Avatar &amp; Favicon Stress Test
                </h2>
              </div>
              <p className="text-xs font-mono tabular-nums text-slate-500">
                Actual pixel rendering · Zero borders · 1:1 &amp; circular crops
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              {[
                { px: 96, circle: false, label: '96 × 96 px', context: 'App Tile' },
                { px: 64, circle: true, label: '64 × 64 px', context: 'LinkedIn Avatar' },
                { px: 48, circle: true, label: '48 × 48 px', context: 'Profile Badge' },
                { px: 32, circle: false, label: '32 × 32 px', context: 'Desktop Favicon' },
                { px: 24, circle: true, label: '24 × 24 px', context: 'Comment Thread' },
              ].map((sample) => (
                <div
                  key={`${sample.px}-${sample.circle}`}
                  className="border border-slate-200 bg-white p-6 flex flex-col items-center justify-between gap-5"
                >
                  <div className="h-24 flex items-center justify-center">
                    <div style={{ width: sample.px, height: sample.px }}>
                      <SquareMonogramIcon circularMask={sample.circle} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-mono tabular-nums font-medium text-[#0F172A]">
                      {sample.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{sample.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 01: Monogram Construction & Geometric Anatomy */}
        <section id="geometry" className="border-b border-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 py-16">
            <div className="mb-10">
              <p className="text-xs font-medium text-slate-500 mb-2">
                01 · Architectural Construction
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] text-balance">
                Monogram Geometry &amp; Engineering Cuts
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between border border-slate-200 bg-white p-8">
                <div className="flex-1 flex items-center justify-center py-6">
                  <div className="w-64 h-64">
                    <SquareMonogramIcon showGrid={true} focusPart={focusPart} />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(
                      [
                        { id: 'all', label: 'All Elements' },
                        { id: 'J', label: 'Letter J' },
                        { id: 'Y', label: 'Letter Y' },
                        { id: 'C', label: 'Letter C' },
                        { id: 'circuit', label: 'Engineering Cut' },
                      ] as { id: AnatomyFocus; label: string }[]
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFocusPart(item.id)}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          focusPart === item.id
                            ? 'bg-[#0F172A] text-white'
                            : 'bg-slate-100 text-slate-700 hover:text-[#0F172A] hover:bg-slate-200/70'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className="pb-6 border-b border-slate-200">
                  <p className="text-xs font-mono tabular-nums text-[#2563EB] mb-1.5">
                    {activeAnatomy.metric}
                  </p>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                    {activeAnatomy.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeAnatomy.description}
                  </p>
                </div>

                <div className="divide-y divide-slate-200">
                  <div className="py-5 flex items-baseline justify-between gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A]">
                        01. Open Counter Optical Ratio
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        A 10-unit internal cavity inside J and 5-unit inter-letter gutters prevent
                        stroke bleed at 24px–32px social avatar dimensions.
                      </p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
                      10.0 u
                    </span>
                  </div>

                  <div className="py-5 flex items-baseline justify-between gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A]">
                        02. Inscribed Circle Safe Envelope
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        All four monogram corners sit at a 61.2-unit radial distance from center,
                        preserving 100% visibility inside circular social crops.
                      </p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
                      61.2 u
                    </span>
                  </div>

                  <div className="py-5 flex items-baseline justify-between gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A]">
                        03. Precision Engineering Channel
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        An 8-unit horizontal cut cleanly separates upper and lower block planes for
                        the Cobalt Blue signal line.
                      </p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
                      8.0 u
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Color Palette & Complete Brand Asset Exports */}
        <section id="exports">
          <div className="max-w-[1200px] mx-auto px-6 py-16">
            <div className="mb-10">
              <p className="text-xs font-medium text-slate-500 mb-2">
                02 · Visual Standards &amp; Assets
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] text-balance">
                Restricted Color System &amp; Production Exports
              </h2>
            </div>

            {/* 3 Institutional Color Swatches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {COLOR_SWATCHES.map((swatch) => {
                const isCopied = copiedKey === `swatch-${swatch.hex}`;
                return (
                  <div
                    key={swatch.hex}
                    className="border border-slate-200 bg-white flex flex-col justify-between"
                  >
                    <div
                      className={`h-24 w-full ${swatch.bgClass} border-b ${swatch.borderClass}`}
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-base font-bold text-[#0F172A]">{swatch.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{swatch.role}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyText(`swatch-${swatch.hex}`, swatch.hex)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors shrink-0 cursor-pointer"
                        >
                          {isCopied ? (
                            <Check className="w-3 h-3 text-[#2563EB]" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3 h-3" aria-hidden="true" />
                          )}
                          <span>{isCopied ? 'Copied' : swatch.hex}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-500 block">RGB</span>
                          <span className="font-mono tabular-nums text-[#0F172A] mt-0.5 block">
                            {swatch.rgb}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Contrast</span>
                          <span className="font-mono tabular-nums text-[#0F172A] mt-0.5 block">
                            {swatch.contrast}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4 Exportable Brand Plates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plate 1: Square Monogram Icon (Dark Navy) */}
              <div className="border border-slate-200 bg-white flex flex-col justify-between">
                <div className="p-8 h-56 flex items-center justify-center border-b border-slate-200 bg-slate-50">
                  <div className="w-36 h-36">
                    <SquareMonogramIcon />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Square Monogram Icon (Dark Canvas)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-5">
                    128 × 128 viewBox · Social avatars, favicons, mobile app icons
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => downloadSvg('square-icon')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#0F172A] text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                    >
                      SVG
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadPng('square-icon')}
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors cursor-pointer"
                    >
                      PNG (1024px)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCodeVariant((curr) => (curr === 'square-icon' ? null : 'square-icon'))
                      }
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-slate-600 hover:text-[#0F172A] transition-colors cursor-pointer"
                    >
                      {codeVariant === 'square-icon' ? 'Hide Code' : 'SVG Code'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Plate 2: Primary Horizontal Corporate Lockup */}
              <div className="border border-slate-200 bg-white flex flex-col justify-between">
                <div className="p-8 h-56 flex items-center justify-center border-b border-slate-200 bg-white">
                  <div className="w-full max-w-[400px]">
                    <HorizontalLockup />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Primary Horizontal Corporate Lockup
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-5">
                    728 × 116 viewBox · Letterheads, web headers, corporate proposals
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => downloadSvg('horizontal')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#0F172A] text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                    >
                      SVG
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadPng('horizontal')}
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors cursor-pointer"
                    >
                      PNG
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCodeVariant((curr) => (curr === 'horizontal' ? null : 'horizontal'))
                      }
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-slate-600 hover:text-[#0F172A] transition-colors cursor-pointer"
                    >
                      {codeVariant === 'horizontal' ? 'Hide Code' : 'SVG Code'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Plate 3: Centered Vertical Lockup */}
              <div className="border border-slate-200 bg-white flex flex-col justify-between">
                <div className="p-8 h-56 flex items-center justify-center border-b border-slate-200 bg-white">
                  <div className="w-full max-w-[320px]">
                    <VerticalLockup />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold text-[#0F172A]">Centered Vertical Lockup</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-5">
                    680 × 224 viewBox · Executive presentations, document covers
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => downloadSvg('vertical')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#0F172A] text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                    >
                      SVG
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadPng('vertical')}
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors cursor-pointer"
                    >
                      PNG
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCodeVariant((curr) => (curr === 'vertical' ? null : 'vertical'))
                      }
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-slate-600 hover:text-[#0F172A] transition-colors cursor-pointer"
                    >
                      {codeVariant === 'vertical' ? 'Hide Code' : 'SVG Code'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Plate 4: Light Monogram Mark */}
              <div className="border border-slate-200 bg-white flex flex-col justify-between">
                <div className="p-8 h-56 flex items-center justify-center border-b border-slate-200 bg-white">
                  <div className="w-40">
                    <MonogramMark includeBackground={true} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Standalone Monogram (White Canvas)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-5">
                    136 × 100 viewBox · Print seals, stationery stamps, light headers
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => downloadSvg('monogram')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#0F172A] text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                    >
                      SVG
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadPng('monogram')}
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-[#0F172A] hover:border-[#0F172A] transition-colors cursor-pointer"
                    >
                      PNG
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCodeVariant((curr) => (curr === 'monogram' ? null : 'monogram'))
                      }
                      className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-slate-600 hover:text-[#0F172A] transition-colors cursor-pointer"
                    >
                      {codeVariant === 'monogram' ? 'Hide Code' : 'SVG Code'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Raw SVG Code Inspector */}
            {codeVariant && (
              <div className="mt-6 border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-medium text-[#0F172A]">
                    {getExportFilename(codeVariant, 'svg')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(`source-${codeVariant}`, buildStandaloneSvg(codeVariant))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-[#0F172A] hover:border-[#0F172A] cursor-pointer"
                    >
                      {copiedKey === `source-${codeVariant}` ? (
                        <Check className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                      <span>
                        {copiedKey === `source-${codeVariant}` ? 'Copied' : 'Copy Code'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCodeVariant(null)}
                      className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 hover:text-[#0F172A] cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
                <pre className="text-xs font-mono text-slate-700 bg-white border border-slate-200 p-4 overflow-x-auto leading-relaxed">
                  {buildStandaloneSvg(codeVariant)}
                </pre>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Ing. Junior Yupanqui Contreras · Consultoría Empresarial &amp; Tecnología
          </p>
          <div className="flex items-center gap-6">
            <a href="#monogram-icon" className="hover:text-[#0F172A] transition-colors">
              Square Icon
            </a>
            <a href="#geometry" className="hover:text-[#0F172A] transition-colors">
              Geometry
            </a>
            <a href="#exports" className="hover:text-[#0F172A] transition-colors">
              Brand Exports
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
