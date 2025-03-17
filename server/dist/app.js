"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express_1 = require("express");
var cors_1 = require("cors");
var express_ejs_layouts_1 = require("express-ejs-layouts");
var main_js_1 = require("./server/routes/main.js");
var admin_js_1 = require("./server/routes/admin.js");
var db_js_1 = require("./server/config/db.js");
var cookie_parser_1 = require("cookie-parser");
var connect_mongo_1 = require("connect-mongo");
var express_session_1 = require("express-session");
var morgan_1 = require("morgan");
dotenv.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.use((0, cors_1.default)());
var corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)(corsOptions));
app.use(express_ejs_layouts_1.default);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGODB_URI }),
}));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
(0, db_js_1.default)();
app.set('view engine', 'ejs');
app.use('/v1/api', main_js_1.default);
app.use('/v1/api', admin_js_1.default);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
