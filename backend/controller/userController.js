const User = require("../model/user");
const Order = require("../model/order");
const Address = require("../model/address");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ success: true, users: users });
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        res.status(201).json({ success: true, newUser: newUser });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const updateUser = async (req, res) => {
    console.log(req.params.id)
    try {
        const userExist = User.findByPk(req.params.id);
        if (userExist) {
            console.log("user exist")
            const { username } = req.body;
            const updateduser = await User.update({ username: username }, { where: { id: req.params.id } });
            res.status(201).json(updateduser);
        }
        else {
            console.log("user donot exist")
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const deleteUser = async (req, res) => {
    console.log(req.params.id)
    try {
        const userExist = User.findByPk(req.params.id)
        if (userExist) {
            User.destroy({ where: { id: req.params.id } })
            return res.status(201).json("user deleted");
        }
        return res.json("user cannot be deleted")

    }
    catch {
        console.log("failed")
    }
}



const createOrder = async (req, res) => {
    try {
        const { userId, totalAmount } = req.body;

        if (!userId || !totalAmount) {
            return res.status(400).json({ error: "userId and totalAmount are required." });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const newOrder = await Order.create({ userId, totalAmount });

        res.status(201).json({ message: "Order created successfully.", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;

        if (!userId || !address) {
            return res.status(400).json({ error: "userId and address are required." });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const addressExist = await Address.findOne({ where: { userId } })
        console.log(addressExist)
        if (!addressExist) {
            const newAddress = await Address.create({ userId, address });
            return res.status(201).json({ message: "Address created successfully.", address: newAddress });

        }
        return res.status(500).json({ error: "dublicate entries not allowed" });


    } catch (error) {
        console.error("Error creating Address:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// const updateUser = async (req, res) => {
//     console.log(req.params.id)
//     try {
//         const userExist = User.findByPk(req.params.id);
//         if (userExist) {
//             console.log("user exists");

//             const { username } = req.body;
//             try {
//                 const updatedUser = await User.update({ username: username }, { where: { id: req.params.id } });
//                 if (updatedUser[0] === 0) {
//                     return res.status(404).json({ message: "User not found or no changes were made" });
//                 }

//                 res.status(200).json({ message: "User updated successfully", updatedUser });
//             } catch (error) {
//                 console.error(error);
//                 res.status(500).json({ message: "Error updating user", error });
//             }
//         }
//         else {
//             console.log("user donot exist")
//         }
//     } catch (error) {
//         res.status(400).json({ error: error });
//     }
// };

module.exports = { getAllUsers, createUser, updateUser, deleteUser, createOrder, createAddress }