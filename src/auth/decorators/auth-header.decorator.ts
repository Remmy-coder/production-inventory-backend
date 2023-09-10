import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthHeader = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    return token;
  },
);
