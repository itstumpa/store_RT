import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {prisma} from "../../shared/prisma";
import { jwtConfig } from "../../config/jwt";

export const registerUser = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  return user;
};
