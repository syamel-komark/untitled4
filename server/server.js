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

///////////////////////////////////ADMIN STUFFF/////////////////////////////////////////////////////////
{
  // User registration
  app.post('/api/register', (req, res) => {
    const { username, password, level } = req.body;
    const query = 'INSERT INTO users (username, password, level) VALUES (?, ?, ?)';

    db.query(query, [username, password, level], (err) => {
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

    db.query(query, [username], (err) => {
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

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////FACESTOCK//////////////////////////////////////////
{
  app.get('/api/getfacestock', (req, res) => {
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

  app.post('/api/registerfacestock', (req, res) => {
    const { materialname, materialsupplier, materialprice} = req.body;
    const query = 'INSERT INTO materials (materialname, materialsupplier, materialprice) VALUES (?, ?, ?)';

    db.query(query, [materialname, materialsupplier, materialprice], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering material' });
      } else {
        res.status(200).json({ message: 'material registered successfully' });
      }
    });
  });

  app.put('/api/updatefacestock', (req, res) => {
    const {materialname,materialsupplier,materialprice,materialid} = req.body;
    const query = 'UPDATE materials SET materialname = ?, materialsupplier = ?, materialprice = ? WHERE materialid = ?';

    db.query(query, [materialname,materialsupplier,materialprice,materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating material' });
      } else {
        res.status(200).json({ message: 'material updated successfully' });
      }
    });
  });

  app.delete('/api/deletefacestock', (req, res) => {
    const { materialid } = req.body;
    const query = 'DELETE FROM materials WHERE materialid = ?';

    db.query(query, [materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting material' });
      } else {
        res.status(200).json({ message: 'material deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////////////////////////////////////

/////////////////////INK//////////////////
{
  app.get('/api/getink', (req, res) => {
    const query = 'SELECT * FROM ink';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching ink');
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.post('/api/registerink', (req, res) => {
    const { materialname, machine, materialprice} = req.body;
    const query = 'INSERT INTO ink (materialname, machine, materialprice) VALUES (?, ?, ?)';

    db.query(query, [materialname, machine, materialprice], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering ink' });
      } else {
        res.status(200).json({ message: 'ink registered successfully' });
      }
    });
  });

  app.put('/api/updateink', (req, res) => {
    const {materialname,machine,materialprice,materialid} = req.body;
    const query = 'UPDATE ink SET materialname = ?, machine = ?, materialprice = ? WHERE materialid = ?';

    db.query(query, [materialname,machine,materialprice,materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating ink' });
      } else {
        res.status(200).json({ message: 'ink updated successfully' });
      }
    });
  });

  app.delete('/api/deleteink', (req, res) => {
    const { materialid } = req.body;
    const query = 'DELETE FROM ink WHERE materialid = ?';

    db.query(query, [materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting ink' });
      } else {
        res.status(200).json({ message: 'ink deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////

/////////////////////VARNISH//////////////////
{
  app.get('/api/getvarnish', (req, res) => {
    const query = 'SELECT * FROM varnish';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching varnish');
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.post('/api/registervarnish', (req, res) => {
    const { materialname, machine, materialprice} = req.body;
    const query = 'INSERT INTO varnish (materialname, machine, materialprice) VALUES (?, ?, ?)';

    db.query(query, [materialname, machine, materialprice], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering varnish' });
      } else {
        res.status(200).json({ message: 'varnish registered successfully' });
      }
    });
  });

  app.put('/api/updatevarnish', (req, res) => {
    const {materialname,machine,materialprice,materialid} = req.body;
    const query = 'UPDATE varnish SET materialname = ?, machine = ?, materialprice = ? WHERE materialid = ?';

    db.query(query, [materialname,machine,materialprice,materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating varnish' });
      } else {
        res.status(200).json({ message: 'varnish updated successfully' });
      }
    });
  });

  app.delete('/api/deletevarnish', (req, res) => {
    const { materialid } = req.body;
    const query = 'DELETE FROM varnish WHERE materialid = ?';

    db.query(query, [materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting varnish' });
      } else {
        res.status(200).json({ message: 'varnish deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////


/////////////////////HPCLICK//////////////////
{
  app.get('/api/gethpclick', (req, res) => {
    const query = 'SELECT * FROM hpink';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching click');
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.post('/api/registerhpclick', (req, res) => {
    const { materialname, machine, materialprice} = req.body;
    const query = 'INSERT INTO hpink (materialname, machine, materialprice) VALUES (?, ?, ?)';

    db.query(query, [materialname, machine, materialprice], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering click' });
      } else {
        res.status(200).json({ message: 'click registered successfully' });
      }
    });
  });

  app.put('/api/updatehpclick', (req, res) => {
    const {materialname,machine,materialprice,materialid} = req.body;
    const query = 'UPDATE hpink SET materialname = ?, machine = ?, materialprice = ? WHERE materialid = ?';

    db.query(query, [materialname,machine,materialprice,materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating click' });
      } else {
        res.status(200).json({ message: 'click updated successfully' });
      }
    });
  });

  app.delete('/api/deletehpclick', (req, res) => {
    const { materialid } = req.body;
    const query = 'DELETE FROM hpink WHERE materialid = ?';

    db.query(query, [materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting click' });
      } else {
        res.status(200).json({ message: 'click deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////

///////////////////////////////////////////////LAMINATE////////////////////////
{
  app.get('/api/getlaminate', (req, res) => {
    const query = 'SELECT * FROM laminate';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching laminate');
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.post('/api/registerlaminate', (req, res) => {
    const { materialname, materialsupplier, materialprice} = req.body;
    const query = 'INSERT INTO laminate (materialname, materialsupplier, materialprice) VALUES (?, ?, ?)';

    db.query(query, [materialname, materialsupplier, materialprice], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering laminate' });
      } else {
        res.status(200).json({ message: 'laminate registered successfully' });
      }
    });
  });

  app.put('/api/updatelaminate', (req, res) => {
    const {materialname,materialsupplier,materialprice,materialid} = req.body;
    const query = 'UPDATE laminate SET materialname = ?, materialsupplier = ?, materialprice = ? WHERE materialid = ?';

    db.query(query, [materialname,materialsupplier,materialprice,materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating laminate' });
      } else {
        res.status(200).json({ message: 'laminate updated successfully' });
      }
    });
  });

  app.delete('/api/deletelaminate', (req, res) => {
    const { materialid } = req.body;
    const query = 'DELETE FROM laminate WHERE materialid = ?';

    db.query(query, [materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting laminate' });
      } else {
        res.status(200).json({ message: 'Laminate deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////FOIL////////////////////////
{
  app.get('/api/getfoil', (req, res) => {
    const query = 'SELECT * FROM foil';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching foil');
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.post('/api/registerfoil', (req, res) => {
    const { materialname, materialsupplier, materialprice} = req.body;
    const query = 'INSERT INTO foil (materialname, materialsupplier, materialprice) VALUES (?, ?, ?)';

    db.query(query, [materialname, materialsupplier, materialprice], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering foil' });
      } else {
        res.status(200).json({ message: 'foil registered successfully' });
      }
    });
  });

  app.put('/api/updatefoil', (req, res) => {
    const {materialname,materialsupplier,materialprice,materialid} = req.body;
    const query = 'UPDATE foil SET materialname = ?, materialsupplier = ?, materialprice = ? WHERE materialid = ?';

    db.query(query, [materialname,materialsupplier,materialprice,materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating foil' });
      } else {
        res.status(200).json({ message: 'foil updated successfully' });
      }
    });
  });

  app.delete('/api/deletefoil', (req, res) => {
    const { materialid } = req.body;
    const query = 'DELETE FROM foil WHERE materialid = ?';

    db.query(query, [materialid], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting foil' });
      } else {
        res.status(200).json({ message: 'foil deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////////////////////////////////////////

////////////////MASTERCARD//////////////////////////
{
  app.post('/api/registermastercard', (req, res) => {
    const { mastercard, labelname, material, width, pitch} = req.body;
    const query = 'INSERT INTO mastercard (mastercard, labelname, material, width, pitch) VALUES (?, ?, ?,?,?)';

    db.query(query, [mastercard, labelname, material, width, pitch], (err) => {
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

    db.query(query, [labelname, material, pitch, width, color, across, around, gear, process, finishing, mastercard], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering mastercard' });
      } else {
        res.status(200).json({ message: 'mastercard registered successfully' });
      }
    });
  });

}
//////////////////////////////////////////////////

/////////////////////////COSTING//////////////////////////////
{
  app.post('/api/registercosting', (req, res) => {
    const { labelname, material, pitch, width, color, across, around, gear, process, finishing, machine,foil,foilcost,materialcost,laminate,laminatecost,ink,inkcost,varnish,varnishcost,diecut,quantity, mastercard} = req.body;
    const query = 'INSERT INTO costing (labelname, material, pitch, width, color, across, around, gear, process, finishing, machine,foil,foilcost,materialcost,laminate,laminatecost,ink,inkcost,varnish,varnishcost,diecut,quantity, mastercard) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?,?,?,?,?,?,?,?,?)';

    db.query(query, [
      labelname, material, pitch, width, color, across, around, gear, process, finishing,machine,foil,foilcost,materialcost,laminate,laminatecost,ink,inkcost,varnish,varnishcost,diecut,quantity, mastercard], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering costing' });
      } else {
        const registeredCostingNumber = result.insertId;
        res.status(200).json({ id: registeredCostingNumber }); // Send the ID in the response
      }
    });
  });

  app.get('/api/getcosting', (req, res) => {
    const idFilter = req.query.id; // Get the ID filter from the query parameters

    let query = 'SELECT * FROM costing';

    if (idFilter) {
      query += ` WHERE id = ${idFilter}`; // Add the ID filter condition to the query
    }

    query += ' ORDER BY entry_datetime DESC;';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching costing');
      } else {
        res.status(200).json(result);
      }
    });
  });

}
//////////////////////////////////////////////////////////////////////////

/////////////////////////////////////FIXEDCOST//////////////////////////////////////////
{
  app.get('/api/getfixedcost', (req, res) => {
    const query = 'SELECT * FROM fixedcost';

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching fixedcost');
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.post('/api/registerfixedcost', (req, res) => {
    const {process,speed, costallocation,currentutilization,ratio,fixedcostmonth,fixedcostday,fixedcostm} = req.body;
    const query = 'INSERT INTO fixedcost (process,speed, costallocation,currentutilization,ratio,fixedcostmonth,fixedcostday,fixedcostm) VALUES (?, ?, ?,?,?,?,?,?)';

    db.query(query, [process,speed,costallocation,currentutilization,ratio,fixedcostmonth,fixedcostday,fixedcostm], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering fixedcost' });
      } else {
        res.status(200).json({ message: 'fixedcost registered successfully' });
      }
    });
  });

  app.put('/api/updatefixedcost', (req, res) => {
    const {process,speed,costallocation,currentutilization,ratio,fixedcostmonth,fixedcostday,fixedcostm,id} = req.body;
    const query = 'UPDATE fixedcost SET process = ?,speed=?, costallocation = ?, currentutilization = ?,ratio=?,fixedcostmonth=?,fixedcostday=?,fixedcostm=? WHERE id = ?';

    db.query(query, [process,speed,costallocation,currentutilization,ratio,fixedcostmonth,fixedcostday,fixedcostm,id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating fixedcost' });
      } else {
        res.status(200).json({ message: 'fixedcost updated successfully' });
      }
    });
  });

  app.delete('/api/deletefixedcost', (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM fixedcost WHERE id = ?';

    db.query(query, [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting fixedcost' });
      } else {
        res.status(200).json({ message: 'fixedcost deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////////////////////////////////////

/////////////////////MACHINE//////////////////
{
  app.get('/api/getmachine', (req, res) => {
    const machinenamefilter = req.query.machinename;
    let query = 'SELECT * FROM machine';
    let queryParams = []; // Initialize an array to store query parameters

    if (machinenamefilter) {
      query += ' WHERE machinename = ?'; // Add the placeholder for the parameter
      queryParams.push(machinenamefilter); // Add the parameter value to the array
    }

    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching machine');
      } else {
        res.status(200).json(result);
      }
    });
  });


  app.post('/api/registermachine', (req, res) => {
    const { machinename, maxwidth,maxpitch,minwidth,minpitch,noofstation,wastage,settinglength,speed,settingtime, plateprice, gear, gearpitch, trim, acrossgap, rolllength, jointwastage, coatingweight} = req.body;
    const query = 'INSERT INTO machine (machinename, maxwidth,maxpitch,minwidth,minpitch,noofstation,wastage,settinglength,speed,settingtime, plateprice, gear, gearpitch, trim, acrossgap, rolllength, jointwastage, coatingweight) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    db.query(query, [machinename, maxwidth,maxpitch,minwidth,minpitch,noofstation,wastage,settinglength,speed,settingtime, plateprice, gear, gearpitch, trim, acrossgap, rolllength, jointwastage, coatingweight], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering machine' });
      } else {
        res.status(200).json({ message: 'machine registered successfully' });
      }
    });
  });

  app.put('/api/updatemachine', (req, res) => {
    const {machinename, maxwidth,maxpitch,minwidth,minpitch,noofstation,wastage,settinglength,speed,settingtime, plateprice, gear, gearpitch, trim, acrossgap, rolllength, jointwastage, coatingweight, hotstampingplateprice, silkscreenplateprice, flexiblediecutprice, flatbeddiecutprice, soliddiecutprice, idmachine} = req.body;
    const query = 'UPDATE machine SET machinename=?, maxwidth=?,maxpitch=?,minwidth=?,minpitch=?,noofstation=?,wastage=?,settinglength=?,speed=?,settingtime=?, plateprice=?, gear=?, gearpitch=?, trim=?, acrossgap=?, rolllength=?, jointwastage=?, coatingweight=?, hotstampingplateprice=?, silkscreenplateprice=?, flexiblediecutprice=?, flatbeddiecutprice=?, soliddiecutprice=? WHERE idmachine = ?';

    db.query(query, [machinename, maxwidth,maxpitch,minwidth,minpitch,noofstation,wastage,settinglength,speed,settingtime, plateprice, gear, gearpitch, trim, acrossgap, rolllength, jointwastage, coatingweight, hotstampingplateprice, silkscreenplateprice, flexiblediecutprice, flatbeddiecutprice, soliddiecutprice, idmachine], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating machine' });
      } else {
        res.status(200).json({ message: 'machine updated successfully' });
      }
    });
  });

  app.delete('/api/deletemachine', (req, res) => {
    const { idmachine } = req.body;
    const query = 'DELETE FROM machine WHERE idmachine = ?';

    db.query(query, [idmachine], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting machine' });
      } else {
        res.status(200).json({ message: 'machine deleted' });
      }
    });
  });

}
////////////////////////////////////////////////////





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
