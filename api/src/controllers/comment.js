const Comment = require('../models/comment');

exports.listAllComments = async (req, res) => {

    try {
        let comments = await Comment.find({id_post: req.params.id_post});
        if(comments) {
            res.status(200).json(comments);
        }
        else {
            return res.status(404).json('no comments in db');
        }
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

exports.getCommentById = async (req, res) => {
    const { id } = req.params;

    try {
        let comment = await Comment.findById(id);

        if (comment) {
            return res.status(200).json(comment);
        }
        else {
            return res.status(404).json('comment_not_found');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.addComment = async (req, res) => {

    try {
   
        let newComment = new Comment(req.body);
        newComment.id_post = req.params.id_post;
        newComment.comment = req.body.comment;
        await newComment.save();
        
        if(!newComment){
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

exports.updateComment = async (req, res) => {
    const datas = {};

    ({ 
        id_comment: datas.id_comment,
        comment: datas.comment,
    } = req.body);

    try {
        let comment = await Comment.findOne({ id: datas.id_comment });

        if (comment) {       
            Object.keys(datas).forEach((key) => {
                if (comment[key] != datas[key]) {
                    comment[key] = datas[key];
                }
            });
            
            await comment.save();
            return res.status(201).json(comment);
        }

        return res.status(404).json('comment_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.deleteComment = async (req, res) => {
    const id_comment = req.body.id_comment;

    try {
        await Comment.deleteOne({ id: id_comment });
        return res.status(204).json('comment_deleted');
    } catch (error) {
        return res.status(501).json(error);
    }
}