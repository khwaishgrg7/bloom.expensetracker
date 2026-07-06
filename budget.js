const form=
document.getElementById(
"budgetForm"
);

const budgetText=
document.getElementById(
"budget"
);

const fill=
document.getElementById(
"fill"
);

const remain=
document.getElementById(
"remaining"
);



let budget=

Number(

localStorage.getItem(
"budget"
)

)||0;



function update(){


const transactions=

JSON.parse(

localStorage.getItem(
"transactions"
)

)||[];



let expense=0;



transactions.forEach(

t=>{

if(
t.type==="Expense"
){

expense+=t.amount;

}

}

);



budgetText.innerText=
`₹${budget}`;



let percent=

budget===0

?0

:

(expense/budget)
*100;



fill.style.width=
`${Math.min(
percent,
100
)}%`;



remain.innerText=

`₹${Math.max(
budget-expense,
0
)} Remaining`;



}



form.addEventListener(

"submit",

(e)=>{

e.preventDefault();

budget=

Number(

document
.getElementById(
"budgetInput"
).value

);



localStorage.setItem(

"budget",

budget

);



update();

form.reset();

}

);



update();