import "dotenv/config";

const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(` Missing environment variable: ${name}`);
  }
  return value;
};

const EnvConfig = {
  resend_api_key: required(process.env.RESEND_API_KEY, "RESEND_API_KEY"),
  port: required(process.env.PORT, "PORT"),
  email: required(process.env.EMAIL, "EMAIL"),
  email_password: required(process.env.EMAILPASS, "EMAILPASS"),
  email_clr: required(process.env.EMAILCLR, "EMAILCLR"),
  email_port: required(process.env.EMAILPORT, "EMAILPORT"),
  mongo_url: required(process.env.MONGOURL, "MONGOURL"),
  jwt_access_secret: required(process.env.JWTACCESSSECRET, "JWTACCESSSECRET"),
  jwt_refresh_secret: required(process.env.JWTREFRESHSECRET, "JWTREFRESHSECRET"),
};

export default EnvConfig;
