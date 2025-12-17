import RegisterUser from '../controlers/user/register_user'
import email_verifation from '../controlers/email_verification'
import express from 'express'
import { asyncError } from '../middlewares/Error'
const router =express.Router()

router.post('/email/verification',asyncError(email_verifation))
router.post('/user/register',asyncError(RegisterUser))

export default router