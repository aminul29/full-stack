
    // 01 require the filesystem module
    const fs = require('fs');
    const os = require('os'); // 02 require the operating system module

    const EventEmitter = require('events'); // 03 require the events module

    // 04 create a class that extends the EventEmitter class
    class Logger extends EventEmitter {

        // 05 create a method that logs a message
        // it sends a notification to any listeners that are listening for the message event, passing the message object as an argument.
        log(message){
            // 06 print the message to the console
            this.emit('message', {message});
        }
    } 

    const logger = new Logger(); // 07 create a new instance of the Logger class
    const logFile = './eventlog.txt'; // 08 specify the log file path for saving logs

    // 09 create a function that logs a message to the log file
    const logToFile = (event) => {
        const logMessage = `${new Date().toISOString()} - ${event.message}\n`; // 10 get the current date and time and the message from the event object
        fs.appendFileSync(logFile, logMessage); // 11 append the log message to the log file
    }

    // 12 add a listener to the message event
    logger.on('message', logToFile);

    // 13 execute the code continuously every 3 seconds
    setInterval(() => {
        // 14 get the memory usage
        const memoryUsage = (os.freemem() / os.totalmem()) * 100;
        logger.log(`Memory usage: ${memoryUsage.toFixed(2)}%`);
    }, 3000);

    // 15 execute the code
    logger.log('Application started');
    logger.log('Application Event Occured');