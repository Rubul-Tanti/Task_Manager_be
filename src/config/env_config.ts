import env from "dotenv"
env.config()
const EnvConfig={
        resend_api_key:process.env.RESEND_API_KEY,
        port:process.env.PORT,
        email:process.env.EMAIL,
        email_password:process.env.EMAILPASS,
        email_clr:process.env.EMAILCLR,
        email_port:process.env.EMAILPORT,
        mongo_url:process.env.MONGOURL
}
export default EnvConfig