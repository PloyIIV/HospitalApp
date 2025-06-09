import express from 'express'
import { supabase } from '../config/db.js';

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('rooms').select('*').eq('user_id', req.user.id).single()
        console.log(data)
        return res.json({
            data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: error
        })
    }
})

postRouter.post('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('rooms').insert([{ user_id: req.user.id }]).select().single()
        console.log(data, error)
        return res.json({
            data
        })
    } catch (error) {
        return res.json({
            message: error
        })
    }
})

export default postRouter