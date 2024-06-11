const expTitleField = document.getElementById("input-expenses-title");
const expSumField = document.getElementById("input-expenses-sum");
const revTitleField = document.getElementById("input-revenues-title");
const revSumField = document.getElementById("input-revenues-sum");

const revForm = document.getElementById("revenues-form");
const expForm = document.getElementById("expenses-form");

const totalRev = document.getElementById("total-revenues-sum");
const totalExp = document.getElementById("total-expenses-sum");
const totalBalance = document.getElementById("balance-amount");
const revList = document.getElementById("revenues-list");
const expList = document.getElementById("expenses-list");

const revTable = [];
const expTable = [];

function updateList(list) {
  list.innerHTML = "";
}

function clearForm(title, sum) {
  title.value = "";
  sum.value = "";
}

function createInputAmount(amount) {
  const inputAmount = document.createElement("input");
  inputAmount.classList.add("inputs-edit");
  inputAmount.type = "number";
  inputAmount.value = amount;
  inputAmount.required = true;
  inputAmount.min = "0.01";
  inputAmount.step = "0.01";

  return inputAmount;
}

function createInputName(name) {
  const inputName = document.createElement("input");
  inputName.classList.add("inputs-edit");
  inputName.value = name;
  inputName.required = true;
  inputName.maxLength = 50;

  return inputName;
}

function createCancelButton() {
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";
  cancelBtn.classList.add("btns-cancel-save");

  return cancelBtn;
}

function createDeleteButton() {
  const btnDelte = document.createElement("button");
  btnDelte.classList.add("btns-delete-edit");
  btnDelte.innerText = "Delete";

  return btnDelte;
}

function createEditButton() {
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btns-delete-edit");
  btnEdit.innerText = "Edit";

  return btnEdit;
}

function createSaveButton() {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.type = "submit";
  saveBtn.classList.add("btns-cancel-save");

  return saveBtn;
}

function calculatingTotalAmount(items) {
  const totalAmount = items
    .reduce((total, item) => total + parseFloat(item.amount), 0)
    .toFixed(2);
  return totalAmount;
}

function getBalanceAmount() {
  const totalRevAmount = revTable.reduce((acc, cur) => {
    return acc + Number(cur.amount);
  }, 0);
  const totalExpAmount = expTable.reduce((acc, cur) => {
    return acc + Number(cur.amount);
  }, 0);
  const balanceAmount = totalRevAmount - totalExpAmount;

  if (revTable.length === 0 && expTable.length === 0)
    totalBalance.textContent = `To calculate the amount, enter data`;
  else if (balanceAmount > 0) {
    totalBalance.textContent = `You can still spend ${balanceAmount.toFixed(
      2
    )} $`;
  } else if (balanceAmount === 0) {
    totalBalance.textContent = `You balance is zero`;
  } else if (balanceAmount < 0) {
    totalBalance.textContent = `The balance is negative. You are down ${balanceAmount.toFixed(
      2
    )} $`;
  }
}

function addRevenuesItem() {
  updateList(revList);
  revTable.forEach((item) => {
    const listItem = document.createElement("li");
    revList.appendChild(listItem);

    const revItem = document.createElement("div");
    revItem.classList.add("list-item");
    listItem.appendChild(revItem);

    const revItemDetails = document.createElement("span");
    revItemDetails.classList.add("item");
    revItemDetails.textContent = `${item.name}: ${item.amount} $`;
    revItem.appendChild(revItemDetails);

    const btnDelte = createDeleteButton();
    revItem.appendChild(btnDelte);

    const btnEdit = createEditButton();
    revItem.appendChild(btnEdit);

    btnDelte.addEventListener("click", () => {
      listItem.remove();
      btnDelte.remove();
      btnEdit.remove();
      revTable.splice(revTable.indexOf(item), 1);
      totalRev.textContent = `${calculatingTotalAmount(revTable)} $`;
      getBalanceAmount();
    });

    btnEdit.addEventListener("click", () => {
      revItem.style.display = "none";

      const editForm = document.createElement("form");
      editForm.classList.add("edit-form");

      const inputName = createInputName(item.name);

      const inputAmount = createInputAmount(item.amount);

      const cancelBtn = createCancelButton();

      cancelBtn.addEventListener("click", () => {
        revItem.style.display = "block";
        editForm.style.display = "none";
      });

      const saveBtn = createSaveButton();

      editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const index = revTable.indexOf(item);
        const elementToEdit = revTable[index];
        elementToEdit.name = inputName.value;
        elementToEdit.amount = inputAmount.value;
        editForm.style.display = "none";
        addRevenuesItem();
        totalRev.textContent = `${calculatingTotalAmount(revTable)} $`;
        getBalanceAmount();
      });

      editForm.appendChild(inputName);
      editForm.appendChild(inputAmount);
      editForm.appendChild(cancelBtn);
      editForm.appendChild(saveBtn);
      listItem.appendChild(editForm);
    });
  });
}

revForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const revName = event.target.revname.value;
  const revSum = event.target.revsum.value;

  revTable.push({
    name: revName,
    amount: revSum,
  });

  updateList(revList);
  addRevenuesItem();
  clearForm(revTitleField, revSumField);
  totalRev.textContent = `${calculatingTotalAmount(revTable)} $`;
  getBalanceAmount();
});

function addExpensesItem() {
  updateList(expList);
  expTable.forEach((item) => {
    const listItem = document.createElement("li");
    expList.appendChild(listItem);

    const expItem = document.createElement("div");
    expItem.classList.add("list-item");
    listItem.appendChild(expItem);

    const expItemDetails = document.createElement("span");
    expItemDetails.classList.add("item");
    expItemDetails.textContent = `${item.name}: ${item.amount} $`;
    expItem.appendChild(expItemDetails);

    const btnDelte = createDeleteButton();
    expItem.appendChild(btnDelte);

    const btnEdit = createEditButton();
    expItem.appendChild(btnEdit);

    btnDelte.addEventListener("click", () => {
      listItem.remove();
      btnDelte.remove();
      btnEdit.remove();
      expTable.splice(expTable.indexOf(item), 1);
      totalExp.textContent = `${calculatingTotalAmount(expTable)} $`;
      getBalanceAmount();
    });

    btnEdit.addEventListener("click", () => {
      expItem.style.display = "none";

      const editForm = document.createElement("form");
      editForm.classList.add("edit-form");

      const inputName = createInputName(item.name);

      const inputAmount = createInputAmount(item.amount);

      const cancelBtn = createCancelButton();

      cancelBtn.addEventListener("click", () => {
        expItem.style.display = "block";
        editForm.style.display = "none";
      });

      const saveBtn = createSaveButton();

      editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const index = expTable.indexOf(item);
        const elementToEdit = expTable[index];
        elementToEdit.name = inputName.value;
        elementToEdit.amount = inputAmount.value;
        editForm.style.display = "none";
        addExpensesItem();
        totalExp.textContent = `${calculatingTotalAmount(expTable)} $`;
        getBalanceAmount();
      });

      editForm.appendChild(inputName);
      editForm.appendChild(inputAmount);
      editForm.appendChild(cancelBtn);
      editForm.appendChild(saveBtn);
      listItem.appendChild(editForm);
    });
  });
}

expForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const expName = event.target.expname.value;
  const expSum = event.target.expsum.value;

  expTable.push({
    name: expName,
    amount: expSum,
  });

  updateList(expList);
  addExpensesItem();
  clearForm(expTitleField, expSumField);
  totalExp.textContent = `${calculatingTotalAmount(expTable)} $`;
  getBalanceAmount();
});
