const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // Port khác backend

app.use(express.static(path.join(__dirname, '.'))); // Serve file tĩnh từ thư mục hiện tại

app.listen(port, () => {
    console.log(`Frontend server running at http://localhost:${port}`);
});