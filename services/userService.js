const dbFuncs = require('../models/dbFunctions');

const helper = require('../config/helper');

const createNewUser = async (req, res) => {
    let check = true;
    if(!req.body.first_name) {
        check = false;
    }

    if(!req.body.username || !helper.validateEmail(req.body.username)) {
        check = false;
    }

    if(!req.body.password) {
        check = false;
    }

    if(!req.body.last_name) {
        check = false;
    }

    if(!check) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let fName = req.body.first_name;
    let lName = req.body.last_name;
    let uName = req.body.username;
    let pass = await helper.createPassHash(req.body.password);

    let result = await dbFuncs.getUserDataCredentials(uName);
    if (result) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let data = await dbFuncs.addNewUser(fName, lName, uName, pass);

    let userResult = {
        id:data.id,
        username: data.username,
        first_name:data.first_name,
        last_name:data.last_name,
        account_created:data.account_created,
        account_updated:data.account_updated
    }
    return res.status(201).json(userResult); 


   
}

const getUser = async (req, res) => {
    check = true;
    if(!req.params.id) {
        check = false;
    }

    if (Object.keys(req.body).length){
        check = false;
    }

    if(!check) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let id = req.params.id;

    let result = await dbFuncs.getUserData(id);
    if (!result) {
        return res.status(400).json({
          message: "Bad Request"});
    }
    let fResult = {
        id:result.id,
        username: result.username,
        first_name:result.first_name,
        last_name:result.last_name,
        account_created:result.account_created,
        account_updated:result.account_updated
    }

    return res.status(200).json(fResult); 

    
}

const updateUser = async (req, res) => {
    let check = true;
   

    if(!req.body.first_name) {
        check = false;
    }

    if(!req.body.last_name) {
        check = false;
    }

    if(!req.body.password) {
        check = false;
    }

    if(Object.keys(req.body).length !== 3) {
        check = false;
    }

    if(!check) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let id = req.params.id;
    let fName = req.body.first_name;
    let lName = req.body.last_name;
    
    let pass = await helper.createPassHash(req.body.password);

    await dbFuncs.updateUserData(fName, lName, pass, id)
    return res.status(204).send(); 

    // dbFuncs.setConnection();

    // await dbFuncs.updateUserData(fName, lName, uName, pass, id)
    // .then((result) => {
    //     dbFuncs.endConnection();
    //     return res.status(204).send(); 
    // })    
    // .catch((err) => {
    //     dbFuncs.endConnection();
    //     return res.status(500).json({
    //         message: "Database Error"
    //     });
    // })
}
module.exports = {
    createNewUser,
    getUser,
    updateUser
}