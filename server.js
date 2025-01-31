const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve HTML Form & Show Users
app.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    let userList = users
      .map((user) => `<tr><td>${user.name}</td><td>${user.email}</td></tr>`)
      .join("");

    res.send(`
      <h2>Add User</h2>
      <form action="/add-user" method="POST">
        <label>Name:</label>
        <input type="text" name="name" required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" required />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Users List</h2>
      <table border="1">
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
        ${userList}
      </table>
    `);
  } catch (error) {
    res.status(500).send("<h3>Error fetching users!</h3>");
  }
});

// Handle Form Submission
app.post("/add-user", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.redirect("/"); // Redirect back to home page to show updated list
  } catch (error) {
    res.status(500).send("<h3>Error adding user!</h3><a href='/'>Try again</a>");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
