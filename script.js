let sum = 0;
let editRow = null;
let oldAmount = 0;

const n = document.getElementById("n");
const a = document.getElementById("a");
const c = document.getElementById("c");
const d = document.getElementById("d");
const te = document.getElementById("te");
const tb = document.getElementById("tb");
const ae = document.getElementById("ae");

function clearInputs() {
    n.value = "";
    a.value = "";
    c.selectedIndex = 0;
    d.value = "";
}

function updateTotal() {
    te.textContent = sum;
}

ae.addEventListener("click", () => {

    if (
        n.value.trim() === "" ||
        a.value.trim() === "" ||
        d.value === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const amount = Number(a.value);

    if (amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    // ================= UPDATE =================

    if (editRow !== null) {

        editRow.children[0].textContent = n.value;
        editRow.children[1].textContent = amount;
        editRow.children[2].textContent = c.value;
        editRow.children[3].textContent = d.value;

        sum = sum - oldAmount + amount;

        updateTotal();

        editRow = null;
        oldAmount = 0;

        ae.textContent = "Add Expense";

        clearInputs();

        return;
    }

    // ================= ADD NEW ROW =================

    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    td1.textContent = n.value;
    td2.textContent = amount;
    td3.textContent = c.value;
    td4.textContent = d.value;

    // ================= EDIT BUTTON =================

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {

        n.value = td1.textContent;
        a.value = td2.textContent;
        c.value = td3.textContent;
        d.value = td4.textContent;

        editRow = tr;
        oldAmount = Number(td2.textContent);

        ae.textContent = "Update Expense";

        n.focus();
    });

    // ================= DELETE BUTTON =================

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {

        sum -= Number(td2.textContent);

        updateTotal();

        if (editRow === tr) {

            editRow = null;
            oldAmount = 0;
            ae.textContent = "Add Expense";
            clearInputs();

        }

        tr.remove();

    });

    td5.appendChild(editBtn);
    td5.appendChild(deleteBtn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tb.appendChild(tr);

    sum += amount;

    updateTotal();

    clearInputs();

});