const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const multer = require('multer');
const PORT = process.env.PORT || 4001;
const bodyParser = require('body-parser');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const url = require('url');
if(process.env.DATABASE_URL) {

  console.log("in process")
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
} else {
  console.log("not in process")
  var configs = {
  user: 'yuiterai',
  host: '127.0.0.1',
  database: 'photo_journal',
  port: 5432,
};
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});


// Init express app
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));

app.use(methodOverride('_method'));
app.use(express.static('public'));


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


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


//Send a request to create a form for adding a new photo
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
      response.status(500).send('QUERY ERROR!!!!! at addNewPhoto');
    }
  });
}


//Send a request to show all indivisual photos
let showPhotos = (request, response) => {
  albumQuery = 'SELECT * FROM album';
  pool.query(albumQuery, (err, result) => {
    if(!err) {
      let albumTitle = result.rows;
      let photosQuery = 'SELECT * FROM photos';

      pool.query(photosQuery, (err, result) => {
        if (!err) {
            const data = {photos: result.rows, albumList: albumTitle};
            response.render('photo/showphotos', data);
          } else {
            console.error('query error:', err);
            response.status(500).send('QUERY ERROR!!!!! at showPhotos');
          }
      });
    } else {
        console.error('query error:', err);
        response.status(500).send('QUERY ERROR!!!!! at showPhotos');
      }
  });
} 


//Send request to create a form for a new album
let newAlbumRequest = (request, response) => {
  let query = 'SELECT * FROM photos';
  pool.query(query, (err, result) => {
    if (!err) {
      const data = {photos: result.rows};
      response.render('album/newalbum', data);
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at newAlbumRequest');
    }
  });
}

//Take the input for a new album and save in into album table
let createNewAlbum = (request, response) => {
  let photos = request.body.photoArray;
  let albumQuery = "INSERT INTO album (title) VALUES ($1) RETURNING id";
  let values = [request.body.title];
  pool.query(albumQuery, values, (err, result) => {
    if(!err) {
      let albumId = result.rows[0].id;
      let photosAlbumQuery = 'INSERT INTO photos_album (photo_id, album_id) VALUES';
            photos.forEach(photoId => {
                photosAlbumQuery += `(${photoId}, ${albumId}),`;
            });
           photosAlbumQuery = photosAlbumQuery.slice(0,-1);
           photosAlbumQuery = photosAlbumQuery + ` RETURNING *`;

            pool.query(photosAlbumQuery, (err, result) => {
              if(!err) {
                response.redirect('/album');
              } else {
                console.error('query error:', err.stack);
                response.status(500).send('QUERY ERROR!!!!! at createAlbum');
              }
            });
    } else {
      console.error('query error:', err.stack);
      response.status(500).send('QUERY ERROR!!!!! at createAlbum');
    }
  });
}

//Send a request to show all albums
let showAlbum = (request, response) => {
  query = 'SELECT * FROM album';
  pool.query(query, (err, result) => {
    if (!err) {
        const data = {album: result.rows};
        response.render('album/showalbum', data);
      } else {
        console.error('query error:', err);
        response.status(500).send('QUERY ERROR!!!!! at showAlbum');
      }
  });
}

//Send a request to show all the photos in the selected album
let photosInAlbumRequest = (request, response) => {
  let albumId = request.params.id;
  let query = `SELECT photos.photo, photos.title, photos.taken_date FROM photos INNER JOIN photos_album ON (photos.id = photos_album.photo_id) WHERE photos_album.album_id=${albumId}`;
  pool.query(query, (err, result) => {
    if (!err) {
      const data = {photosInAlbum: result.rows};
      response.render('album/photosinalbum', data);
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at photosInAlbumRequest');
    }
  });
}

//Send a request to edit the selected photo
let editPhotoRequest = (request, response) => {
  let query = `SELECT * FROM photos WHERE id=${request.params.id}`;
  pool.query(query, (err, result) => {
    if(!err) {
      const data = {editPhoto: result.rows[0]};
      response.render('photo/editphoto', data);
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at editPhotoRequest');
    }
  });
}

