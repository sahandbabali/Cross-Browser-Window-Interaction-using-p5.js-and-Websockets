const express = require('express');
const http = require('http'); // Node.js built-in module
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIO(server); // Attach Socket.IO to the server

const port = 3000;


let winstate = {
    "page1": { x: 0, y: 0, width: 100, height: 100 },
    "page2": { x: 0, y: 0, width: 100, height: 100 }
}


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for page1
app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'page1.html'));
});

// Route for page2
app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'page2.html'));
});



// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events from the client if needed

    // Socket.IO disconnection event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });


    socket.on('win1update', (window1, sendid) => {
        // console.log(window1)

        winstate.page1 = window1

        io.emit('getdata', winstate)

    })


    socket.on('win2update', (window2, sendid) => {
        //     console.log(window2)

        winstate.page2 = window2

        io.emit('getdata', winstate)

    })



});




server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});