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
    console.log(file)
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




app.get('/', homeRequest);















































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