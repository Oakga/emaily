const express = require('express'); //library
const app = express(); // single app of express instance

app.get('/',(request,respond) => {
    respond.send({ hi: ' there'});
});

const PORT = process.env.PORT || 5000;
app.listen(5000);

