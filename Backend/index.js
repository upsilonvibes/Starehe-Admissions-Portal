const express = require('express');
const cors = require('cors'); // 1. Import CORS
const app = express();
const PORT = 5000;

app.use(cors()); // 2. Tell the app to use it
app.use(express.json()); // 3. Allow the app to read JSON data (very important!)

app.get('/', (req, res) => {
    res.json({ message: "Backend Online! 🚀" });
});

// A new "Route" for the Frontend to call later
app.get('/api/status', (req, res) => {
    res.json({ message: "Connection Successful!  Hola, React. Me llamo Backend" });
});

app.listen(PORT, () => {
    console.log(`✅ Server is live at http://localhost:${PORT}`);
});