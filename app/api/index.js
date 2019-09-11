// Use express
const express = require('express');
// Connect to api
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Api is here!');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));