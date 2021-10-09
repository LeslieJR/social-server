const models = require('../models')
const createComment = async (req,res) =>{
    try{
        const {title, comment, user_id, post_id} = req.body;
        const user = await models.user.findById(user_id);
        if(!user){
            return res.json({err: 'USER DOES NOT EXIST'})
        }
        const post = await models.post.findById(post_id);
        if(!post){
            return res.json({err:'POST DOES NOT EXIST'})
        }
        const newComment = await models.comment.create({
            title,
            comment,
            user,
            post
        })
        return res.status(200).json(newComment)
    }catch(err){
        return res.status(400).json({err:err.message})
    }
}
const latestComments = (req, res) =>{
    res.json('GET LATEST COMMENTS')
}
module.exports={
    createComment,
    latestComments
}
