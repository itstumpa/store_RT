export const jwtConfig = {
  secret: process.env.JWT_SECRET || "super_secret_key",
  expiresIn: "7d",
};



// export const loginUser = async (payload: any) => {
//   const user = await prisma.user.findUnique({
//     where: { email: payload.email },
//   });

//   if (!user) throw new Error("User not found");

//   const isPasswordValid = await bcrypt.compare(
//     payload.password,
//     user.password
//   );

//   if (!isPasswordValid) throw new Error("Invalid credentials");

//   const token = jwt.sign(
//     { id: user.id, email: user.email, role: user.role },
//     jwtConfig.secret,
//     { expiresIn: jwtConfig.expiresIn }
//   );

//   return { token };
// };
