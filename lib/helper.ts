export function formatDate(start: string, end: string) {
  // Create Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Format the start date
  const dateOptions: any = { day: 'numeric', month: 'long', year: 'numeric' };
  const timeOptions: any = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedDate = startDate.toLocaleDateString('id-ID', dateOptions);
  const formattedStartTime = startDate.toLocaleTimeString('id-ID', timeOptions);

  // Format the end time
  const formattedEndTime = endDate.toLocaleTimeString('id-ID', timeOptions);

  // Return the formatted string
  return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
}
