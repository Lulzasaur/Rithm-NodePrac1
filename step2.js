const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(path,'utf-8',function(err,data){
        if(err){
            console.log(err)
        } else {
        console.log(data)
        }
    })
}

function webCat(url){
    axios.get(url).then(function(resp){
        console.log(resp.data.slice(0,80),'...eof')
    }).catch(function(err){
        console.log(err)
    });
}

if(process.argv[2].startsWith('http://')){
    webCat(process.argv[2])
} else{
    cat(process.argv[2])
}

