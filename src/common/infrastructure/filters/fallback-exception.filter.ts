import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { getI18nContextFromArgumentsHost } from "nestjs-i18n";

@Catch()
export class FallbackExpectionFilter implements ExceptionFilter {
  catch(exception: { message: string }, host: ArgumentsHost) {
    console.log(
      "fallback exception handler triggered",
      JSON.stringify(exception),
    );

    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    const BAD_REQUEST: HttpStatus = HttpStatus.BAD_REQUEST;

    const i18n = getI18nContextFromArgumentsHost(host);

    return response.status(BAD_REQUEST).json({
      success: false,
      statusCode: BAD_REQUEST,
      message: exception.message
        ? exception.message
        : i18n.t("http.unexpectedError"),
    });
  }
}
