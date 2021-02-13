const Post = require('../models/PostModel')

module.exports.create_post = async (req, res, next) => {
    let {
        title,
        body,
        photo
    } = req.body

    if (!title || !body || !photo) {
        return res.status(401).json({
            error: 'Please provide all info'
        })
    }

    let post = new Post({
        title,
        body,
        photo,
        postedBy: req.user._id
    })

    post.save()
        .then(result => {

            return res.status(201).json({
                text: 'Post created',
                posts: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.all_posts = async (req, res, next) => {
    Post.find()

        .populate('postedBy', 'name')
        .populate('comments.postedBy', '_id name ')
        .then(allPosts => {
            return res.status(201).json({
                posts: allPosts,

            })
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports.my_posts = async (req, res, next) => {
    Post.find({
            postedBy: req.user._id
        })
        .then(allPosts => {
            return res.status(201).json({
                posts: allPosts
            })
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports.Like = async (req, res, next) => {
    console.log(req.body.postId)
    let post = await Post.findById(req.body.postId)

    // if(post.likes.includes(req.user._id))
    // {
    //      return res.status(401).json({
    //         text:'post liked'
    //     })
    // }
    // console.log(post)
    Post.findByIdAndUpdate(req.body.postId, {
            $push: {
                likes: req.user._id
            }
        }, {
            new: true
        })
        .populate('postedBy', 'name')
        .populate('comments.postedBy', '_id name ')
        .exec((error, result) => {
            // console.log(result)
            if (error) {
                return res.status(401).json({
                    error
                })
            }
            return res.status(201).json({
                result
            })

        })
}
module.exports.Unlike = async (req, res, next) => {
    Post.findByIdAndUpdate(req.body.postId, {
            $pull: {
                likes: req.user._id
            }
        }, {
            new: true
        })
        .populate('postedBy', 'name')
        .populate('comments.postedBy', '_id name ')
        .exec((error, result) => {
            if (error) {
                return res.status(401).json({
                    error
                })
            }
            return res.status(201).json({
                result
            })

        })
}
module.exports.comment = async (req, res, next) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    // console.log(comment)
    Post.findByIdAndUpdate(req.body.postId, {
            $push: {
                comments: comment
            }
        }, {
            new: true
        })
        .populate('postedBy', 'name')
        .populate('comments.postedBy', '_id name ')
        .exec((error, result) => {
            // console.log(result)
            if (error) {
                return res.status(401).json({
                    error
                })
            }
            return res.status(201).json({
                result
            })

        })
}


module.exports.delete_post = async (req, res, next) => {

    console.log(req.params.postId)
    Post.findOne({
            _id: req.params.postId
        })
        .populate('postedBy,"_id')
        // .then(result => {
        //     result.remove()

        //         .then(post => {

        //             return res.status(201).json({
        //                 post,
        //                 text: 'delete success'
        //             })
        //         })
        // })
        .exec((error, result) => {

            if (error || !result) {
                return res.status(401).json({
                    err
                })
            }
            if (result.postedBy._id.toString() === req.user._id.toString()) {
                result.remove()
                    .then(post => {
                        return res.status(201).json({
                            post,
                            text: 'delete success'
                        })
                    })
            }
        })

}
module.exports.delete_comment = async (req, res, next) => {
    console.log(((req.params.postId)))

    Post.findOne({
            "comments._id": req.params.postId
        })
        .then(result => {
            // console.log((result))
            result.comments.filter(item => {
                // console.log(item)
                return (JSON.stringify(item._id)) === (JSON.stringify(req.params.postId))
            })
            // console.log((x))
            // x[0].remove()
            // result = x[0]

            result.remove()

            console.log(result)


            // console.log((x[0]))
            console.log( result)


            // Post.find(x[0]._id)
            //     .then(data => console.log(data))


        })
        .catch(err => console.log(err))
    // .exec((error, result) => {
    //         if (error || !result) {
    //             return res.status(401).json({
    //                 error
    //             })
    //         }
    //         let x = result.comments.filter(item => {
    //             // console.log(item)
    //             return (JSON.stringify(item._id)) === (JSON.stringify(req.params.postId))
    //         })
    //         console.log(typeof(x))

    //         Post
    //     }
    //)
}