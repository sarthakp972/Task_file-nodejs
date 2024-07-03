const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get('/', function (req, res) {
    const filesDir = path.join(__dirname, 'files');
    
    // Check if the "files" directory exists
    if (!fs.existsSync(filesDir)) {
        return res.status(404).send('Files directory not found');
    }
    
    // Read the "files" directory
    fs.readdir(filesDir, function (err, files) {
        if (err) {
            console.error('Error reading files directory:', err);
            return res.status(500).send('Internal Server Error');
        }
        
        // Render the "index" view with the list of files
        res.render("index", { files: files });
    });
});
// 
app.post('/create',function(req,res){
fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
res.redirect("/")
});
})
// Start the server on port 3000
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
