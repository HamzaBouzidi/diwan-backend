import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // Import your User model




// Register function to create a new user
export const register = async (req, res) => {
 const { name, email, password, job } = req.body;

 // Hash the password before saving
 const salt = bcrypt.genSaltSync(10);  // Use bcryptjs's sync method for generating a salt
 try {
  const hashedPassword = bcrypt.hashSync(password, salt);  // Use bcryptjs's sync method for hashing

  // Create the user
  const newUser = await User.create({
   Name_user: name,  // Store name in Name_user field
   login_user: email,  // Store email in login_user field
   pwd_user: hashedPassword,  // Store hashed password in pwd_user field
   job,  // Store job in job field
  });

  res.status(201).json({
   message: 'User registered successfully!',
   user: {
    id: newUser.USER_ID,
    name: newUser.Name_user,
    email: newUser.login_user,
    job: newUser.job,
   },
  });
 } catch (err) {
  res.status(500).json({
   message: 'Error registering user',
   error: err.message,
  });
 }
};
