import 'styled-components';
import { ThemeInterface } from './src/theme/ThemeInterface';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}
