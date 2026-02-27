import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.EMAIL_API_KEY)
const frontend_url = process.env.FRONTEND_URL

export const sendVerificationEmail = async (userEmail, token) => {
    const link = `${frontend_url}/verify-email/${token}`

    try {
        const { data, error } = await resend.emails.send({
            from: 'FlowState <noreply@resend.dev>',
            to: [userEmail],
            subject: 'Email Verification',
            html: `Hi there! Please click <a href="${link}">here</a> to verify your email address.`
        })

        if (error) {
            throw error
        }

        return data
    } catch (error) {
        console.log(error)
    }
}

export const resetPasswordEmail = async (userEmail, code) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'FlowState <noreply@resend.dev>',
            to: [userEmail],
            subject: 'Email Verification',
            html: `Hi there! Your reset code is ${code}`
        })

        if (error) {
            throw error
        }

        return data
    } catch (error) {
        console.log(error)
    }
}