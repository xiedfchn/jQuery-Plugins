var http=require("http"),
	fs=require("fs"),
	url = require('url');
http.createServer(function(req,res){
	// res.writeHead(200,{'Content-Type':'text/html'});
	var requestUrl = req.url;
	var pathName = url.parse(requestUrl).pathname;
	console.log(pathName);
	if (pathName==='/') {
		pathName='./index.html';	
	}else{
		pathName='.'+pathName;
	}
	fs.readFile(pathName,function(err,data){
	if (err) {
		res.end("404 NOT FOUND")
	}
	if (data) {
		res.write(data);	
		res.end();	
	}
	res.end("404 NOT FOUND");
		
	})
	
}).listen(3000);
console.log("sever started");