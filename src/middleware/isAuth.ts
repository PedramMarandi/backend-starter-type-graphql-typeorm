import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/Context";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.user) {
    throw new Error("User not authenticated");
  }
  return next();
};
