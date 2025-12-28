/**
 * Utility script to create an admin user
 * Run: node scripts/create-admin.js
 * Make sure MONGODB_URI is set in your .env.local file
 */

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  ghanaCard: String,
  studentId: String,
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function createAdmin() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = (query) => new Promise((resolve) => readline.question(query, resolve))

  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI
    
    if (!MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env.local file')
      console.log('Please create a .env.local file with your MongoDB connection string')
      readline.close()
      process.exit(1)
    }

    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB\n')

    console.log('Creating Admin User\n')
    const fullName = await question('Full Name: ')
    const email = await question('Email: ')
    const password = await question('Password: ')

    if (!fullName || !email || !password) {
      console.log('All fields are required!')
      readline.close()
      await mongoose.connection.close()
      return
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      console.log('User with this email already exists!')
      readline.close()
      await mongoose.connection.close()
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const adminUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin'
    })

    console.log('\nAdmin user created successfully!')
    console.log(`ID: ${adminUser._id}`)
    console.log(`Email: ${email}`)
    console.log(`Role: admin`)
  } catch (error) {
    console.error('Error creating admin:', error.message)
  } finally {
    readline.close()
    await mongoose.connection.close()
    process.exit(0)
  }
}

createAdmin()


