import { ExecutionContext } from "@nestjs/common";

export function getReqResFromCtx(context: ExecutionContext) {
  const httpContext = context.switchToHttp();
  return {
    req: httpContext.getRequest(),
    res: httpContext.getResponse(),
  };
}
