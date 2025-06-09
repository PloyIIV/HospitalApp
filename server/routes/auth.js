import { supabase } from "../config/db.js";
import express from "express";
import jwt from "jsonwebtoken";
import { protect } from "../middlewares/protect.js";

const authRouter = express.Router();

authRouter.get('/', protect, async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('user_id', req.user.id)
    return res.json({
      data
    })
  } catch (error) {
    return res.json({
      message: error
    })
  }
})

authRouter.put('/profile', protect, async (req, res) => {
  try {
    const { username, password, firstname, lastname, tel, sex } = req.body
    const { data, error } = await supabase.from('users').update({ username, password, firstname, lastname, tel, sex }).eq('user_id', req.user.id).select()
    console.log(data)
    if(error) {
      return res.json({
        message: error
      })
    }
    return res.json({
      message: 'Update user successfully.'
    })
  } catch (error) {
    console.log(error)
    return res.json({
      message: error
    })
  }
})

authRouter.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const username = req.body.username.toLowerCase();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);
    if (error) {
      return res.json({
        message: error,
      });
    }
    if (!data[0]) {
      return res.json({
        message: "This username is not existed. Please sign up first.",
      });
    }
    if (data[0].password !== password) {
      return res.json({
        message: `Password is incorrect`,
      });
    }
    const token = jwt.sign(
      { id: data[0].user_id, role: data[0].role, username, firstname: data[0].firstname, lastname: data[0].lastname },
      process.env.SUPABASE_JWT_KEY,
      {
        expiresIn: "90000",
      }
    );
    return res.json({
      data: data[0],
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
    });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    let role = 'user';
    if(req.body.role) {
      role = req.body.role
    }
    console.log(role)
    const { username, password, firstname, lastname, sex, tel } = req.body;
    const { data: checkUser, error:checkUserError } = await supabase.from('users').select('*').eq('username', username)
    if(checkUserError) {
      return res.json({
        message: checkUserError
      })
    }
    if(checkUser[0]) {
      return res.json({
        message: 'This account is already in used.'
      })
    }
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          password,
          firstname,
          lastname,
          role,
          sex,
          tel
        },
      ])
      .select();
    if (error) {
      console.log(error);
      return res.json({
        message: error,
      });
    }
    return res.json({
      message: "Created account successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
    });
  }
});

export default authRouter;