//Take the input and update photos table
let editPhotoPut = (request, response) => {
  const photoId = request.params.id;
  let title = request.body.title;
  let location = request.body.location;
  let taken_date = request.body.taken_date;
  let capture = request.body.capture;

  let query = `UPDATE photos SET title='${title}', location='${location}', taken_date='${taken_date}', capture='${capture}' WHERE id=${photoId}`;
  
  pool.query(query, (err, result) => {
    if(!err) {  
      response.redirect('/photos');
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at editPhotoPut');
    }
  });
}


//Send a request to show the selcted photo to delete
let deletePhotoRequest = (request, response) => {
  let photoId = request.params.id;
  let query = `SELECT * FROM photos WHERE id=${photoId}`;

  pool.query(query, (err, result) => {
    if(!err) {
      const data = {deletePhoto: result.rows[0]};
      response.render('photo/deletephoto', data)
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at deletePhotoRequest');
    }
  });
}

//Delete the selected photo
let deletePhoto = (request, response) => {
  let deletePhotoId = request.params.id;
  let query =  `DELETE FROM photos WHERE id=${deletePhotoId}`;
  pool.query(query, (err, result) => {
    if(!err) {
      response.redirect('/photos');
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at deletePhoto');
    }
  });
}

//Send a request to show the selected photo journal
let showJournal = (request, response) => {
  let query = `SELECT * FROM photos WHERE id=${request.params.id}`;
  pool.query(query, (err, result) => {
    if(!err) {
      const data = {journal: result.rows[0]};
      response.render('photo/journal', data);
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at showJournal');
    }
  });
}


//Send a request to show the selcted album to delete
let deleteAlbumRequest = (request, response) => {
  let albumId = request.params.id;
  let query = `SELECT * FROM album WHERE id=${albumId}`;

  pool.query(query, (err, result) => {
    if(!err) {
      const data = {deleteAlbum: result.rows[0]};
      response.render('album/deletealbum', data)
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at deleteAlbumRequest');
    }
  });
}


//Delete the selected album
let deleteAlbum = (request, response) => {
  let deleteAlbumId = request.params.id;
  let query =  `DELETE FROM album WHERE id=${deleteAlbumId}`;
  pool.query(query, (err, result) => {
    if(!err) {
      response.redirect('/album');
    } else {
      console.error('query error:', err);
      response.status(500).send('QUERY ERROR!!!!! at deleteAlbum');
    }
  });
}

/**
 * ===================================
 * DONE DONE DONE DONE DONE DONE DONE
 * ===================================
 */


let addInAlbum = (request, response) => {
  console.log("recieving info",request.body)
  let albumId=request.body.albumId;
  let photoId = request.body.photoId;

  //  let photos = request.body.photoArray;
  let query = "INSERT INTO photos_album (photo_id, album_id) VALUES ($1, $2)";
  let values = [photoId, albumId];
  
   pool.query(query, values, (err, result) => {
      if(!err) {
        response.send({message:"success"});
    } else {
      console.error('query error:', err.stack);
      response.status(500).send('QUERY ERROR!!!!! at createAlbum');
    }
  });
}























/**
 * ===================================
 * ALL THE PATH
 * ===================================
 */

app.get('/', homeRequest);

app.get('/photos/new', newPhotoRequest);
app.post('/photos', upload.single('photo'), addNewPhoto);
app.get('/photos', showPhotos);
app.get('/photos/:id/edit', editPhotoRequest);
app.put('/photos/:id', editPhotoPut);
app.get('/photos/:id/delete', deletePhotoRequest);
app.delete('/photos/:id', deletePhoto);
app.post('/album/addPhoto', addInAlbum);

app.get('/photos/:id', showJournal);

app.get('/album/new', newAlbumRequest);
app.post('/album', createNewAlbum);
app.get('/album', showAlbum);
app.get('/album/:id', photosInAlbumRequest);
app.get('/album/:id/delete', deleteAlbumRequest);
app.delete('/album/:id', deleteAlbum);




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);