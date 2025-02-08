const express = require('express');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Jai kara sherawali da bol saache darbar ki Jai!✨');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});