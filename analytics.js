const transactions=

JSON.parse(

localStorage.getItem(
"transactions"
)

)||[];



let income=0;

let expense=0;

let categoryData={};



transactions.forEach(

(item)=>{

if(
item.type==="Income"
){

income+=item.amount;

}

else{

expense+=item.amount;



if(

categoryData[
item.category
]

){

categoryData[
item.category
]+=item.amount;

}

else{

categoryData[
item.category
]=item.amount;

}

}

}

);



document
.getElementById(
"income"
)
.innerText=
`₹${income}`;



document
.getElementById(
"expense"
)
.innerText=
`₹${expense}`;



document
.getElementById(
"balance"
)
.innerText=
`₹${income-expense}`;





new Chart(

document
.getElementById(
"pieChart"
),

{

type:"doughnut",

data:{

labels:

Object.keys(
categoryData
),

datasets:[{

data:

Object.values(
categoryData
),

backgroundColor:[

"#E7D7C9",

"#D4B499",

"#B79B83",

"#8D6E63",

"#6B554D"

]

}]

}

}

);





new Chart(

document
.getElementById(
"barChart"
),

{

type:"bar",

data:{

labels:[

"Income",

"Expense"

],

datasets:[{

data:[

income,

expense

],

backgroundColor:[

"#C5A58D",

"#856E61"

],

borderRadius:20

}]

},

options:{

plugins:{

legend:{

display:false

}

}

}

}

);