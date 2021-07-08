/*
    regular_expression

    memo
    (?:  )  - non capture group
    [a-z]  - lowercase alph
    [A-Z]  - uppercase alph 
    \d  - number
    \D  - not number only
    default
    {
        var text = "";
        const regEx = //;
        console.log('=== regular_exp test ==>> \' (key) \'');
        console.log('regEx : '+regEx); 
    }
*/

if(false)
{
    var text = "123";
    const regEx = /1?3/;
    console.log('=== regular_exp test ==>> \' ? \'');
    console.log('regEx : '+regEx);
    console.log(text+" : "+regEx.test(text));
    console.log('1223'+" : "+regEx.test('1223'));
    console.log('122'+" : "+regEx.test('122'));
}

if(false)
{
    var text = "123";
    const regEx = /\D/;
    console.log('=== regular_exp test ==>> \' \\D \'');
    console.log('regEx : '+regEx);
    console.log(text+" : "+regEx.test(text));
    text = 'abc'
    console.log(text+" : "+regEx.test(text)); 
    text = 'abc1'
    console.log(text+" : "+regEx.test(text)); 
    text = '1abc'
    console.log(text+" : "+regEx.test(text)); 
}

if(false) 
{
    var text = "123";
    const regEx = /\d/; //return true by including only one decimal
    console.log('=== regular_exp test ==>> \'\\d\'');
    console.log('regEx : '+regEx);
    console.log(text+" : "+regEx.test(text));
    console.log(text+'a'+" : "+regEx.test(text+'a'));
    console.log('abc'+" : "+regEx.test('abc'));



}

if(false)
{
    var text = "123";
 //   const regEx = /123../;
    const regEx = /1..45/;
    console.log('=== regular_exp test ==>> \'.\'');
    console.log('regEx : '+regEx);
    console.log(text+" : "+regEx.test(text));
    console.log(text+'4'+" : "+regEx.test(text+'4'));
    console.log(text+'345'+" : "+regEx.test(text+'345'));
    console.log(text+'45'+" : "+regEx.test(text+'45'));
}

if(false)
{
var text = "123";
const regEx = /123./;
console.log('=== regular_exp test ==>> \'.\'');
console.log('regEx : '+regEx);
console.log(text+" : "+regEx.test(text));
console.log(text+'4'+" : "+regEx.test(text+'4'));
}
