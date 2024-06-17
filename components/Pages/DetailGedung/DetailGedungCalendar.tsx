'use client';

import React, { useMemo } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import events from '@/data/eventsDummy';
import 'react-big-calendar/lib/css/react-big-calendar.css';

dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Jakarta');
const localizer = dayjsLocalizer(dayjs);

export default function DetailGedungCalendar() {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      views: {
        week: true,
      },
    }),
    []
  );

  return (
    <>
      <Calendar
        defaultDate={defaultDate}
        defaultView="week"
        events={events}
        localizer={localizer}
        views={views}
        formats={{
          timeGutterFormat: 'HH:mm',
          eventTimeRangeFormat: ({ start, end }, culture) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
          agendaTimeRangeFormat: ({ start, end }, culture) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
          dayRangeHeaderFormat: ({ start, end }, culture) =>
            `${localizer.format(start, 'DD MMM', culture)} — ${localizer.format(end, 'DD MMM', culture)}`,
          dayHeaderFormat: (date, culture) => `${localizer.format(date, 'dddd, DD MMM', culture)}`,
          dayFormat: (date, culture) => `${localizer.format(date, 'DD MMM', culture)}`,
        }}
      />
    </>
  );
}
