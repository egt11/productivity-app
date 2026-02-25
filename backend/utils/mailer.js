import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.EMAIL_API_KEY)

export const sendVerificationEmail = async (userEmail, token) => {
    const link = `http://localhost:5173/verify-email/${token}`

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