// Utility Cloudinary — ottimizza automaticamente tutte le immagini
const CLOUD = 'dmybopb31';

export function imgUrl(url: string, opts?: {
  w?: number; h?: number; fit?: 'fill'|'cover'|'contain'|'scale'; q?: number;
}): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  const { w = 800, h, fit = 'fill', q = 85 } = opts || {};
  const transforms = [
    `w_${w}`,
    h ? `h_${h}` : '',
    `c_${fit}`,
    `q_${q}`,
    'f_webp',
    'dpr_auto',
  ].filter(Boolean).join(',');

  return url.replace('/upload/', `/upload/${transforms}/`);
}

export function thumbUrl(url: string): string {
  return imgUrl(url, { w: 400, h: 300, fit: 'fill', q: 80 });
}

export function heroUrl(url: string): string {
  return imgUrl(url, { w: 1920, h: 1080, fit: 'fill', q: 85 });
}

export function squareUrl(url: string): string {
  return imgUrl(url, { w: 300, h: 300, fit: 'fill', q: 80 });
}
