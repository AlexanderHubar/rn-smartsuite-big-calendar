import { ColorType } from 'rn-smartsuite-big-calendar';

export function adjustHspTextColor(color: any) {
  color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

  const r = color >> 16;
  const g = (color >> 8) & 255;
  const b = color & 255;

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return 'light';
  } else {
    return 'dark';
  }
}

export const adjustHsvTextColor = (hex: string) => {
  const rgb = hexToRgb(hex);

  const hsv = rgb2hsv(rgb?.r, rgb?.g, rgb?.b);
  if (hsv.s > 0.5) {
    return 'dark';
  } else {
    return 'light';
  }
};

export const rgb2hsv = (r?: number, g?: number, b?: number) => {
  let computedH = 0;
  let computedS = 0;
  let computedV = 0;

  //remove spaces from input RGB values, convert to int
  let _r = parseInt(('' + r).replace(/\s/g, ''), 10);
  let _g = parseInt(('' + g).replace(/\s/g, ''), 10);
  let _b = parseInt(('' + b).replace(/\s/g, ''), 10);

  if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {
    return { h: 0, s: 0, v: 0 };
  }
  if (_r < 0 || _g < 0 || _b < 0 || _r > 255 || _g > 255 || _b > 255) {
    return { h: 0, s: 0, v: 0 };
  }
  _r = _r / 255;
  _g = _g / 255;
  _b = _b / 255;
  let minRGB = Math.min(_r, Math.min(_g, _b));
  let maxRGB = Math.max(_r, Math.max(_g, _b));

  // Black-gray-white
  if (minRGB === maxRGB) {
    computedV = minRGB;
    return { h: 0, s: 0, v: computedV };
  }

  // Colors other than black-gray-white:
  let d = _r === minRGB ? _g - _b : _b === minRGB ? _r - _g : _b - _r;
  let h = _r === minRGB ? 3 : _b === minRGB ? 1 : 5;
  computedH = 60 * (h - d / (maxRGB - minRGB));
  computedS = (maxRGB - minRGB) / maxRGB;
  computedV = maxRGB;
  return { h: computedH, s: computedS, v: computedV };
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const fontColor = (background: string, type: ColorType) => {
  const colorBrightness =
    type === ColorType.hsv
      ? adjustHsvTextColor(background)
      : adjustHspTextColor(background);

  return colorBrightness === 'light' ? '#2E3538' : '#FFFFFF';
};
