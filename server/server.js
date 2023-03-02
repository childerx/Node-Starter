const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // request object
    // console.log(req.url, req.method);
    // lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => { // when we want a function to run once
        console.log("hello");
    });

    greet();
    greet();

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200; // status codes
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // redirecting (about-me to about)
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // sending an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data); we can actually ignore this and put the data arguement in the end method if and only iff we are writing one file to the browser


            res.end(data);
        }
    });


//     res.write("<head><link rel='stylesheet' href='style.css'></head>")
//     res.write("<h1>hello, fellas</h1>");
//     res.write("<p>what's popping!</p>")
//     res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

