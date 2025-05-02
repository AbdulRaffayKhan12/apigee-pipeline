const fs = require('fs');
const path = require('path');

// Set your Apigee proxy and report paths here
const reportPath = 'C:\\Users\\abdulraffay.khan\\report.json';  // Path to your report.json
const outputPath = 'C:\\Users\\abdulraffay.khan\\report.html'; // Path to save the HTML report

// Read the report.json file
const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Prepare the HTML report with a tabular structure
let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Apigeelint Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f7f7f7;
      margin: 0;
      color: #333;
    }
    h1 {
      text-align: center;
      color: #444;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    th, td {
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
    }
    th {
      background-color: #f4f4f4;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .warn {
      background-color: #fff3cd;
      color: #856404;
    }
    .error {
      background-color: #f8d7da;
      color: #721c24;
    }
    .file-header {
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      text-align: center;
      font-size: 18px;
      border-radius: 8px 8px 0 0;
    }
    .container {
      margin: 0 auto;
      max-width: 1000px;
      padding: 20px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Apigeelint Report</h1>
  
    ${data.filter(file => file.messages.length > 0).map(file => {
      // Extract the relative path and format it
      const relativePath = file.filePath.replace(/^C:\\Users\\abdulraffay.khan\\Downloads\\New folder \(2\)/, '').replace(/\\/g, '/');
      
      return `
        <div class="file-header">
          API PROXY PATH: ${relativePath}
        </div>
        <table>
          <thead>
            <tr>
              <th>Line</th>
              <th>Column</th>
              <th>Rule</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            ${file.messages.map(msg => `
              <tr class="${msg.severity === 1 ? 'warn' : 'error'}">
                <td>${msg.line}</td>
                <td>${msg.column}</td>
                <td><strong>${msg.ruleId}</strong></td>
                <td>${msg.message}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }).join('')}
  </div>
  
</body>
</html>
`;

// Write the report.html to the specified path
fs.writeFileSync(outputPath, html);

console.log(`✅ HTML report generated at: ${outputPath}`);
