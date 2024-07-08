import React, { useMemo } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';

dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Jakarta');
const localizer = dayjsLocalizer(dayjs);

export default function DetailGedungCalendar({ reservations }: any) {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: {
        week: true,
      },
    }),
    []
  );

  const minTime = new Date();
  minTime.setHours(9, 0, 0, 0);

  const formattedReservations = reservations
    ?.filter((reservation) => {
      const status = reservation.status.toLowerCase();
      return status !== 'rejected' && status !== 'pending';
    })
    .map((reservation) => ({
      id: reservation.id,
      title: 'Long Event',
      start: new Date(reservation.start_peminjaman), // Months are zero-indexed in JavaScript Date object
      end: new Date(reservation.end_peminjaman), // Adjust as needed for correct end date
      id_gedung: reservation.id_gedung,
      id_peminjam: reservation.id_peminjam,
      start_peminjaman: reservation.start_peminjaman,
      end_peminjaman: reservation.end_peminjaman,
      deskripsi_kegiatan: reservation.deskripsi_kegiatan,
      status: reservation.status,
    }));

  return (
    <>
      <Calendar
        defaultDate={defaultDate}
        defaultView="week"
        events={formattedReservations}
        localizer={localizer}
        views={views}
        min={minTime}
        formats={{
          timeGutterFormat: 'HH:mm',
          eventTimeRangeFormat: ({ start, end }, culture) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
          agendaTimeRangeFormat: ({ start, end }, culture) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
          dayRangeHeaderFormat: ({ start, end }, culture) =>
            `${localizer.format(start, 'DD MMM', culture)} — ${localizer.format(end, 'DD MMM', culture)}`,
          dayHeaderFormat: (date, culture) => `${localizer.format(date, 'dddd, DD MMM', culture)}`,
          dayFormat: (date, culture) => `${localizer.format(date, 'DD ddd', culture)}`,
        }}
      />
    </>
  );
}
