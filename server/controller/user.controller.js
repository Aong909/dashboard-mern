import PropertyModel from "../model/property.js";
import UserModel from "../model/user.js";

const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find({}).limit(req.query._end);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const userExits = await UserModel.findOne({ email });

    if (userExits) {
      // const properties = await PropertyModel.find({creator._id :  });
      return res.status(200).json(userExits);
    }

    const newUser = await UserModel.create({
      name,
      email,
      avatar,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ _id: id }).populate("allProperties");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { getAllUser, createUser, getUserInfoByID };
