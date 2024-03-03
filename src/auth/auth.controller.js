import User from '../auth/auth.model.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { encrypt } from '../helpers/validator.js'

export const register = async (req, res) => {
    try{
        const data = req.body; 
        console.log(data); 
        data.password = await encrypt(data.password)
        const user = new User(data)
        await user.save()
        return res.send({message: `Registered`});
    }catch(error){
        console.error(error)
        return res.status(500).send({message: 'Error register'})
    }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }); 
      if (!user) {
        return res.status(404).json({ mensaje: 'user not fined' });
      }
      const passwordValido = await bcryptjs.compare(password, user.password); 
      if (!passwordValido) {
        return res.status(401).json({ mensaje: 'password incorrect' }); 
      }
      const token = jwt.sign({ id: user._id }, 'secreto');
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const editProfile = async (req, res) => {
    try {
      const { id } = req.params; 
      const updates = req.body; 
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };