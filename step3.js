const fs = require('fs')
const process = require('process')
const axios = require('axios')

function writeData(writeFile,data){
    fs.writeFile(writeFile,data,'utf-8',function(err){
        if(err){
            console.log(err)
            process.exit(3)
        }
    })
}

function cat(path,write){    
    fs.readFile(path,'utf-8',function(err,data){
        if(err){
            console.log(err)
            process.exit(3)
        }
        if(write){
            writeData(write,data)
        } else{
            console.log(data)
        }     
    })
}

function webCat(url,write){
    axios.get(url).then(function(resp){
        if(write){
            writeData(write,resp.data)
        } else{
            console.log(resp.data.slice(0,80),'...eof')
        }     
    }).catch(function(err){
        console.log(err)
        process.exit(3)
    });
}

if(process.argv[2]==='--out'){
    if(process.argv[4].startsWith('http://')){
        webCat(process.argv[4],process.argv[3])
    } else{
        cat(process.argv[4],process.argv[3])
    }
} else if(process.argv[2].startsWith('http://')){
    webCat(process.argv[2])
} else{
    cat(process.argv[2])
}


