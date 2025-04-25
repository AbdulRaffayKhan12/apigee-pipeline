const fs = require('fs');
const path = require('path');

// Set your Apigee proxy and report paths here
const reportPath = 'C:\\Users\\abdulraffay.khan\\report.json';  // Path to your report.json
const outputPath = 'C:\\Users\\abdulraffay.khan\\report.html'; // Path to save the HTML report

// Read the report.json file
const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Prepare the HTML report
let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Apigeelint Report</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7; }
    h1 { color: #333; }
    .file { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .msg { margin-left: 20px; }
    .warn { color: orange; }
    .error { color: red; }
  </style>
</head>
<body>
  <h1>Apigeelint Report</h1>
`;

data.forEach(file => {
  html += `<div class="file"><h2>${file.filePath}</h2>`;
  file.messages.forEach(msg => {
    const severity = msg.severity === 1 ? 'warn' : 'error';
    html += `<p class="msg ${severity}">Line ${msg.line}, Col ${msg.column} — <strong>${msg.ruleId}</strong>: ${msg.message}</p>`;
  });
  html += `</div>`;
});

html += `
</body>
</html>
`;

// Write the report.html to the same path
fs.writeFileSync(outputPath, html);

console.log(`✅ HTML report generated at: ${outputPath}`);
