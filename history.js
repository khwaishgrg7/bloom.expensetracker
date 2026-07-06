const box =
document.querySelector(
".transactions"
);

let transactions =

JSON.parse(
localStorage.getItem(
"transactions"
)

)||[];



function save(){

localStorage.setItem(

"transactions",

JSON.stringify(
transactions
)

);

}



function remove(id){

transactions=

transactions.filter(

t=>t.id!==id

);

save();

showData();

}



function edit(id){

const item=

transactions.find(
t=>t.id===id
);



const title=

prompt(
"Edit title",
item.title
);

if(
title===null
)
return;



const amount=

prompt(
"Edit amount",
item.amount
);

if(
amount===null
)
return;



item.title=
title;

item.amount=
Number(
amount
);



save();

showData();

}



function showData(){

box.innerHTML="";



if(
transactions.length===0
){

box.innerHTML=`

<div class="box">

No transactions

</div>

`;

return;

}



transactions
.slice()
.reverse()

.forEach(

(item)=>{

box.innerHTML+=`

<div class="box">

<div>

<h3>

${item.title}

</h3>

<p>

${item.category}

</p>

<small>

${item.date}

</small>

</div>



<div>

<h3>

₹${item.amount}

</h3>



<div class="actions">

<button

onclick="edit(${item.id})"

class="edit">

Edit

</button>



<button

onclick="remove(${item.id})"

class="delete">

Delete

</button>

</div>

</div>

</div>

`;

}

);

}



showData();