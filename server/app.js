const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const routes = require("./routes.js");
const cloudinary = require('cloudinary');

let app = express();
exports.app = app;
app.set('port', 1128)
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use('/', routes);

app.listen(app.get('port'), ()=>{
  console.log(`listening port: ${app.get('port')}`);
})