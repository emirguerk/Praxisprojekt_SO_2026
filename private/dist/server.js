"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const server = (0, express_1.default)();
server.use(express_1.default.static(path_1.default.join(__dirname, "../../public")));
const key = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../private/cert", "localhost.key"));
const cert = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../private/cert", "localhost.crt"));
const options = {
    key: key,
    cert: cert,
};
server.get("/manifest/download", (req, res) => {
    const manifestPath = path_1.default.join(__dirname, "../../public", "manifest/word-online-manifest.xml");
    res.download(manifestPath, "word-online-manifest.xml");
});
https_1.default.createServer(options, server).listen(3000, () => {
    console.log("Server is running on https://localhost:3000");
});
