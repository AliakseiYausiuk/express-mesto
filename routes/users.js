/* eslint-disable no-undef */
// создадим express router
const router = require("express").Router();
const { getUsers, getUserById, createUser, updateProfile, updateAvatar } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

// экспортируем его
module.exports = router;
