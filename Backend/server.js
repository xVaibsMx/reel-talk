require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const helmet = require('helmet')

const app = express()
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.SUPER_SECRET
const SALT_ROUNDS = 10

app.use(helmet()) // Basic security headers
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const Users = mongoose.model('Users', userSchema)

// Middleware to verify JWT token
const authJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader)
    return res.status(401).json({ message: 'Authorization header missing' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token missing' })

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: 'Invalid or expired token' })

    req.user = decoded // decoded contains username (payload)
    next()
  })
}

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  // Basic input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    // Check if username or email exists
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }],
    })
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Username or Email already taken' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()

    // Generate JWT token (store only username or userId)
    const token = jwt.sign({ username: newUser.username }, JWT_SECRET, {
      expiresIn: '1h',
    })

    return res.status(201).json({
      message: 'User created successfully',
      token,
    })
  } catch (error) {
    console.error('Registration Error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' })

  try {
    const user = await Users.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    })

    return res.json({ message: 'Login successful', token })
  } catch (error) {
    console.error('Login Error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

// Protected route to get user info
app.get('/me', authJwt, async (req, res) => {
  try {
    // Find user details by username from token
    const user = await Users.findOne(
      { username: req.user.username },
      { password: 0, _id: 0, __v: 0 }
    )

    if (!user) return res.status(404).json({ message: 'User not found' })

    return res.json({ message: 'User data fetched successfully', user })
  } catch (error) {
    console.error('Fetch user error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
