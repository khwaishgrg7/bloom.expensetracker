const form=document.getElementById("form");
const list=document.getElementById("list");

let transactions=
JSON.parse(
localStorage.getItem(
"transactions"
)
)||[];



form.addEventListener(
"submit",

function(e){

e.preventDefault();

const transaction={

id:Date.now(),

title:
document
.getElementById("title")
.value,

amount:
Number(
document
.getElementById(
"amount"
).value
),

category:
document
.getElementById(
"category"
).value,

type:
document
.getElementById(
"type"
).value,

date:
new Date()
.toLocaleDateString()

};

transactions.push(
transaction
);

save();

render();

form.reset();

}

);



function save(){

localStorage.setItem(

"transactions",

JSON.stringify(
transactions
)

);

}



function render(){

list.innerHTML="";

let income=0;

let expense=0;



transactions
.slice()
.reverse()

.forEach(

(item)=>{

list.innerHTML+=`

<div class="item">

<div>

<b>

${item.title}

</b>

<br>

${item.category}

<br>

<small>

${item.date}

</small>

</div>

<div>

₹${item.amount}

</div>

</div>

`;

if(
item.type==="Income"
){

income+=item.amount;

}

else{

expense+=item.amount;

}

}

);



document
.getElementById(
"income"
).innerText=
`₹${income}`;

document
.getElementById(
"expense"
).innerText=
`₹${expense}`;

document
.getElementById(
"balance"
).innerText=
`₹${income-expense}`;

}



render();