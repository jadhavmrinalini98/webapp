const helper = require('../config/helper');
const db = require('../config/dbSetup');

const createNewUser = async ( req, res) => {
    //Check if req object is correct and throw err as approriate.
    let check = true;
    if(!req.body.first_name) {
        check = false;
    }

    if(!req.body.last_name) {
        check = false;
    }

    if(!req.body.username || !helper.validateEmail(req.body.username)) {
        check = false;
    }

    if(!req.body.password) {
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

    let resultant = await db.user.findOne({where: {username:uName}, attributes: ['password']});
    if (resultant?.dataValues?.password) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    try{
        let data = await db.user.create({
            first_name:fName,
            last_name: lName,
            username: uName,
            password: pass,
            account_created: new Date().toISOString(),
            account_updated: new Date().toISOString()
        });

        let result = {
            id:data.dataValues.id,
            username: data.dataValues.username,
            first_name:data.dataValues.first_name,
            last_name:data.dataValues.last_name,
            account_created:data.dataValues.account_created,
            account_updated:data.dataValues.account_updated
        }
        return res.status(201).json(result);
    }catch(err) {
        console.log("DB Error");
        res.status(400).send("Bad Request");
    }
}

const getUser = async (req, res) => {
    //Check if req object is correct and throw err as approriate.
    check = true;

    if (Object.keys(req.body).length){
        check = false;
    }

    if(!check) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let id = req.params.id;

    try{
        let result = await db.user.findOne({where:{id:id}});
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
    }catch(err) {
        console.log("DB Error");
        res.status(400).send("Bad Request");
    }
}

const updateUser = async (req, res) => {
    //Check if req object is correct and throw err as approriate
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

    try{
        await db.user.update({
            first_name:fName, 
            last_name:lName, 
            password:pass
        },{
            where:{
                id:id
            }
        })
        return res.status(204).send(); 
    }catch(err) {
        console.log('DB Error');
        res.status(400).send("Bad Request");
    }
}

module.exports = {
    createNewUser,
    getUser,
    updateUser
}