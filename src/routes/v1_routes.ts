import RegisterUser from '../controlers/user/register_user'
import email_verifation from '../controlers/email_verification'
import express from 'express'
import { asyncError } from '../middlewares/Error'
import { getUserById } from '../controlers/user/read_user'
import { updateUser } from '../controlers/user/update_user'
import { deleteUser } from '../controlers/user/delete_user'
import LoginUser from '../controlers/user/login_user'
const router =express.Router()

router.post('/email/verification',asyncError(email_verifation))
router.post('/user/register',asyncError(RegisterUser))
router.post('/user/login',asyncError(LoginUser))
router.get('/user/get/:id',asyncError(getUserById))
router.post('/user/update/:id',asyncError(updateUser))
router.post('/user/delete/:id',asyncError(deleteUser))

export default router