export const renderTimestamp = (timestamp: string): string => {
  let prefix = '';
  const timeDiff = Math.round(
    (new Date().getTime() - new Date(timestamp).getTime()) / 60000
  );
  if (timeDiff < 1) {
    prefix = 'только что...';
  } else if (timeDiff < 60 && timeDiff > 1) {
    prefix = `${timeDiff} минут назад`;
  } else if (timeDiff < 24 * 60 && timeDiff > 60) {
    prefix = `${Math.round(timeDiff / 60)} часов назад`;
  } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
    prefix = `${Math.round(timeDiff / (60 * 24))} дней назад`;
  } else {
    prefix = `${new Date(timestamp)}`;
  }
  return prefix;
};