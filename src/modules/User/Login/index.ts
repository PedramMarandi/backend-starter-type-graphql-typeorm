import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
require("dotenv").config();
import { User } from "../../../entity/User";

@Resolver()
export class LoginResolver {
  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    return jsonwebtoken.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || "x5sd767csfs7812bg",
      { expiresIn: "1d" }
    );
  }
}
