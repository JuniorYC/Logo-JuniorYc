export type LogoVariant = 'square-icon' | 'horizontal' | 'vertical' | 'monogram';

const MONOGRAM_ELEMENTS = `
  <g fill="#0F172A">
    <path d="M30 8H40V45.5H30V8Z"/>
    <path d="M30 54.5H40V92H14L8 86V66H18V82H30V54.5Z"/>
    <path d="M47 8H58L68 31.5L78 8H89L73 45.5H63L47 8Z"/>
    <path d="M63 54.5H73V92H63V54.5Z"/>
    <path d="M102 8H128V18H106V45.5H96V14L102 8Z"/>
    <path d="M96 54.5H106V82H128V92H102L96 86V54.5Z"/>
  </g>
  <path d="M13 56L19 50H115L121 44" fill="none" stroke="#2563EB" stroke-width="2.4" stroke-linecap="butt" stroke-linejoin="miter"/>
  <circle cx="13" cy="56" r="3" fill="#2563EB"/>
  <circle cx="68" cy="50" r="3.6" fill="#2563EB"/>
  <circle cx="68" cy="50" r="1.3" fill="#FFFFFF"/>
  <circle cx="121" cy="44" r="3" fill="#2563EB"/>
`;

export function buildStandaloneSvg(variant: LogoVariant): string {
  if (variant === 'square-icon') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="1024" height="1024" shape-rendering="geometricPrecision">
  <rect width="128" height="128" fill="#0F172A"/>
  <g fill="#FFFFFF">
    <path d="M39 26H44V60H35V30L39 26Z"/>
    <path d="M35 68H44V102H22L16 96V75H25V93H35V68Z"/>
    <path d="M49 26H58.5L64 43L69.5 26H79L68.5 60H59.5L49 26Z"/>
    <path d="M59.5 68H68.5V102H59.5V68Z"/>
    <path d="M90 26H112V31L108 35H93V60H84V32L90 26Z"/>
    <path d="M84 68H93V93H108L112 97V102H90L84 96V68Z"/>
  </g>
  <path d="M20.5 68L24.5 64H101.5L105.5 60" fill="none" stroke="#2563EB" stroke-width="3.2" stroke-linecap="butt" stroke-linejoin="miter"/>
  <circle cx="20.5" cy="68" r="3.4" fill="#2563EB"/>
  <circle cx="64" cy="64" r="4.2" fill="#2563EB"/>
  <circle cx="64" cy="64" r="1.5" fill="#0F172A"/>
  <circle cx="105.5" cy="60" r="3.4" fill="#2563EB"/>
</svg>`;
  }

  if (variant === 'monogram') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" width="1360" height="1000" shape-rendering="geometricPrecision">
  <rect width="136" height="100" fill="#FFFFFF"/>${MONOGRAM_ELEMENTS}
</svg>`;
  }

  if (variant === 'vertical') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 224" width="2040" height="672" shape-rendering="geometricPrecision">
  <rect width="680" height="224" fill="#FFFFFF"/>
  <g transform="translate(261.8, 18) scale(1.15)">${MONOGRAM_ELEMENTS}
  </g>
  <text x="340" y="165" text-anchor="middle" fill="#0F172A" font-family="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif" font-size="21.5" font-weight="700" letter-spacing="3.2">ING. JUNIOR YUPANQUI CONTRERAS</text>
  <text x="340" y="192" text-anchor="middle" fill="#0F172A" font-family="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif" font-size="12.2" font-weight="500" letter-spacing="2.8">CONSULTORÍA EMPRESARIAL &amp; TECNOLOGÍA</text>
</svg>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 728 116" width="2184" height="348" shape-rendering="geometricPrecision">
  <rect width="728" height="116" fill="#FFFFFF"/>
  <g transform="translate(8, 8)">${MONOGRAM_ELEMENTS}
  </g>
  <text x="172" y="52" fill="#0F172A" font-family="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif" font-size="21.5" font-weight="700" letter-spacing="3.0">ING. JUNIOR YUPANQUI CONTRERAS</text>
  <text x="172" y="79" fill="#0F172A" font-family="'Plus Jakarta Sans', 'Outfit', 'Helvetica Neue', Arial, sans-serif" font-size="12.2" font-weight="500" letter-spacing="2.8">CONSULTORÍA EMPRESARIAL &amp; TECNOLOGÍA</text>
