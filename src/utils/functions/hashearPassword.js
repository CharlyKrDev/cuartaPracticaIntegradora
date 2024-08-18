
import bcrypt from 'bcryptjs'



// Funciones para hashear password
const  createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const comparePassword = (newPassword, hashedPassword) => {
  return bcrypt.compareSync(newPassword, hashedPassword);
};

export {createHash, isValidPassword,comparePassword };
