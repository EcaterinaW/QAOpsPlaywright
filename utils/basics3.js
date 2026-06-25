const Person = require('./basics5');

function add(a,b)
{
    return a+b
}

let sum = add(2,3);
// console.log(sum);

let sumOfIntegeres = function(c,d)
{
    return c+d
}

let sumOfNumbers = (c,d)=> c+d;
// console.log(sumOfNumbers(2,3));

let day = "tuesday ";
console.log(day.length);
let subDay = day.slice(0,4);
console.log(subDay);
console.log(day[1]);
let splitDay = day.split('s');
console.log(splitDay[1].length);
console.log(splitDay[1].trim().length);

let date = '23';
let nextDate = '27';
let diff = parseInt(nextDate) - parseInt(date);
console.log(diff);
diff.toString();

let newQuote = day+"is Funday day";
console.log(newQuote);

let val = newQuote.indexOf("day",5);
console.log(val);

let count = 0;
let value = newQuote.indexOf("day");
while(value!== -1)
{
    count++
    value = newQuote.indexOf("day",value+1);

}
console.log(count);

let person = new Person("Chris","Edward");
console.log(person.fullName());