</svg>`;
}

export function getExportFilename(variant: LogoVariant, ext: 'svg' | 'png'): string {
  switch (variant) {
    case 'square-icon':
      return `jyc-icon-square.${ext}`;
    case 'monogram':
      return `jyc-monograma.${ext}`;
    case 'vertical':
      return `jyc-logo-vertical.${ext}`;
    case 'horizontal':
      return `jyc-logo-corporativo.${ext}`;
  }
}

export function downloadSvg(variant: LogoVariant): void {
  const svgContent = buildStandaloneSvg(variant);
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = getExportFilename(variant, 'svg');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function drawSquareIconOnCanvas(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 128, 128);

  ctx.fillStyle = '#FFFFFF';
  // J upper
  ctx.beginPath();
  ctx.moveTo(39, 26);
  ctx.lineTo(44, 26);
  ctx.lineTo(44, 60);
  ctx.lineTo(35, 60);
  ctx.lineTo(35, 30);
  ctx.closePath();
  ctx.fill();

  // J lower
  ctx.beginPath();
  ctx.moveTo(35, 68);
  ctx.lineTo(44, 68);
  ctx.lineTo(44, 102);
  ctx.lineTo(22, 102);
  ctx.lineTo(16, 96);
  ctx.lineTo(16, 75);
  ctx.lineTo(25, 75);
  ctx.lineTo(25, 93);
  ctx.lineTo(35, 93);
  ctx.closePath();
  ctx.fill();

  // Y upper
  ctx.beginPath();
  ctx.moveTo(49, 26);
  ctx.lineTo(58.5, 26);
  ctx.lineTo(64, 43);
  ctx.lineTo(69.5, 26);
  ctx.lineTo(79, 26);
  ctx.lineTo(68.5, 60);
  ctx.lineTo(59.5, 60);
  ctx.closePath();
  ctx.fill();

  // Y lower
  ctx.fillRect(59.5, 68, 9, 34);

  // C upper
  ctx.beginPath();
  ctx.moveTo(90, 26);
  ctx.lineTo(112, 26);
  ctx.lineTo(112, 31);
  ctx.lineTo(108, 35);
  ctx.lineTo(93, 35);
  ctx.lineTo(93, 60);
  ctx.lineTo(84, 60);
  ctx.lineTo(84, 32);
  ctx.closePath();
  ctx.fill();

  // C lower
  ctx.beginPath();
  ctx.moveTo(84, 68);
  ctx.lineTo(93, 68);
  ctx.lineTo(93, 93);
  ctx.lineTo(108, 93);
  ctx.lineTo(112, 97);
  ctx.lineTo(112, 102);
  ctx.lineTo(90, 102);
  ctx.lineTo(84, 96);
  ctx.closePath();
  ctx.fill();

  // Cobalt Blue #2563EB engineering line cut & accent nodes
  ctx.strokeStyle = '#2563EB';
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.beginPath();
  ctx.moveTo(20.5, 68);
  ctx.lineTo(24.5, 64);
  ctx.lineTo(101.5, 64);
  ctx.lineTo(105.5, 60);
  ctx.stroke();

  ctx.fillStyle = '#2563EB';
  ctx.beginPath();
  ctx.arc(20.5, 68, 3.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(64, 64, 4.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.arc(64, 64, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#2563EB';
  ctx.beginPath();
  ctx.arc(105.5, 60, 3.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawMonogramOnCanvas(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = '#0F172A';

  ctx.fillRect(30, 8, 10, 37.5);
  ctx.beginPath();
  ctx.moveTo(30, 54.5);
  ctx.lineTo(40, 54.5);
  ctx.lineTo(40, 92);
  ctx.lineTo(14, 92);
  ctx.lineTo(8, 86);
  ctx.lineTo(8, 66);
  ctx.lineTo(18, 66);
  ctx.lineTo(18, 82);
  ctx.lineTo(30, 82);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(47, 8);
  ctx.lineTo(58, 8);
  ctx.lineTo(68, 31.5);
  ctx.lineTo(78, 8);
  ctx.lineTo(89, 8);
  ctx.lineTo(73, 45.5);
  ctx.lineTo(63, 45.5);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(63, 54.5, 10, 37.5);

  ctx.beginPath();
  ctx.moveTo(102, 8);
  ctx.lineTo(128, 8);
  ctx.lineTo(128, 18);
  ctx.lineTo(106, 18);
  ctx.lineTo(106, 45.5);
  ctx.lineTo(96, 45.5);
  ctx.lineTo(96, 14);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(96, 54.5);
  ctx.lineTo(106, 54.5);
  ctx.lineTo(106, 82);
  ctx.lineTo(128, 82);
  ctx.lineTo(128, 92);
  ctx.lineTo(102, 92);
  ctx.lineTo(96, 86);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#2563EB';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.beginPath();
  ctx.moveTo(13, 56);
  ctx.lineTo(19, 50);
  ctx.lineTo(115, 50);
  ctx.lineTo(121, 44);
  ctx.stroke();

  ctx.fillStyle = '#2563EB';
  ctx.beginPath();
  ctx.arc(13, 56, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(68, 50, 3.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(68, 50, 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#2563EB';
  ctx.beginPath();
  ctx.arc(121, 44, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawTrackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  tracking: number,
  align: 'left' | 'center'
): void {
  const chars = Array.from(text);
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const totalWidth =
    widths.reduce((sum, w) => sum + w, 0) + tracking * Math.max(0, chars.length - 1);

  let cursorX = align === 'center' ? x - totalWidth / 2 : x;
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], cursorX, y);
    cursorX += widths[i] + tracking;
  }
}

export async function downloadPng(variant: LogoVariant): Promise<void> {
  if ('fonts' in document) {
    await document.fonts.ready;
  }

  const scale = variant === 'square-icon' ? 8 : variant === 'monogram' ? 12 : 3;
  const baseWidth =
    variant === 'square-icon'
      ? 128
      : variant === 'monogram'
        ? 136
        : variant === 'vertical'
          ? 680
          : 728;
  const baseHeight =
    variant === 'square-icon'
      ? 128
      : variant === 'monogram'
        ? 100
        : variant === 'vertical'
          ? 224
          : 116;

  const canvas = document.createElement('canvas');
  canvas.width = baseWidth * scale;
  canvas.height = baseHeight * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(scale, scale);

  if (variant === 'square-icon') {
    drawSquareIconOnCanvas(ctx);
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    if (variant === 'monogram') {
      drawMonogramOnCanvas(ctx);
    } else if (variant === 'vertical') {
      ctx.save();
      ctx.translate(261.8, 18);
      ctx.scale(1.15, 1.15);
      drawMonogramOnCanvas(ctx);
      ctx.restore();

      ctx.fillStyle = '#0F172A';
      ctx.textBaseline = 'alphabetic';
      ctx.font = "700 21.5px 'Plus Jakarta Sans', sans-serif";
      drawTrackedText(ctx, 'ING. JUNIOR YUPANQUI CONTRERAS', 340, 165, 3.2, 'center');

      ctx.font = "500 12.2px 'Plus Jakarta Sans', sans-serif";
      drawTrackedText(ctx, 'CONSULTORÍA EMPRESARIAL & TECNOLOGÍA', 340, 192, 2.8, 'center');
    } else {
      ctx.save();
      ctx.translate(8, 8);
      drawMonogramOnCanvas(ctx);
      ctx.restore();

      ctx.fillStyle = '#0F172A';
      ctx.textBaseline = 'alphabetic';
      ctx.font = "700 21.5px 'Plus Jakarta Sans', sans-serif";
      drawTrackedText(ctx, 'ING. JUNIOR YUPANQUI CONTRERAS', 172, 52, 3.0, 'left');

      ctx.font = "500 12.2px 'Plus Jakarta Sans', sans-serif";
      drawTrackedText(ctx, 'CONSULTORÍA EMPRESARIAL & TECNOLOGÍA', 172, 79, 2.8, 'left');
    }
  }

  const dataUrl = canvas.toDataURL('image/png');
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = getExportFilename(variant, 'png');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
