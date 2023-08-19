const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: 'ZQ!w21P<lYA-gl(Jz6+Q~3__lBjJHn', // Change this to a strong secret key
    resave: true,
    saveUninitialized: true,
  })
);

const db = mysql.createConnection({
  host: 'PROD-LAPTOP4',
  user: 'dev',
  password: 'dev123',
  database: 'messages_db',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.post('/api/messages', (req, res) => {
  const message = req.body.message;
  const query = 'INSERT INTO messages (content) VALUES (?)';

  db.query(query, [message], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving message');
    } else {
      res.status(200).send('Message saved');
    }
  });
});

app.get('/api/messages', (req, res) => {
  const query = 'SELECT * FROM messages';

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching messages');
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete('/api/messages/:id', (req, res) => {
  const messageId = req.params.id;
  const query = 'DELETE FROM messages WHERE id = ?';

  db.query(query, [messageId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting message');
    } else {
      res.status(200).send('Message deleted');
    }
  });
});

// User registration
app.post('/api/register', (req, res) => {
  const { username, password, level } = req.body;
  const query = 'INSERT INTO users (username, password, level) VALUES (?, ?, ?)';

  db.query(query, [username, password, level], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering user' });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// User login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  //console.log(`Received login request for username: ${username}`);

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error logging in' });
    } else {
      if (result.length === 1) {
        req.session.user = result[0];
        const userLevel = result[0].level;
        res.status(200).json({ message: 'Login successful', level: userLevel });
        //console.log(`userlevel:  ${userLevel}`);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });


});

//User delete
app.delete('/api/deleteuser', (req, res) => {
  const { username } = req.body;
  const query = 'DELETE FROM users WHERE username = ?';

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
    } else {
      res.status(200).send('User deleted');
    }
  });
});

//get user
app.get('/api/getuser', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching messages');
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/api/getmaterials', (req, res) => {
  const query = 'SELECT * FROM materials';

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching materials');
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/api/registermaterial', (req, res) => {
  const { materialname, materialsupplier, materialprice} = req.body;
  const query = 'INSERT INTO materials (materialname, materialsupplier, materialprice) VALUES (?, ?, ?)';

  db.query(query, [materialname, materialsupplier, materialprice], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering material' });
    } else {
      res.status(200).json({ message: 'material registered successfully' });
    }
  });
});

app.put('/api/updatematerial/:materialname', (req, res) => {
  const materialname = req.params.materialname;
  const { materialsupplier, materialprice } = req.body;

  const query = 'UPDATE materials SET materialsupplier = ?, materialprice = ? WHERE materialname = ?';
  db.query(query, [materialsupplier, materialprice, materialname], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating material' });
    } else {
      res.status(200).json({ message: 'Material updated successfully' });
    }
  });
});

app.delete('/api/deletematerial', (req, res) => {
  const { materialname } = req.body;
  const query = 'DELETE FROM materials WHERE materialname = ?';

  db.query(query, [materialname], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting material');
    } else {
      res.status(200).send('Material deleted');
    }
  });
});


app.post('/api/registermastercard', (req, res) => {
  const { mastercard, labelname, material, width, pitch} = req.body;
  const query = 'INSERT INTO mastercard (mastercard, labelname, material, width, pitch) VALUES (?, ?, ?,?,?)';

  db.query(query, [mastercard, labelname, material, width, pitch], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering mastercard' });
    } else {
      res.status(200).json({ message: 'mastercard registered successfully' });
    }
  });
});

app.get('/api/getmastercard', (req, res) => {
  const query = 'SELECT * FROM mastercard';

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching messages');
    } else {
      res.status(200).json(result);
    }
  });
});

app.put('/api/updatemastercard', (req, res) => {
  const { labelname, material, pitch, width, color, across, around, gear, process, finishing, mastercard} = req.body;
  const query = 'UPDATE mastercard SET labelname = ?, material = ?, pitch = ?, width = ?, color = ?, across = ?, around = ?, gear = ?, process = ?, finishing = ? WHERE mastercard = ?';

  db.query(query, [labelname, material, pitch, width, color, across, around, gear, process, finishing, mastercard], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering mastercard' });
    } else {
      res.status(200).json({ message: 'mastercard registered successfully' });
    }
  });
});

app.post('/api/registercosting', (req, res) => {
  const { labelname, material, pitch, width, color, across, around, gear, process, finishing, machine, mastercard} = req.body;
  const query = 'INSERT INTO costing (labelname, material, pitch, width, color, across, around, gear, process, finishing, machine, mastercard) VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?)';

  db.query(query, [
    labelname, material, pitch, width, color, across, around, gear, process, finishing,machine, mastercard], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering costing' });
    } else {
      const registeredCostingNumber = result.insertId;
      res.status(200).json({ id: registeredCostingNumber }); // Send the ID in the response
    }
  });

  app.get('/api/getcosting', (req, res) => {
    const query = 'SELECT * FROM costing';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching costing');
      } else {
        res.status(200).json(result);
      }
    });
  });

});

app.get('/api/getcosting', (req, res) => {
  const query = 'SELECT * FROM costing  ORDER BY entry_datetime DESC;';

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching costing');
    } else {
      res.status(200).json(result);
    }
  });
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
