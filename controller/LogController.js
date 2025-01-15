import  express  from "express";
import bodyParser from "body-parser";
import { logs } from "../model/index.js";

const logRouter = express.Router()
logRouter.use(bodyParser.json())

logRouter.get('/', (req, res) => {
    logs.fetchLogs(req, res)
})

logRouter.get('/status', (req, res) => {
    logs.fetchUserStatus(req, res)
})

logRouter.get('/:id', (req, res) => {
    logs.fetchSingleUserLog(req, res)
})

logRouter.post('/add/:uid', (req, res) => {
        logs.addLog(req, res)
})

export {
    logRouter
}