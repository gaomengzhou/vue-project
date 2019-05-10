



const http = require("http");
const hostname = "0.0.0.0";
const port = 3000;

http.createServer((req,res)=>{
    if(req.url!=="/favicon.ico"){
        res.writeHead(200,{"ConTent-Type":"text/html;charset=utf8"});
        res.write("<h2>wuhan1811 Learn More about Node</h2>");
        res.write("<h2>这是我的 Node 服务器 接口 地址</h2>");
        res.end();
    }
}).listen(port,hostname,()=>{
    console.log(` My Ecs server is running  at http://${hostname}:${port}`)
})