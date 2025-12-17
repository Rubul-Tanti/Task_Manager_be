import email_verifation from '../controlers/email_verification'
import express from 'express'

const router =express.Router()

router.post('/email/verification',email_verifation)

export default router