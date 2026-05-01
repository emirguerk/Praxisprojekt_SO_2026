import express  from "express"
import path from "path"
import https from "https"
import fs from "fs"

const server = express()

server.use(express.static(path.join(__dirname, "../../public")))

const key = fs.readFileSync(path.join(__dirname, "../../private/cert", "localhost.key"))
const cert = fs.readFileSync(path.join(__dirname, "../../private/cert", "localhost.crt"))

const options = {
  key: key,
  cert: cert,
};

server.get("/manifest/download", (req, res) => {
  const manifestPath = path.join(__dirname,"../../public", "manifest/word-online-manifest.xml");
  res.download(manifestPath, "word-online-manifest.xml");
})

https.createServer(options, server).listen(3000, () => {
  console.log("Server is running on https://localhost:3000");
});