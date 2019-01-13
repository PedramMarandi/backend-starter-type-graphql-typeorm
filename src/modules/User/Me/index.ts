import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../../../entity/User";
import { MyContext } from "../../../types/Context";
import { isAuth } from "../../../middleware/isAuth";

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async me(@Ctx() ctx: MyContext): Promise<User | string> {
    return (await User.findOne(ctx.user.id)) || ""; // TODO: Get rid of this hack
  }
}
