const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// CONNECT TO MONGODB
const dbURI = '#';
mongoose.connect(dbURI)
    // listening for requests
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs'); // view engine automatically looks in the views directory
//app.set('views', 'myviews'); this is when you put all ur views in an external folder


// middlewares & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// for accepting form data

app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
    //res.send('<p>Home page</p>'); // this automatically inserts the congtent hesder into the document unlike res.wrtie(content); we needed to type res.setHeader('Content-Type', 'text/html')...it also infers status code for us
    //res.sendFile('./views/index.html', { root: __dirname });// this reads the file to the browser, buh you need to specify the absolute path thus the root as well(in this case the directory)
    //res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
   // res.sendFile('./views/about.html', { root: __dirname });
   res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

//redirecting
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page ...it's important that this always stays down the code
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(404).render('404', { title: '404' });
});