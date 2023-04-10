const Expense = require('../model/expenseTracker');

exports.addExpense = async (req, res, next) => {
    try{
        const expended_on = req.body.expended_on;
        const amount = req.body.amount;
        const category = req.body.category;
    
        const data = await Expense.create ({expended_on : expended_on, amount : amount, category : category});
        res.status(201).json({newExpenseDetail : data});
      } catch(err) {
        res.status(500).json({
          error : err
        })
    }
}

exports.getExpenses = async (req, res, next) => {
    try{
        const expenses = await Expense.findAll();
        res.status(201).json({allExpenses : expenses});
      } catch(err) {
        res.status(500).json({
          error : err
        })
    }
}

exports.deleteExpense = async (req, res, next) => {
    try{
        await Expense.destroy({where : {id : req.params.id}});
        res.send('DELETE request called');
        } catch(err){
        res.status(500).json({
          error : err
        })
    }
}