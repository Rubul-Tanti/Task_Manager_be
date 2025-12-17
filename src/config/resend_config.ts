import EnvConfig from "./env_config";
import { Resend } from "resend";
export const resend = new Resend(EnvConfig.resend_api_key);
