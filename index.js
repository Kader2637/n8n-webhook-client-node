const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/callback', (req, res) => {
    console.log('Panggilan callback diterima:', req.body);
    res.status(200).send('Callback diterima');
  });
  

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
