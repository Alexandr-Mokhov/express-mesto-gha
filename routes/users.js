const router = require('express').Router();
const { userValidation, userAvatarValidation, userIdValidation } = require('../utils/validation');
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidation, getUserById);
router.patch('/me', userValidation, updateUserInfo);
router.patch('/me/avatar', userAvatarValidation, updateUserAvatar);

module.exports = router;
