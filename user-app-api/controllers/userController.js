import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const validEmail = (email) => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

const checkIfEmailExists = async (email) => {
  const user = await User.findOne({ email })
  if (user) {
    return true
  }
  return false
}

const checkUserExists = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    return false
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return false
  }
  return user
}

const createUserInMongo = async (name, email, password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = new User({
    name,
    email,
    password: hashedPassword
  })
  return user.save()
}

const createAndAssignToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  if (!validEmail(email)) {
    return res.status(400).json('Invalid email')
  }
  const emailExists = await checkIfEmailExists(email)
  if (emailExists) {
    return res.status(400).json('Email already exists')
  }

  try {
    await createUserInMongo(name, email, password)
    
    res.status(200).json('User created successfully for ' + email)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await checkUserExists(email, password)

    if (!user) {
      return res.status(400).json('Email or password is incorrect')
    }
    const token = createAndAssignToken(user)

    res.header('auth-token', token)
    res.json({ token })
  } catch (err) {
    res.status(500).json(err)
  }
}
