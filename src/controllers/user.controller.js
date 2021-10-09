const models = require('../models')
const utils = require('../utils');
const config = require('../config');
const jwt = require('jsonwebtoken');
const values = require('../values')

const signIn = async(req, res) =>{
    try{
        const { email, password } = req.body;
        const user = await models.user.findOne({email});
        if(!user){
            return res.json('USER NOT FOUND')
        }
        const isValid = utils.bcrypt.compare(password, user.password);
        if(!isValid){
            return res.json('PASSWORD DOES NOT MATCH')
        }
        const token = jwt.sign({user}, config.jwt.secret)
        return res.json(token)
    }catch(err){
        return res.json({error:err})
    }
}
const signUp = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const file = req.file;
        const hostname = config.server.hostname
        const hash = await utils.bcrypt.encrypt(password);   
        const user = {
           avatar: hostname +'/'+values.avatarFolder+'/'+ file.filename,
           email,
           password: hash,
        };
        const newUser = await models.user.create(user);
        return res.status(201).json(newUser);
      } catch (err) {
        return res.json({ err });
      }
}
module.exports={
    signIn,
    signUp
}