const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../Models/userModel");

async function userSignup(req, res) {
  try {
    const { first_name, last_name, email, password, mobile } = req.body;
    if (!first_name || !last_name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = await userModel.findOne({
      $or: [{ email }, { mobile }],
    });

    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "Email or Mobile No. Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModelObject = new userModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      mobile,
    });

    const result = await userModelObject.save();

    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User Created Successfully",
      token,
      user: {
        id: result._id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        mobile: result.mobile,
        role: result.role,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error While Inserting Users", Error: err.message });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Passowrd" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error while login", error: err.message });
  }
}

module.exports = { userSignup, userLogin };
