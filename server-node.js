
    // 01 Import the built-in HTTP module
    const http = require('http'); 

    // 02 hostname and port configuration
    const hostname = '127.0.0.1';
    const port = 3000;

    // 03 create the server
    const server = http.createServer((req, res) => { // 04 create a request and a response arrow function
        // 05 send the response
        if (req.url === '/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World\n');
        }else if(req.url === '/ice-tea'){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello Ice Tea\n');
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not Found\n');
        }
    });

    // 06 start the server
    server.listen(port, hostname, () => {
        console.log(`Server is running at http://${hostname}:${port}/`);
    });