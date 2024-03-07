//importing modules
import { createTransport } from 'nodemailer';


//function to send email to the user
export async function sendingMail({ from, to, subject, text }) {

    try {
        let mailOptions = ({
            from,
            to,
            subject,
            text
        })
        //assign createTransport method in nodemailer to a variable
        //service: to determine which email platform to use
        //auth contains the senders email and password which are all saved in the .env
        const Transporter = createTransport({
            service: "Gmail",
            secure: true,
            auth: {
                user: process.env.email,
                pass: process.env.emailpassword,
            },
        });

        //return the Transporter variable which has the sendMail method to send the mail
        //which is within the mailOptions
        return await Transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }

}