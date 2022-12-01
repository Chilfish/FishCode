import { db } from "../db";
import express from "express";
import bcrypt from "bcryptjs";

const routers = express.Router();

// 注册用户
const regUser = (req: any, res: any) => {
  const userInfo = req.body;
};
