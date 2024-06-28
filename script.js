// localStorage.clear();
console.log("working");
const form = document.querySelector(".form");
const listContainer = document.querySelector("#list-container");
const inc = document.querySelector("#plus");
const exp = document.querySelector("#minus");
const totalBalance = document.querySelector("#totalBalance");
const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const options = document.querySelector("#options");

let income = 0;
let balance = 0;
let expense = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const amountValue = parseFloat(amount.value);
  if (description && options && !isNaN(amount.value)) {
    let item = document.createElement("tr");
    item.innerHTML = `<td>${description.value}</td>
                        <td>${options.value}</td>
                        <td>${amountValue}</td>`;
    listContainer.appendChild(item);
    if (amount.value[0] === "-") {
      expense += amountValue;
      item.style.borderRight = "2px solid red";
    } else {
      income += amountValue;
    }
    balance = income - expense * -1;

    inc.textContent = `₹${income.toFixed(2)}`;
    exp.textContent = `₹${expense.toFixed(2)}`;
    totalBalance.textContent = `₹${balance.toFixed(2)}`;
    description.value = "";
    amount.value = "";
    options.value = "";
    saveData();
  } else {
    alert("Fill all the input fields!!");
  }
});

function saveData() {
  localStorage.setItem("expenseTrackerData", listContainer.innerHTML);
  localStorage.setItem("income", income.toFixed(2));
  localStorage.setItem("expense", expense.toFixed(2));
  localStorage.setItem("balance", balance.toFixed(2));
}

function loadData() {
  const savedData = localStorage.getItem("expenseTrackerData");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  const savedIncome = parseFloat(localStorage.getItem("income"));
  const savedExpense = parseFloat(localStorage.getItem("expense"));
  const savedBalance = parseFloat(localStorage.getItem("balance"));

  if (!isNaN(savedIncome)) income = savedIncome;
  if (!isNaN(savedExpense)) expense = savedExpense;
  if (!isNaN(savedBalance)) balance = savedBalance;

  inc.textContent = `₹${income.toFixed(2)}`;
  exp.textContent = `₹${expense.toFixed(2)}`;
  totalBalance.textContent = `₹${balance.toFixed(2)}`;
}

loadData();
