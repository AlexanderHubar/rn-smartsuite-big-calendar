import { colord } from 'colord';

export const fontColor = (background: string) => {
  const colorBrightness = textShouldBeDarker(background);

  return colorBrightness ? '#2E3538' : '#FFFFFF';
};

export const textShouldBeDarker = (backgroundColor: string) =>
  colord(backgroundColor).brightness() >= 0.8;
