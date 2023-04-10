const path = require('path');

const express = require('express');

const adminController = require('../controller/admin');

const router = express.Router();

router.post('/add-expense', adminController.addExpense);

router.get('/get-expenses', adminController.getExpenses);

router.delete('/delete-expense/:id', adminController.deleteExpense);

module.exports = router;
