require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || undefined, // Use undefined if password is empty
  database: process.env.DB_NAME
});

// Test database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database successfully');
});

// Test database connection
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database successfully');
  });
  
  // Question 1: Retrieve all patients
  app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving patients' });
        return;
      }
      res.json(results);
    });
  });
  
  // Question 2: Retrieve all providers
  app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving providers' });
        return;
      }
      res.json(results);
    });
  });
  
  // Question 3: Filter patients by First Name
  app.get('/patients/filter', (req, res) => {
    const { firstName } = req.query;
    if (!firstName) {
      res.status(400).json({ error: 'First name is required' });
      return;
    }
    const query = 'SELECT * FROM patients WHERE first_name = ?';
    connection.query(query, [firstName], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error filtering patients' });
        return;
      }
      res.json(results);
    });
  });
  
  // Question 4: Retrieve all providers by their specialty
  app.get('/providers/specialty', (req, res) => {
    const { specialty } = req.query;
    if (!specialty) {
      res.status(400).json({ error: 'Specialty is required' });
      return;
    }
    const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
    connection.query(query, [specialty], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving providers by specialty' });
        return;
      }
      res.json(results);
    });
  });

// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});