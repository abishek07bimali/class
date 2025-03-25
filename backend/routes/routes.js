const express = require("express");
const  {getAllUsers,createUser, updateUser,deleteUser, createOrder,createAddress} = require("../controller/userController");
const fileUpload = require("../helper/multer");
const router = express.Router();

router.get("/users", getAllUsers);

router.post("/users", fileUpload("files"), createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/order", createOrder);
router.post("/address", createAddress);
module.exports = router;
