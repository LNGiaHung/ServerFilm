import bcrypt from 'bcrypt';

// Signup Controller
export async function signUpController(req: any, res: any) {
  try {
    const { db } = req.app; // Access the database from the request app
    const { username, email, password, phone } = req.body; // Get username, email, and password from request body

    // Input validation (basic example)
    if (!username || !email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' }); // Conflict error
    }

    // Hash the password
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user object
    const newUser = {
      username,
      email,
      phone,
      password: hashedPassword, // Store the hashed password
      createdAt: new Date(), // Store the creation timestamp
    };

    // Save the user in the 'users' collection
    const result = await db.collection('users').insertOne(newUser);

    // Send response
    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertedId, // Return the newly created user ID
    });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' }); // Return 500 status for server errors
  }
}
