import { Request } from "express";
import { User } from "src/entity/User";

export interface MyContext {
  req: Request;
  user: any;
}

export interface Context {
  user?: User;
}
