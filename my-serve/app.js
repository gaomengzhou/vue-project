

var express = require("express");

var app = express();  // http 封装 基本语法   router.get  app 包含 Router()

var hostname = "0.0.0.0";

var port = 3000;

app.use(express.json());    // 接收 POST 参数  req.body  req.query  $.post 
app.use(express.urlencoded({ extended: false })); // 表单提交method="POST"

// 处理跨域方法   CORS 处理方式 
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

app.get("/",(req,res)=>{
    res.send("这是前后端分类的项目 接口 ")
})

app.get("/demo",(req,res)=>{
    res.json({
        msg:"数据请求成功..demo",
        code:200
    })
})

app.all("/msg",(req,res)=>{
    res.json({
        msg:"接收信息成功...",
        code:200,
        query:req.query
    })
})

var vue = require("./vue");
app.use("/vue",vue);  // 注册路由模块





app.listen(port,hostname,()=>{
    console.log(` My Project Server is running  at http://${hostname}:${port}`);
})