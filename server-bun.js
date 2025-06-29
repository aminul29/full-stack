
    // 01 Import the built-in HTTP module
    import {serve} from 'bun';

    // 02 start the bun server
    serve({
        fetch(request){ // 03 fetch is a request handler
            const url = new URL(request.url); // 04 get the url from the request
            if(url.pathname === '/'){ // 05 if the url is /
                return new Response('Hello World From Bun Server', {status: 200}); // 06 return a response
            }else if(url.pathname === '/ice-tea'){ // 07 if the url is /
                return new Response('Hello Ice Tea', {status: 200}); // 08 return a response
            }else{ // 09 if nothing found
                return new Response('Not Found', {status: 404}); 
            }
        }, 
        port: 3000,
        hostname: '127.0.0.1'
    });