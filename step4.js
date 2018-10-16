const fs = require('fs')
const process = require('process')
const axios = require('axios')
var data;

function writeData(writeFile,data){
    fs.writeFile(writeFile,data,'utf-8',function(err){
        if(err){
            console.log(err)
            process.exit(3)
        }
    })
}

function cat(path,write){    
    fs.promises.readFile(path)
    .then(data => {
        if(write){
            writeData(write,data)
        } else{
            console.log(data)
        } 
    })
    .catch(err => {
        console.log(err)
        process.exit(3)
    }) 
}

async function cat(path,write){    

    try{
        data = await fs.promises.readFile(path)
        
        if(write){
                writeData(write,data)
        } else{
                console.log(data)
        } 
    } catch(err){
            console.log(err)
            process.exit(3)
    }
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


