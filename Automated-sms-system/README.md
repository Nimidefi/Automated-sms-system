AUTOMATED_SMS_SYSTEM: Church Engagement & Member Care System ⛪
VAUTOMATED_SMS_SYSTEM is a robust, serverless automation solution built on Google Apps Script. It integrates Google Sheets, Forms, and the Multitexter SMS Gateway to manage congregational communication for RCCG Victorious Level Parish.

🚀 Key Features
🎂 Automated Birthday Blessings: Daily scans of the member database to send personalized birthday wishes. Includes "Sent" status tracking to prevent duplicate messages.

📡 Service Reminders: * Mid-Week: Automated Wednesday morning alerts for "Special Victory Hour."

Sunday: Strategic Saturday reminders for Sunday Worship Services.

🛡️ Anti-Spam Engine: Implements randomized reference IDs ([Ref: XXXX]) and a 5-second execution delay between requests to bypass carrier-level duplicate filters and ensure high delivery rates.

📋 Seamless Data Pipeline: Custom Google Sheets formulas automatically sanitize and format raw data from Google Forms into a script-ready database.

🛰️ DND Bypass: Configured with Corporate/DND routing to ensure messages reach members even on restricted mobile networks.

🛠️ Tech Stack
Language: JavaScript (Google Apps Script)

Database: Google Sheets (Backend)

Ingestion: Google Forms

API: Multitexter REST API

Triggers: Time-driven Google Project Triggers

⚙️ Installation & Setup
1. Google Sheet Configuration
Create a Google Sheet with a tab named Sheet1.

Set up your columns as follows:

Column A: Name

Column B: Phone (Format: 234...)

Column C: Birthday (MM-dd)

Column D: Status

2. Security (Script Properties)
To keep your API Token secure, do not hardcode it.

In your Apps Script editor, go to Project Settings > Script Properties.

Add a new property:

Property: MULTITEXTER_TOKEN

Value: [Your_Actual_API_Token]

3. Setting Up Triggers
sendBirthdaySMS: Set to Time-driven -> Day timer (8:00 AM - 9:00 AM).

sendMidWeekReminder: Set to Time-driven -> Weekly timer (Every Wednesday).

sendSundayReminder: Set to Time-driven -> Weekly timer (Every Saturday).

🛡️ Security Notice
This repository uses PropertiesService to handle sensitive API credentials. Ensure that ScriptProperties are never shared or logged in public environments.