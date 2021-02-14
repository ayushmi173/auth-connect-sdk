import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./entity/user.entity";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  }
);
