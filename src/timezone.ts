export default class TimeInfo {
  static instance: TimeInfo | null = null;

  private _timezone = 'UTC';

  static default(): TimeInfo {
    if (!TimeInfo.instance) {
      TimeInfo.instance = new TimeInfo();
    }

    return this.instance!;
  }

  getUserTimezone() {
    return this._timezone;
  }

  setUseTimezone(timezone: string) {
    this._timezone = timezone;
  }
}
