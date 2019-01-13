import { AuthChecker } from "type-graphql";
import { Context } from "src/types/Context";

export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
  return !!context.user;
};
