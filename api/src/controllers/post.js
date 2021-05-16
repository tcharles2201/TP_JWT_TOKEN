const Post = require('../models/post');

exports.listAllPosts = async (req, res) => {

    try {
        let posts = await Post.find();
        if(posts) {
            res.status(200).json(posts);
        }
        else {
            return res.status(404).json('no posts in db');
        }
        
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        let post = await Post.findById(id);

        if (post) {
            return res.status(200).json(post);
        }
        else {
            return res.status(404).json('post_not_found');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res) => {

    try {
   
        let newPost = new Post();
        newPost.title = req.body.title;
        newPost.content = req.body.content;
        newPost.created_at = req.body.created_at;
        await newPost.save();
        
        if(!newPost){
            return res.status(200).send({
            status: 404,
            message: 'No data found'});
        }
        else {
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully'
            });
        }

    } catch (error) {
        return res.status(501).json(error);
    }

}

exports.update = async (req, res) => {
    const datas = {};

    ({ 
        id: datas.id,
        title: datas.title,
        content: datas.content,
        created_at: datas.created_at
    } = req.body);

    try {
        let post = await Post.findOne({ id: datas.id });

        if (post) {       
            Object.keys(datas).forEach((key) => {
                if (post[key] != datas[key]) {
                    post[key] = datas[key];
                }
            });
            
            await post.save();
            return res.status(201).json(post);
        }

        return res.status(404).json('post_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res) => {
    const id = req.body.id;

    try {
        await Post.deleteOne({ id: id });
        return res.status(204).json('post_deleted');
    } catch (error) {
        return res.status(501).json(error);
    }
}