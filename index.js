/*const Person = require('./person');

const person1 = new Person('John Doe', 30);

person1.greeting();*/

// const Logger = require("./logger");

//Express framework makes things a lot easier, but its good to understand how to do stuff
//w/o Express
const http = require('http');
const path = require('path');
const fs = require('fs');

// Overall this is inefficient as every single page we wanna add we'd have to add
// if statements and also to handle css or images, this isn't going to work
const server = http.createServer((req, res) => {
  // if (req.url === '/') {
  //   fs.readFile(
  //     path.join(__dirname, 'public', 'index.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       //add content type
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       //can put html in here
  //       res.end(content);
  //     }
  //   );
  // }

  // /*if (req.url === '/about') {
  //   fs.readFile(
  //     path.join(__dirname, 'public', 'about.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       //add content type
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       //can put html in here
  //       res.end(content);
  //     }
  //   );
  // }*/

  // // can definitely do something like this with express, but doing with node for practice
  // if (req.url === '/api/users') {
  //   // normally you fetch data from a db and serve that, but just gonna hard code in users for practice
  //   const users = [
  //     { name: 'Bob Smith', age: 40 },
  //     { name: 'John Doe', age: 30 },
  //   ];

  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify(users));
  // }

  // Build file path (want to make filepath dynamic)
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  // Extension of file (want to set content type)
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = 'text/html';

  // Check ext and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
          }
        );
      } else {
        // Some server error most likely a 500
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
