
    // 01 require the http module
    const http = require('http');
    const fs = require('fs'); // 02 require the filesystem module
    const path = require('path'); // 03 require the path module

    const port = 3000 // 04 specify the port number

    // 05 create a server object using the http module
    const server = http.createServer((req, res) => { // 08 create a arrow function to add functions to the server object
        // 09 if request url is a slash, send the index.html file
        const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url); // 10 get the file path

        // 11 get the file extension
        const extName = String(path.extname(filePath)).toLowerCase();

        // 12 mention supported file types
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'font/woff',
            '.ttf': 'font/ttf',
        }
        
        // 13 if the file type is not the supported type we listed, set the content type to application/octet-stream
        const contentType = mimeTypes[extName] || 'application/octet-stream'; 

        // 14 read the file
        fs.readFile(filePath, (err, content) => { // 15 create a callback function to read the file
            if (err) { // Check if there's any error
                if (err.code === 'ENOENT') { // 20 if error code is ENOENT means content not found
                    // 21 send a 404 error
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end('<h1>404 Not Found ;(</h1>');
                } else {
                    // Handle other types of errors
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('<h1>500 Internal Server Error</h1>');
                }
                return;
            }
            
            // 17 if there is no error
            // 18 send the file head part
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8'); // 19 send the file content/body part
        });
    });
    
    // 06 create a function to handle incoming requests
    server.listen(port, () => {
        // 07 print a message to the console
        console.log(`server is listening on port ${port}`);
    })