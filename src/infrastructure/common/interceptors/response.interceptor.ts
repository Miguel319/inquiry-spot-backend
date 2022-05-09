import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ApiProperty } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class ResponseFormat<T> {
  @ApiProperty()
  isArray: boolean;

  @ApiProperty()
  path: string;

  @ApiProperty()
  method: string;

  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request: any = httpContext.getRequest();

    return next.handle().pipe(
      map((data) => ({
        data,
        isArray: Array.isArray(data),
        path: request.path,
        method: request.method,
      })),
    );
  }
}
