// const fs = require('fs');
import fs from "fs";
import http from "http";

//1. create folder
// fs.mkdirSync('mateen');

//2. create file
// fs.writeFileSync('mateen/ali.js',"hello everyone");

//3. add more data to file
// fs.appendFileSync('mateen/ali.txt',', How are you?');

//4. read the file
// const data1 = fs.readFileSync('mateen/ali.txt');
// if we console just data we get buffer data
// console.log(data1);// buffer data
// const data2 = fs.readFileSync('mateen/ali.txt',{encoding:'utf-8'});
// console.log(data2);

//5. Rename file
// fs.renameSync('mateen/ali.txt','mateen/cool.txt');

//6. Delete file
// fs.unlinkSync('mateen/ali.pdf');

//7. Delete Folder
// fs.rmdirSync('mateen')


//creating over own server
const server = http.createServer((req,res)=>{
    console.log(req.url);
    if (req.url == '/') {
        res.end('Hello Guys, My Name Is Mohammed Mateen');
    }else if(req.url == '/about') {
        res.end('About');
    }else{
        res.writeHead(404);
        res.end('404 Not Found');

    }
});

server.listen(8000,"127.0.0.1",()=>{
    console.log('listening to 8000')
});  

