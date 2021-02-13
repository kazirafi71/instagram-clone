
const { create_post,all_posts ,my_posts,Like,Unlike,comment,delete_post,delete_comment} = require('../controllers/postController')
const requireLogin = require('../middleware/requireLogin')

const router=require('express').Router()


router.get('/allPosts',requireLogin,(req,res)=>{
    res.send('sd')
})

router.post('/create-post',requireLogin,create_post)

router.get('/all-posts',requireLogin,all_posts)

router.get('/my-posts',requireLogin,my_posts)


router.put('/like',requireLogin,Like)
router.put('/unlike',requireLogin,Unlike)
router.put('/comment',requireLogin,comment)
router.delete('/delete/:postId',requireLogin,delete_post)

router.delete('/comment/:postId',requireLogin,delete_comment)


module.exports=router