"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000);
