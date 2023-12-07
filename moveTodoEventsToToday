function moveTodoEventsToToday() {
    var calendar = CalendarApp.getDefaultCalendar();
    var today = new Date();

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    var lastWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7); // last 2 weeks to be safe, they should already be moved
    var events = calendar.getEvents(lastWeeks, yesterday);

    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var title = event.getTitle().toLowerCase();
        var startTime = event.getStartTime();
        var endTime = event.getEndTime();
        var duration = endTime.getTime() - startTime.getTime(); // needed because isAllDayEvent does not capture all
        var isAllDayEvent = event.isAllDayEvent() || duration === 86400000
        
        if (!title.includes("done:") && !(title === "focus time" || title === "out of office") && !event.isRecurringEvent() && !isAllDayEvent) {
            var guests = event.getGuestList(true);

            if (guests.length === 0 && event.isOwnedByMe()) {
                console.log("-----");
                console.log(event.getStartTime());

                var newStart = new Date(today.getTime());
                newStart.setHours(8, 0);
                var newEnd = new Date(newStart.getTime() + duration);

                event.setTime(newStart, newEnd);
                console.log("moved:" + title);
            }
        }
    }
}
