import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../app-types/Context";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  //TODO: implement the logic for auth here
  if(context.user) {
    console.log("User it here");
  }
  return next();
};
