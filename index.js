const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const multer = require('multer');


// Initialise postgres client
const configs = {
  user: 'yuiterai',
  host: '127.0.0.1',
  database: 'photo_journal',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));
app.use(express.static('public'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, 'public/uploads')
   },
   filename: function (req, file, cb) {
       cb(null, file.originalname)
   }
});

const upload = multer({ storage: storage });

/**
 * ===================================
 * ;) ;) ;) ;) ;) ;) ;) ;) ;) ;) ;) ;)
 * ===================================
 */


//Send request to display home screen
let homeRequest = (request, response) => {
  response.render('base/home');
}

//Send a request to create forms for adding a new photo
let newPhotoRequest = (request, response) => {
  response.render('photo/newphoto');
}

//Take the input for a new photo and save it into photos table
let addNewPhoto = (request, response) => {
  let newPhoto = '/uploads/' + request.file.originalname;
  let query = 'INSERT INTO photos (photo, title, location, taken_date, capture) VALUES ($1, $2, $3, $4, $5)';
  const values = [newPhoto, request.body.title, request.body.location, request.body.taken_date, request.body.capture];
  pool.query(query, values, (err, result) => {
    if(!err) {
       response.redirect('/photos');

    } else {
      console.error('query error:', err.stack);
      response.status(500).send("Internal Server Error");
    }
  });
}


//Send request to show all indivisual photos
let showPhotos = (request, response) => {
  query = 'SELECT * FROM photos';
  pool.query(query, (err, result) => {
    if (!err) {
        const data = {photos: result.rows};
        console.log(data);
        response.render('photo/showphotos', data);
      } else {
        console.error('query error:', err);
        response.status(500).send('LINE 203 query error', 'Internal Server Error');
      }
  });
}

app.get('/', homeRequest);
app.get('/photos/new', newPhotoRequest);
app.post('/photos', upload.single('photo'), addNewPhoto);
app.get('/photos', showPhotos);















































/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);