const path = require('path');
const dotenv = require('dotenv');

// Load appropriate env file
const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
dotenv.config({ path: path.resolve(__dirname, `../env/${envFile}`) });

// Construct MongoDB URI safely
const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri,
  adminApiKey: process.env.ADMIN_API_KEY,
};
