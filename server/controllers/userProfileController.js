const Post = require('../models/PostModel')
const User = require('../models/UserModel')

module.exports.GetUserProfileController = async (req, res, next) => {

    let user = await User.findOne({
            _id: req.params.id
        })
        .select("-password")

    try {
        console.log(user)
        let result = await Post.find({
            postedBy: req.params.id
        })
        return res.status(201).json({
            user,
            result
        })
        console.log(post)
    } catch (error) {
        return res.status(401).json({
            error
        })
    }


}