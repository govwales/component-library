import '@formatjs/intl-getcanonicallocales';
import '@formatjs/intl-datetimeformat';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-datetimeformat/locale-data/cy';

// Component props.
export interface DateProps {
  date: string;
  displayTime?: boolean;
  displayDay?: boolean;
  locale?: string;
}

// Component render.
const FormatDate = ({
  date,
  displayTime,
  displayDay = true,
  locale,
}: DateProps) => {
  let timestamp = Date.parse(date);

  const dateAsParts = new Intl.DateTimeFormat(`${locale}-GB`, {
    day: displayDay ? 'numeric' : undefined,
    month: 'long',
    year: 'numeric',
    hour: displayTime ? 'numeric' : undefined,
    minute: displayTime ? 'numeric' : undefined,
    hour12: displayTime ? true : undefined,
  }).formatToParts(timestamp);

  const day = dateAsParts.find(date => date.type === 'day');
  const month = dateAsParts.find(date => date.type === 'month');
  const year = dateAsParts.find(date => date.type === 'year');

  let time = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(timestamp);

  // Translate AM/PM for Welsh locale
  if (locale === 'cy') {
    time = time.replace('AM', 'YB');
    time = time.replace('PM', 'YP');
  }

  return (
    <time dateTime={date}>
      {day && <>{day.value}</>} {month && <>{month.value}</>}{' '}
      {year && <>{year.value}</>}
      {displayTime && <> ({time.toLowerCase()})</>}
    </time>
  );
};

// Component export.
export default FormatDate;
