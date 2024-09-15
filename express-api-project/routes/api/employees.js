const express = require('express');
const router = express.Router();
const moment = require('moment');
const employees = require('../../Employees');

//retrieve all employees
router.get('/', (req, res) => {res.json(employees);});

//retrieve employee by name
router.get('/:name', (req, res) => {
    const checkExist = employees.some(employee => employee.name === req.params.name);
    if (checkExist) {
        res.json(employees.filter(employee => employee.name === req.params.name));
    } else {
        res.status(400).json({msg: `No employee with the name of ${req.params.name}`});
    }
});

//create employee
router.post('/', (req, res) => {
    const newEmployee = {
        name: req.body.name,
        age: Math.round(Math.random() * (100 - 18) + 18),
        email: req.body.email,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
    };

    if (!newEmployee.name || !newEmployee.age || !newEmployee.email) {
        return res.status(400).json({msg: 'Please include a name, age and email'});
    }
    employees.push(newEmployee);
    res.json(employees);
});

//update employee
router.put('/:name', (req, res) => {
    const checkExist = employees.some(employee => employee.name === req.params.name);
    if (checkExist) {
        const updEmployee = req.body;
        employees.forEach(employee => {
            if (employee.name === req.params.name) {
                employee.name = updEmployee.name ? updEmployee.name : employee.name;
                employee.age = updEmployee.age ? updEmployee.age : employee.age;
                employee.email = updEmployee.email ? updEmployee.email : employee.email;
                employee.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                res.json({msg: 'Employee updated', employee});
            }
        });
    } else {
        res.status(400).json({msg: `No employee with the name of ${req.params.name}`});
    }
});

//delete employee
router.delete('/:name', (req, res) => {
    const checkExist = employees.some(employee => employee.name === req.params.name);
    if (checkExist) {
        res.json({msg: 'Employee deleted', employees: employees.filter(employee => employee.name !== req.params.name)});
    } else {
        res.status(400).json({msg: `No employee with the name of ${req.params.name}`});
    }
});

module.exports = router;