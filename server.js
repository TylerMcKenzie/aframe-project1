const http = require("http");
const fs = require("fs");
const path = require("path");

const fetchJs = (req, res, file) => {
	fs.readFile("./build" + file, (err, data) => {
		if(err) {
			res.writeHead(404);
			res.write("Not Found!");
		} else {
			res.writeHead(200, {"Content-type": "application/javascript"});
			res.write(data);
		}
		res.end();
	})
}

const server = http.createServer((req, res) => {
	console.log("Request:");
	console.log(req.url);
	
	if(req.url == "/") {
		fs.readFile("index.html", (err, data) => {
			console.log("Reading index...");
			res.writeHead(200, {"Content-type": "text/html"});
			res.write(data);
			res.end();
		});
	} else {
		if(/.*\.js$/.test(req.url.toString())) {
			fetchJs(req, res, req.url);
		} else {
			fs.readFile(file, (err, data) => {
				if(err) {
					res.writeHead(404);
					res.write("Not Found!");
				} else {
					// LAZY STUFF HERE
					res.write(data);
				}
				res.end();
			})
		}
	}
});

server.listen(3000)