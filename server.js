const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 3000


http.createServer((req,res)=>{

    let file = "index.html"


    if(req.url === "/sobre.html"){
        file = "sobre.html"
    }


    if(req.url === "/style.css"){
        file = "style.css"
    }


    if(req.url.startsWith("/assets/")){
        file = req.url
    }


    const filePath =
    path.join(__dirname,file)


    fs.readFile(filePath,(err,data)=>{

        if(err){

            res.writeHead(404)

            return res.end("404")

        }


        let type = "text/html"


        if(file.endsWith(".css")){
            type = "text/css"
        }


        if(
            file.endsWith(".jpg")
        ){
            type = "image/jpeg"
        }


        res.writeHead(200,{
            "Content-Type":type
        })


        res.end(data)

    })


}).listen(PORT,()=>{

    console.log(
    "VALK online http://localhost:3000"
    )

})