//////////////////////////////////////////////////////////////////
/*
    Question
        입력할 개수와 숫자, 연산자(+,-,*,/)를 입력받고 연산자를 모든 경우의 수로 배치하여
        최대, 최소 결과를 출력한다. (- 연산자는 순서별로 연산자 개수만 표시)
    input :
        line1 : the number of Number
        line2 : Number
        line3 : Operation (size : line2 - 1)
    output :
        line1 : max result
        line2 : min result
    instead of real output : "max : m,min : n"

    ex)
    input :
        line1 : 2
        line2 : 5 6
        line3 : 0 0 1 0  <- * : 1
    output:
        max: 30,min: 30
*/
//////////////////////////////////////////////////////////////////
/* swap Array[i], Array[j] */
function swap(arr,i,j)
{
    if(arr[i]===arr[j])
        return false;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    return true;
}
/* compare array value */
function compare(arr,arr2)
{
    if(arr.length === arr2.length)
    {
        var i = 0;
        for(i=0;i<arr.length;++i)
        {
            if((arr[i]===arr2[i])== false)
                return false;
        }
        return true;
    }
    else
    {
        console.log("Each Length is different")
        return;
    }
}
/* operate number and return result */
function operate(numArray,opArray)
{
    var i = 0;
    var result = numArray[0];
    for(i=0;i<opArray.length;++i)
    {
        switch(opArray[i])
        {
            case 0:
                result += numArray[i+1];
                break;
            case 1:
                result -= numArray[i+1];
                break;
            case 2:
                result *= numArray[i+1];
                break;
            case 3:
                if(numArray[i+1]==0)
                    result = 0;
                else
                    result = Math.floor(result/numArray[i+1]);
                break;
        }
    }
    return result;
}
/* JS input console */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var sum = 0;
var num = 5;
var numArray = new Array();
var opArray = new Array();
var inputCount = 0;
var oparr = new Array();
var first_arr = new Array();

var min_result;
var max_result;

/* JS input console */
rl.on("line", function(line) {
    ++inputCount;
    var i = 0; 
    switch(inputCount)
    {
        case 1:
            num = line.split(' ')[0];
            num = Number(num);
            break;
        case 2:
            numArray = line.split(' ');
            for(i in numArray){numArray[i]=Number(numArray[i]);}
            break;
        case 3:
            opArray = line.split(' ');
            for(i in opArray){opArray[i]=Number(opArray[i]);}
            break;
    }
     if(inputCount == 3)
        rl.close();
}).on('close',function(){
    /* End input and main function */

    
    var i = 0;
    var j = 0;
    
    for(i=0;i<4;++i)
    {
        sum = sum + opArray[i];
        for(j=0;j<opArray[i];++j){
            oparr.push(i);
        }
    }
    first_arr=oparr.slice();

    if( sum !== num-1)
        console.log('err['+sum+','+(num-1)+']');

    var idx = -1;
    console.log(oparr);
    do{
        
        idx = (idx + 1) % (oparr.length-1);
        result = operate(numArray,oparr);
        if(min_result==null)
            min_result = result
        else
            min_result = (min_result>result)? result : min_result;
            
        if(max_result==null)
            max_result = result
        else
            max_result = (max_result<result)? result : max_result;

        if(swap(oparr,idx,(idx+1)%oparr.length) == false)
            continue;
        // console.log("min : "+min_result + ", max : "+max_result);
        
    }while(!compare(first_arr,oparr));

    console.log("min : "+min_result + ", max : "+max_result);



    process.exit();
});


