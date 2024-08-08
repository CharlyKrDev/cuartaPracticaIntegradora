import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()



const MAIL_PASS = process.env.MAIL_PASS
const MAIL_USER = process.env.MAIL_USER
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
})

export default transporter