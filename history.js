const box = document.querySelector(".transactions");

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function save() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function remove(id) {

    if (!confirm("Are you sure you want to delete this transaction?")) {
        return;
    }

    transactions = transactions.filter(t => t.id !== id);

    save();

    showData();
}

function edit(id) {

    const item = transactions.find(t => t.id === id);

    const title = prompt("Edit title", item.title);

    if (title === null) return;

    const amount = prompt("Edit amount", item.amount);

    if (amount === null) return;

    item.title = title;
    item.amount = Number(amount);

    save();

    showData();
}

function showData() {

    box.innerHTML = "";

    let filtered = [...transactions];

    // SEARCH
    const search = searchInput.value.toLowerCase().trim();

    if (search !== "") {

        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(search) ||
            item.category.toLowerCase().includes(search)
        );

    }

    // FILTER
    const type = filterSelect.value;

    if (type !== "All") {

        filtered = filtered.filter(item => item.type === type);

    }

    if (filtered.length === 0) {

        box.innerHTML = `
            <div class="box">
                <h3>No transactions found</h3>
            </div>
        `;

        return;
    }

    filtered
        .slice()
        .reverse()
        .forEach(item => {

            box.innerHTML += `

            <div class="box">

                <div>

                    <h3>${item.title}</h3>

                    <p>${item.category}</p>

                    <small>${item.date}</small>

                </div>

                <div>

                    <h3>₹${item.amount}</h3>

                    <div class="actions">

                        <button
                            class="edit"
                            onclick="edit(${item.id})">
                            Edit
                        </button>

                        <button
                            class="delete"
                            onclick="remove(${item.id})">
                            Delete
                        </button>

                    </div>

                </div>

            </div>

            `;

        });

}

// Search while typing
searchInput.addEventListener("input", showData);

// Filter on selection
filterSelect.addEventListener("change", showData);

// Initial Load
showData();