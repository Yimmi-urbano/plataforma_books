const express = require('express');
const app = express();
require('dotenv').config();
const URL_API_SERVER = process.env.API_URL;
const PORT = process.env.PORT || 3000;
const API_CATEGORY = `${URL_API_SERVER}/category`

module.exports = {
  API_CATEGORY,
  PORT
};