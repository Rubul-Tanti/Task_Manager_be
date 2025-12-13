import {app} from './app'
import http from "http"
import EnvConfig from "./config/env_config"
const server=http.createServer(app)
server.listen(EnvConfig.port)