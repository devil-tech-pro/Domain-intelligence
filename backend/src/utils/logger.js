const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Simple logger implementation
const logger = {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    fs.appendFileSync(
      path.join(logsDir, 'app.log'),
      `[INFO] ${new Date().toISOString()} - ${message}\n`
    );
  },
  error: (message) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    fs.appendFileSync(
      path.join(logsDir, 'error.log'),
      `[ERROR] ${new Date().toISOString()} - ${message}\n`
    );
  },
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
      fs.appendFileSync(
        path.join(logsDir, 'debug.log'),
        `[DEBUG] ${new Date().toISOString()} - ${message}\n`
      );
    }
  }
};

module.exports = logger;
