import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  }
);
