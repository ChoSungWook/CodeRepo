
const dataQMaxSize = 1000;
var dataQ = new Array();
exports.postData = function(req,res){
    console.log("[postData] recieve data");
    if(req.body)
        console.log(req.body);
    if(dataQ.length > dataQMaxSize)
        res.status(400).send('data queue is busy');
    else{
        dataQ.push(req.body);
        res.status(200).send('success');
    }
}


exports.getData = function(req,res){
    console.log("[getData] send data");
    if(dataQ.length <= 0)
        res.status(400).send('');
    else if(dataQ.length <= 10){
        res.status(200).send(dataQ);
        dataQ=new Array();
    }
    else
    {
        var temp = new Array();
        for(var i=0;i<10;++i)
        {
            temp.push(dataQ.pop());
        }
        res.status(200).send(temp);
    }
}