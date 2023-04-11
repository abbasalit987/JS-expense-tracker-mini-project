let loginForm = document.getElementById("expenses");

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http:localhost:5000/get-expenses")
        .then((resp) => {
            //console.log(resp);
            for (let i =0; i<resp.data.allExpenses.length; i++){
                addExpense(resp.data.allExpenses[i]);
            }
        })
        .catch((err) => console.log(err))
});

function save(event) {
    
    event.preventDefault();

    expended_on = event.target.expendedon.value;
    console.log(expended_on);
    amount_spent = event.target.amount.value;
    var x = document.getElementById("category");
    var i = x.selectedIndex;
    category_ = event.target.category.value = x.options[i].text;

    let expense_details = {
        expended_on: expended_on,
        amount : amount_spent,
        category : category_
    };

    expense_details_serialized = JSON.stringify(expense_details);
    axios.post("http://localhost:5000/add-expense", expense_details)
    .then((response) => {
        //console.log(response);
        addExpense(response.data.newExpenseDetail);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  function addExpense(expense_details) {
    
    const parentElem = document.getElementById('expenses_list');
    const childElem = document.createElement('li');
    childElem.textContent = expense_details.expended_on + ' - ' + expense_details.amount + ' - ' + expense_details.category;

    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button'
    deleteBtn.value = 'Delete'
    deleteBtn.onclick = () => {
        axios.delete(`http://localhost:5000/delete-expense/${expense_details.id}`)
            .then(() => {
                parentElem.removeChild(childElem);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const editBtn = document.createElement('input');
    editBtn.type = 'button'
    editBtn.value = 'Edit'
    editBtn.onclick = () => {
        axios.delete(`http://localhost:5000/delete-expense/${expense_details.id}`)
            .then((response) => {
                document.getElementById('expendedon').value = expense_details.expended_on;
                document.getElementById('amount').value = expense_details.amount;
                document.getElementById('category').value = expense_details.category;
                parentElem.removeChild(childElem);
                // axios.post("http://localhost:5000/add-expense", expense_details)
                //     .then((response) => {
                //         //console.log(response);
                //         addExpense(response.data.newExpenseDetail);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    childElem.appendChild(editBtn);
    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
  }



  

