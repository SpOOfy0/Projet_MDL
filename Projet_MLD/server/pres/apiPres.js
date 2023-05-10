const express = require('express');
const business = require('../business/business');

// Create a new Express application
const app = express();

// Import and use the CORS middleware to enable cross-origin requests
var cors = require('cors')
app.use(cors()); 

// Define an object to hold all of the API server's functionality
const apiServ = {
    
    // Method to start the server and listen on a given port
    start : function(port) {

        // Use the JSON body parser middleware to parse request bodies as JSON
        app.use(express.json()); 
        
        // Define a route to retrieve all clients and return them as a JSON response
        app.get('/api/clients/all', (req,res) => {   
            const clients = business.getAllClients();
            res.status(200).json(clients);
        })

        // Define a route to retrieve a page of clients with a given number and page index
        app.get('/api/clients', (req,res) => {   
            const number = req.query.number;
            const page = req.query.page;
            const clients = business.getClients(number, page);
            res.status(200).json(clients);
        })

        // Define a route to add a new user to the Jsonfile
        app.post('/api/clients', (req, res) => {
            let message = business.addUser(req.body);
            res.status(200).send(message);
        })
        
        // Define a route to update an existing user in the Jsonfile
        app.put('/api/clients/all', (req, res) => {
            let message = business.updateUser(req.body);
            res.status(200).send(message);
        })

        // Define a route to delete a user from the Jsonfile
        app.delete('/api/clients', (req, res) => {
            const client_id = req.query.id;
            let message = business.removeUser(client_id);
            res.status(200).send(message);
        })
        
        // Start listening on the specified port
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        }) 
    }
};


// Export the API server object for use in other modules
module.exports = apiServ;
