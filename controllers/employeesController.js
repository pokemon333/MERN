const Employee = require('../model/Emplyee')

const getAllEmployees = async  (req, res) => {
    const employee = await Employee.find();
    if(!employee) res.sendStatus(204).json({"message" : "No employee found!"})
    res.json(employee)
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname)  res.sendStatus(400).json({"message" : "first and last name required!!"})
    const { firstname , lastname } = req.body
    try {
        const result = await Employee.create({firstname,lastname});
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body._id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?._id)  res.sendStatus(400).json({"message" : "Id parameter is required!"})
    const employee = await Employee.findOne({_id : req.body._id})
    if (!employee)  res.sendStatus(204).json({"message" : `No employee with ID : ${req.body._id}`})
     const result = await employee.deleteOne({_id : req.params.id})
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id)  res.sendStatus(400).json({"message" : "Id parameter is required!"})
    const employee = await Employee.findOne({_id : req.params.id})
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}