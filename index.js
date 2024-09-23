const http = require('http');
const fs = require('fs');
const path = require('path');

// File paths
const dataDirectory = path.join(__dirname, 'data');
const shoppingListFile = path.join(dataDirectory, 'shopping-list.json');

// Utility function to initialize the JSON file
function initializeFile() {
    if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory);
    }
    if (!fs.existsSync(shoppingListFile)) {
        fs.writeFileSync(shoppingListFile, JSON.stringify([]));
    }
}

// Read the shopping list from the JSON file
function readShoppingList() {
    const data = fs.readFileSync(shoppingListFile);
    return JSON.parse(data);
}

// Write to the JSON file
function writeShoppingList(data) {
    fs.writeFileSync(shoppingListFile, JSON.stringify(data, null, 2));
}

// REST API - Handle shopping list CRUD
const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/shopping-list') {
        // Handle GET request
        if (method === 'GET') {
            const shoppingList = readShoppingList();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(shoppingList));
        }

        // Handle POST request (Add item to list)
        else if (method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const newItem = JSON.parse(body);
                const shoppingList = readShoppingList();
                shoppingList.push(newItem);
                writeShoppingList(shoppingList);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newItem));
            });
        }

        // Handle PUT request (Update an item in the list)
        else if (method === 'PUT' || method === 'PATCH') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const updatedItem = JSON.parse(body);
                const shoppingList = readShoppingList();
                const index = shoppingList.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    shoppingList[index] = updatedItem;
                    writeShoppingList(shoppingList);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updatedItem));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Item not found' }));
                }
            });
        }

        // Handle DELETE request (Remove item from list)
        else if (method === 'DELETE') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { id } = JSON.parse(body);
                let shoppingList = readShoppingList();
                const filteredList = shoppingList.filter(item => item.id !== id);
                if (shoppingList.length !== filteredList.length) {
                    writeShoppingList(filteredList);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Item deleted' }));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Item not found' }));
                }
            });
        }

        // Method not supported
        else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

// Initialize JSON file and start the server
initializeFile();

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
