import { Router } from "express";
import { getUsers, getUser, addUser, deleteUser, updateUser } from "../controllers/userController";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})
router.get('/getusers', getUsers);
router.get('/getuser/:email', getUser);
router.post('/adduser', addUser);
router.delete('/deleteuser/:email', deleteUser);
router.put('/updateuser/:email', updateUser);
export default router;
