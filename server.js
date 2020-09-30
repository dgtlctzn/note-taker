const express = require('express');

let app = express();

let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes.js')(app);
// require('./routes/apiRoutes.js')(app);

app.listen(PORT, function() {
    console.log(`app listening on PORT: ${PORT}`)
})

