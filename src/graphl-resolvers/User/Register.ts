import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
require("dotenv").config();

import { User } from "../../graphql-types/User";
import { RegisterInput } from "../../graphql-types/User/RegisterInput";
import { isAuth } from "../../middleware/isAuth";


@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    password,
    isActive,
    firstName,
    lastName
  }: RegisterInput): Promise<string> {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isActive
      });

      await user.save();
      return jsonwebtoken.sign(
          {id: user.id, email: user.email, name: user.name},
          process.env.JWT_SECRET || "x5sd767csfs7812bg",
          {expiresIn: "1d"}
      );

  }
}
