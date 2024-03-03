import Post from '../Publications/post.model.js'
import bcryptjs from 'bcryptjs'

export const createPost = async (req, res) => {
    try {
      const { title, category, content } = req.body;
      /*const author = req.user._id;*/
    const post = new Post({ title, category, content, /*author*/});
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating post' });
    }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { title, category, content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};