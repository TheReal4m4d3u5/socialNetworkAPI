import { Router } from 'express';
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, createFriend, deleteFriend } from '../../controllers/userController.js';
const router = Router();
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);
export default router;
