"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.logout = exports.deletePost = exports.editPost = exports.createPost = exports.addPost = exports.dashboard = exports.protect = exports.register = exports.login = void 0;
var catchAsync_js_1 = require("../utils/catchAsync.js");
var User_js_1 = require("../models/User.js");
var dotenv = require("dotenv");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Post_js_1 = require("../models/Post.js");
dotenv.config();
var jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT Secret not provided');
}
var signToken = function (id) {
    return jwt.sign({ id: id }, jwtSecret, {
        expiresIn: '90d',
    });
};
var login = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, password, user, isPasswordValid, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                console.log('Request: ', req.body);
                _a = req.body, userName = _a.userName, password = _a.password;
                return [4 /*yield*/, User_js_1.default.findOne({ userName: userName })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(400).json({ message: 'Invalid credentials', success: false });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                isPasswordValid = _b.sent();
                console.log('User Found:', user);
                if (!isPasswordValid) {
                    res.status(400).json({ message: 'Invalid credentials', success: false });
                    return [2 /*return*/];
                }
                token = signToken(user._id.toString());
                res.cookie('token', token, {
                    httpOnly: true,
                });
                res.json({
                    message: 'Form data recieved successfully',
                    userName: user.userName,
                    token: token,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({
                    message: 'Internal server error',
                    messageBody: error_1 instanceof Error ? error_1.message : error_1,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.login = login;
// const checkLogin = catchAsync()
var register = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, password, hashedPass, user, token, error_2, mongoError, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, userName = _a.userName, password = _a.password;
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 1:
                hashedPass = _b.sent();
                console.log('Request: ', req.body);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, User_js_1.default.create({
                        userName: userName,
                        password: hashedPass,
                    })];
            case 3:
                user = _b.sent();
                token = signToken(user._id.toString());
                res.status(201).json({
                    message: 'Register data recieved successfully',
                    userName: userName,
                    password: password,
                    user: user,
                    token: token,
                });
                console.log('Register data recieved successfully', userName, password, user, token);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                mongoError = error_2;
                if (mongoError.code === 11000) {
                    res.status(400).json({ message: 'User already exists' });
                }
                res.status(500).json({ message: 'Internal server error' });
                console.error(mongoError);
                return [3 /*break*/, 5];
            case 5:
                res.json({
                    message: 'Register data recieved successfully',
                    userName: userName,
                    password: password,
                });
                console.log("user:".concat(userName, "  password:").concat(password));
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                console.error(error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.register = register;
var dashboard = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_js_1.default.find()];
            case 1:
                posts = _a.sent();
                res.json({
                    message: 'Dashboard data',
                    posts: posts,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.dashboard = dashboard;
var protect = (0, catchAsync_js_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, currentUser, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    res
                        .status(403)
                        .json({ message: 'You are not logged in', success: false });
                    return [2 /*return*/];
                }
                decoded = jwt.verify(token, jwtSecret);
                return [4 /*yield*/, User_js_1.default.findById(decoded.id)];
            case 1:
                currentUser = _b.sent();
                if (!currentUser) {
                    res.status(403).json({
                        message: ' The user belonging to this token no longer exist',
                        success: false,
                    });
                    return [2 /*return*/];
                }
                req.user = currentUser;
                next();
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(403).json({ message: 'Invalid token. Please Login' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.protect = protect;
// Create new posts
var addPost = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    return __generator(this, function (_a) {
        try {
            posts = Post_js_1.default.find();
            res.json(200).json({
                posts: posts,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); });
exports.addPost = addPost;
//Create new post
var createPost = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, body, newPost, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, body = _a.body;
                console.log('Title:', title);
                console.log('Title:', body);
                return [4 /*yield*/, Post_js_1.default.create({ title: title, body: body })];
            case 1:
                newPost = _b.sent();
                res.status(201).json({
                    message: 'Post created successfully',
                    post: newPost,
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                console.error(error_6);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.createPost = createPost;
var editPost = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, body, updatedPost, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, title = _a.title, body = _a.body;
                return [4 /*yield*/, Post_js_1.default.findByIdAndUpdate(id, {
                        title: title,
                        body: body,
                        updatedAt: Date.now(),
                    }, { new: true, runValidators: true })];
            case 1:
                updatedPost = _b.sent();
                if (!updatedPost) {
                    res.status(404).json({ message: 'Post not found' });
                }
                res.status(201).json({
                    message: 'Post created successfully',
                    post: updatedPost,
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                console.error(error_7);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.editPost = editPost;
var deletePost = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Post_js_1.default.findByIdAndDelete(id)];
            case 1:
                post = _a.sent();
                if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                }
                res.status(200).json({ message: 'Post deleted successfully' });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error(error_8);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.deletePost = deletePost;
var logout = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                sameSite: 'strict',
            });
            res.status(200).json({ message: 'Logged out successfully', success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); });
exports.logout = logout;
var getUsers = (0, catchAsync_js_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        try {
            users = req.user;
            if (!users) {
                res.status(404).json({ message: 'User not found' });
            }
            // const users = await User.find().select('-password');
            res.status(200).json({ message: 'User fetched successfully', users: users });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); });
exports.getUsers = getUsers;
