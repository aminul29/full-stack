document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const expenseForm = document.getElementById("expense-form")
  const expenseNameInput = document.getElementById("expense-name")
  const expenseAmountInput = document.getElementById("expense-amount")
  const expenseList = document.getElementById("expense-list")
  const totalAmountDisplay = document.getElementById("total-amount")

  // Initialize array to store expenses
  let expenses = []
  let totalAmount = calculateTotal()

  expenseForm.addEventListener("submit", function (e){
    e.preventDefault() // Prevent form submission

    // Get values from input fields
    const name = expenseNameInput.value.trim()
    const amount = parseFloat(expenseAmountInput.value.trim())

    // validate inputs
    if(name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount
      }
      // Add new expense to the array
      expenses.push(newExpense)
      // save expenses to local storage
      saveExpensesToLocal()
      // update ui
      // renderExpenses()
      // updateTotalAmount()
      // clear input fields
      clearInputFields()
    }
      

  })

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amo unt, 0)
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }
  // clear expenses from input fields
  function clearInputFields() {
    expenseNameInput.value = ""
    expenseAmountInput.value = ""    
  }
})