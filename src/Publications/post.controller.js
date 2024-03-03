import Post from '../Publications/post.model.js'
import bcryptjs from 'bcryptjs'

export const createPost = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const id = req.userId;
    const post = new Post({ title, category, content, author: id });
    await post.save();
    res.status(201).json(post);
    console.log(id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating post' });
  }
};
/*export const getPost = async (req, res) => {
  const id = req.userId;
  const 
};*/

export const getPost = async (req, res) => {
  try {
      const post = await Post.find();
      return res.send({post});
  } catch (error) {
      console.error(error);
      return res.status(500).send({message: 'not found'});
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