const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to the SQLite database
const db = new sqlite3.Database('./medias.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});


//database connection
db.run(`
  CREATE TABLE IF NOT EXISTS media_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Media items table created.');
  }
});

// add item route
app.post('/api/media', (req, res) => {
  const { title, status } = req.body;
  const insertQuery = 'INSERT INTO media_items (title, status) VALUES (?, ?)';

  db.run(insertQuery, [title, status], function (err) {
    if (err) {
      console.error('Error inserting media item:', err.message);
      res.status(500).json({ error: 'Failed to insert media item.' });
    } else {
      const newMediaItemId = this.lastID;
      const newMediaItem = { id: newMediaItemId, title, status };
      res.status(201).json(newMediaItem);
    }
  });
});

// delete item route
app.delete('/api/media/:id', (req, res) => {
  const mediaItemId = req.params.id;
  const deleteQuery = 'DELETE FROM media_items WHERE id = ?';

  db.get('SELECT * FROM media_items WHERE id = ?', [mediaItemId], (err, row) => {
    if (err) {
      console.error('Error deleting media item:', err.message);
      res.status(500).json({ error: 'Failed to delete media item.' });
    } else {
      if (!row) {
        res.status(404).json({ error: 'Media item not found.' });
      } else {
        db.run(deleteQuery, [mediaItemId], (err) => {
          if (err) {
            console.error('Error deleting media item:', err.message);
            res.status(500).json({ error: 'Failed to delete media item.' });
          } else {
            console.log('Media item removed:', row);
            res.status(200).json(row);
          }
        });
      }
    }
  });
});

// Start the server - "node server.js" in cmd while located in this folder, 
//"npm start" inside of the main directory 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

