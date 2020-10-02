const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

app.listen(PORT, function() {
    console.log(`app listening on PORT: ${PORT}`)
})

