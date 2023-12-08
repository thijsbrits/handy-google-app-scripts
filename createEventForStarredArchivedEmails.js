function createEventForStarredArchivedEmails() {
  const threads = GmailApp.search('in:anywhere -in:inbox is:starred');
  
  for (const thread of threads) {
    const messageSubject = thread.getFirstMessageSubject();
    logThreadDetails(thread);

    const nextWorkdayAtEight = calculateNextWorkday();
    
    const duration = 30 * 60 * 1000; // 30 minutes in milliseconds
    const startTime = new Date(nextWorkdayAtEight.getTime());
    const endTime = new Date(startTime.getTime() + duration);

    createCalendarEvent(messageSubject, startTime, endTime);
    var messages = thread.getMessages();
    for (const msg of messages) {
        msg.unstar();
        Logger.log('Message: ' + msg.getPlainBody() + msg.isStarred());
    }
  }
}

function logThreadDetails(thread) {
  Logger.log('Thread ID: ' + thread.getId());
  Logger.log(thread.getFirstMessageSubject());
}

function calculateNextWorkday() {
  const nextWorkday = new Date();
  nextWorkday.setDate(nextWorkday.getDate() + 1);
  nextWorkday.setHours(8, 0, 0, 0);

  const dayOfWeek = nextWorkday.getDay();
  if (dayOfWeek === 0) { // Sunday
    nextWorkday.setDate(nextWorkday.getDate() + 1);
  } else if (dayOfWeek === 6) { // Saturday
    nextWorkday.setDate(nextWorkday.getDate() + 2);
  }
  return nextWorkday;
}

function createCalendarEvent(subject, startTime, endTime) {
  try {
    const event = CalendarApp.createEvent(subject, startTime, endTime);
    event.setVisibility(CalendarApp.Visibility.PRIVATE);
  } catch (e) {
    Logger.log('Error creating event: ' + e.toString());
  }
}
