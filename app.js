/**
 * RCCG Victorious Level Parish - SMS Automator
 * Version: 1.0.0
 * * SETUP INSTRUCTIONS:
 * 1. Obtain your API Token from Multitexter.com
 * 2. In Google Apps Script, go to Project Settings > Script Properties
 * 3. Add a property named 'MULTITEXTER_TOKEN' and paste your key there.
 */


function sendBirthdaySMS() {
// Change "Sheet1" to the actual name of your main tab
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const rows = sheet.getDataRange().getValues();
  
  // Get Today's date in Nigeria (GMT+1)
  const today = Utilities.formatDate(new Date(), "GMT+1", "MM-dd");
  Logger.log("System thinks today is: " + today);

  for (let i = 1; i < rows.length; i++) {
    const [name, phone, birthday, status] = rows[i];
    
    // 1. SKIP if the name or birthday is empty
    if (!name || !birthday || birthday === "") {
      continue; 
    }

    try {
      // 2. Format the birthday from the sheet
      const bdayDate = new Date(birthday);
      
      // Check if it's a valid date object
      if (isNaN(bdayDate.getTime())) {
        Logger.log("Skipping " + name + " - Invalid date format in cell.");
        continue;
      }

      const bdayStr = Utilities.formatDate(bdayDate, "GMT+1", "MM-dd");
      Logger.log("Checking " + name + ": " + bdayStr);

      // 3. STRICT COMPARISON
      if (today === bdayStr && status !== "Sent") {
        const randomID = Math.floor(Math.random() * 900) + 100;
        const message = `Happy Birthday ${name}! 🎂
                    RCCG Victorious Level Parish celebrates you. May this year bring divine health, favor, and testimonies in Jesus' name.
                    [Ref: ${randomID}]`;
        const success = callMultitexter(phone, message);
        
        if (success) {
          sheet.getRange(i + 1, 4).setValue("Sent");
          Logger.log("✅ Message sent to " + name);
          Utilities.sleep(5000);
        }
      } else {
        Logger.log("❌ No match for " + name);
      }
    } catch (e) {
      Logger.log("Error processing row " + (i + 1) + ": " + e.message);
    }
  }
}

/**
 * MULTITEXTER CONFIGURATION
 */
const API_TOKEN = 'MULTITEXTER_TOKEN'; // Stored in Script Properties
const SENDER_NAME = 'RCCG VLP'; 

function callMultitexter(to, message) {
  const url = "https://app.multitexter.com/v2/app/sendsms"; // Using the 'sendsms' specific endpoint
  
  const payload = {
    "sender_name": SENDER_NAME,
    "recipients": to,
    "message": message,
    "forcednd": 1,
    "routing": 2 
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + API_TOKEN,
      "Accept": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    Logger.log("Full Response: " + response.getContentText());

    if (result.status == 1 || result.status == "1") {
      return true;
    } else {
      Logger.log("Multitexter Error: " + result.msg);
      return false;
    }
  } catch (e) {
    Logger.log("Connection Error: " + e.toString());
    return false;
  }
}

/**
function testMultitexter() {
  const myNumber = '	2348115702031';
  const result = callMultitexter(myNumber, "Final Test: bypass DND and Login errors! 🚀");
  Logger.log(result ? "✅ SUCCESS" : "❌ STILL FAILED - Check your Token");
}   */

// 1. MID-WEEK SERVICE REMINDER (Run this on Wednesdays)
function sendMidWeekReminder() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const rows = sheet.getDataRange().getValues();
  
  // Cleaned up message with line breaks (\n)
  const message = "SPECIAL VICTORY HOUR\n" +
              "Join us today for prayer & worship at RCCG Victorious Level Parish.\n" +
              "Time: 6:00PM. Invite someone & be blessed!";
  processBulkSMS(rows, message);
}

// 2. SUNDAY SERVICE REMINDER (Run this on Saturdays)
function sendSundayReminder() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const rows = sheet.getDataRange().getValues();
  
  const message = "SUNDAY SERVICE REMINDER\n" +
              "Join us at RCCG Victorious Level Parish for Worship.\n" +
              "Time: 8:00 AM\n" +
              "Expect a divine encounter! Invite friends. God bless you.";
  processBulkSMS(rows, message);
}

// 3. HELPER FUNCTION (Corrected logic)
function processBulkSMS(rows, messageBody) {
  for (let i = 1; i < rows.length; i++) {
    const name = rows[i][0];  // Column A
    const phone = rows[i][1]; // Column B
    
    if (!phone || phone === "") continue;

    // Adds a unique ID here to prevent spam blocks
    const uniqueID = Math.floor(1000 + Math.random() * 9000);
    const finalMessage = `${messageBody}\n[Ref: ${uniqueID}]`;

    const success = callMultitexter(phone, finalMessage);
    
    if (success) {
      Logger.log("✅ Reminder sent to: " + (name || phone));
      Utilities.sleep(5000); // 5-second gap for safety
    } else {
      Logger.log("❌ Failed to send to: " + (name || phone));
    }
  }
}