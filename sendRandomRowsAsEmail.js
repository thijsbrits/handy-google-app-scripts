function sendRandomRowsAsEmail() {
  var sheetId = '1WBgU5JUEYpRlWjM4QqhQI5k1hOZkIojAWfaOzCm4LTM'; 
  var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

  var range = sheet.getDataRange(); // Get all data
  var values = range.getValues();
  var values = values.slice(1);  

  // Filter out rows that don't contain text (assuming empty cells or cells with only spaces are not considered text)
  var textRows = values.filter(function(row) {
    return row.some(function(cell) { return cell.toString().trim() !== ''; });
  });
  
  // Shuffle the array and pick the first 5 rows
  var randomRows = shuffleArray(textRows).slice(0, 5);
  
  var message = "<ul>";
  randomRows.forEach(function(row) {
    message += "<li>" + row.join(" - ") + "</li>"; // Adjust the delimiter if needed
  });
  message += "</ul>";
  
  var subject = "Your Random Rows"; // Change the subject line if needed
  var recipient = ""; // Change to your email address
  
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: message
  });
}

// Function to shuffle the array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
