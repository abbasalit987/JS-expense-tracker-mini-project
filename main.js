//console.log('Hello World!');
// console.log(document.getElementsByName('field1'));

let loginForm = document.getElementById("expenses");
function save(event) {
    
    event.preventDefault();

    expended_on = event.target.expendedon.value;
    //lastName = event.target.field2.value;

    //fullName = firstName + ' ' + lastName;
    console.log(expended_on);
    amount_spent = event.target.amount.value;
    var x = document.getElementById("category");
    var i = x.selectedIndex;
    category_ = event.target.category.value = x.options[i].text;

    let expense_details = {
        expense: expended_on,
        amount : amount_spent,
        category : category_
    };

    expense_details_serialized = JSON.stringify(expense_details);
    console.log(expense_details_serialized);

    localStorage.setItem(expended_on,expense_details_serialized);
    addExpense(expense_details);
  }

  function addExpense(expense_details) {
    
    const parentElem = document.getElementById('expenses_list');
    const childElem = document.createElement('li');
    childElem.textContent = expense_details.expense + ' - ' + expense_details.amount + ' - ' + expense_details.category;

    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button'
    deleteBtn.value = 'Delete'
    deleteBtn.onclick = () => {
        localStorage.removeItem(expense_details.expense);
        parentElem.removeChild(childElem);
    }
    const editBtn = document.createElement('input');
    editBtn.type = 'button'
    editBtn.value = 'Edit'
    editBtn.onclick = () => {
        //document.getElementById('firstName').value = user_details.name.split(' ')[0];
        document.getElementById('expendedon').value = expense_details.expense;
        document.getElementById('amount').value = expense_details.amount;
        document.getElementById('category').value = expense_details.category;
        localStorage.removeItem(expense_details.expense);
        parentElem.removeChild(childElem);
    }
    childElem.appendChild(editBtn);
    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
  }



  

