import Comment from '../Comments/comments.model.js'
import Post from '../Publications/post.model.js'

export const createComment = async (req, res) => {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const id = req.userId; 
      const newComment = new Comment({ content, post: postId, author: id });
  
      await newComment.save();
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const editComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const userId = req.userId; 
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      if (comment.author.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'You are not authorized to edit this comment' });
      }
      comment.content = content;
      await comment.save();
      res.json(comment);
    } catch (error) {
      console.error('Error editing comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getComment = async (req, res) => {
    try {
        const comment = await Comment.find();
        return res.send({comment});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'not found'});
    }
  };
  
  export const deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  