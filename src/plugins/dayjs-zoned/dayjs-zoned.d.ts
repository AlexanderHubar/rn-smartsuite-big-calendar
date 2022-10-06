// SOURCE: https://gist.github.com/ianldgs/87ed392c6eef53ebf7df234b67f587f2

import { Dayjs, PluginFunc, ConfigType } from 'dayjs';

declare const plugin: PluginFunc;
export default plugin;

declare module 'dayjs' {
  /** Similar to date-fns/utcToZonedTime */
  function utcToZoned(config: ConfigType, timezone?: string): Dayjs;

  /** Similar to date-fns/zonedTimeToUtc */
  function zonedToUtc(config: ConfigType, timezone?: string): Dayjs;

  /**
   * Will change timezones, but keep the same day/month/year hours:minutes,
   * by adding or subtracting the difference between the `config` on `oldTimezone` and `newTimezone`
   */
  function changeZoneKeepTime(
    config: ConfigType,
    oldTimezone: string,
    newTimezone: string
  ): Dayjs;
}
