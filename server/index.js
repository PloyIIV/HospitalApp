import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import { protect } from "./middlewares/protect.js";

async function init() {
    const app = express();
    const port = 3000;
    
    const corsConfig = {
        origin: "*",
        credential: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
    app.options("", cors(corsConfig));
    app.use(cors(corsConfig));
    app.use(bodyParser.json())
    app.use(express.json())

    app.use('/auth', authRouter)
    app.use('/post', protect, postRouter)

    app.get('/', (req, res) => {
        res.send('API is working')
    })

    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`)
    })
}

init()