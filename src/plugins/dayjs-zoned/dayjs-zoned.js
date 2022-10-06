// SOURCE: https://gist.github.com/ianldgs/87ed392c6eef53ebf7df234b67f587f2

export default (_, Dayjs, dayjs) => {
  dayjs.utcToZoned = function utcToZoned(config, timeZone) {
    const date = dayjs(config);

    if (!timeZone) {
      return date;
    }
    const zonedString = date.toDate().toLocaleString('en-US', { timeZone });

    return dayjs(zonedString);
  };

  dayjs.zonedToUtc = function zonedToUtc(config, timeZone) {
    const utcDate = dayjs(config);

    if (!timeZone) {
      return utcDate;
    }
    const zonedDate = dayjs.utcToZoned(config, timeZone);
    const diff = utcDate.diff(zonedDate, 'hour');

    return utcDate.add(diff, 'hour');
  };

  dayjs.changeZoneKeepTime = function changeZoneKeepTime(
    config,
    oldTimeZone,
    newTimeZone
  ) {
    const utcDate = dayjs(config);

    if (!oldTimeZone || !newTimeZone) {
      return utcDate;
    }

    const oldDate = dayjs.utcToZoned(config, oldTimeZone);
    const newDate = dayjs.utcToZoned(config, newTimeZone);
    const diff = oldDate.diff(newDate, 'hour');

    return utcDate.add(diff, 'hour');
  };
};
