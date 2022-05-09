import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";

import e, { Response } from "express";
import { HttpStatus } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { LoggerService } from "@/infrastructure/logger";

interface IError {
  message: string;
  status: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  private uniqueException(exception: HttpException): IError {
    const uniqueField: string = Object.keys((exception as any).keyPattern).join(
      "",
    );

    return {
      message: `The '${uniqueField}' field is unique. There's already a record with the provided value.`,
      status: HttpStatus.BAD_REQUEST, // 400
    };
  }

  private notFoundException(exception: HttpException): IError {
    const entityArr: string[] = exception.message.split(" ");

    const lastElementIdx: number = entityArr.length - 1;

    const entity: string = entityArr[lastElementIdx]
      .replace(/[""]/g, "")
      .toLowerCase();

    return {
      message:
        entity.includes("api/v1") || entity.includes("/")
          ? `Could not find ${entity}.`
          : `Could not find any ${entity} with the provided _id.`,
      status: HttpStatus.NOT_FOUND,
    };
  }

  private jwtException(exception: HttpException): IError {
    return {
      message: exception.message,
      status: HttpStatus.UNAUTHORIZED, // 401
    };
  }

  private validationException(exception: HttpException): IError {
    const cutFrom: number = exception.message.indexOf(":") + 2;

    return {
      message: exception.message.slice(cutFrom),
      status: HttpStatus.BAD_REQUEST, // 400
    };
  }

  private authorization(): IError {
    return {
      message: "Unauthorized to access this resource.",
      status: HttpStatus.UNAUTHORIZED, // 401
    };
  }

  private requiredPhotoException(): IError {
    return {
      message: "The photo field is required.",
      status: HttpStatus.BAD_REQUEST,
    };
  }

  private sendResponse(
    response: any,
    { message, status }: IError,
    exception: HttpException,
  ): void {
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
    });

    this.logMessage(response, { message, status }, exception);
  }

  private logMessage(
    request: any,
    { message, status }: IError,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message ? message : null
        } message=${message ? message : null}`,
        status >= 500 ? exception?.stack : "",
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message ? status : null
        } message=${message ? message : null}`,
      );
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();

    const response: e.Response<
      any,
      Record<string, any>
    > = ctx.getResponse<Response>();

    let status: HttpStatus;

    try {
      status = exception?.getStatus();
    } catch {
      status = HttpStatus.INTERNAL_SERVER_ERROR; // 500
    }

    let error: IError = {
      status,
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR // 500
          ? `${exception.message}.`
          : exception.message,
    };

    console.warn(exception);

    // Handle required photo
    if (
      status === HttpStatus.BAD_REQUEST &&
      exception.message === "Unexpected field"
    ) {
      this.sendResponse(response, this.requiredPhotoException(), exception);

      return;
    }

    // Mongoose bad ObjectId
    if (
      exception.name === "CastError" ||
      (!exception.message.includes("Cannot read") &&
        exception.message.includes("Cannot"))
    ) {
      this.sendResponse(response, this.notFoundException(exception), exception);

      return;
    }

    // Mongoose duplicate key
    if ((exception as any).code === 11000) {
      this.sendResponse(response, this.uniqueException(exception), exception);

      return;
    }

    // Mongoose validation exception
    if (exception.name === "ValidationError") {
      this.sendResponse(
        response,
        this.validationException(exception),
        exception,
      );

      return;
    }

    // Authorization validation
    if (
      status === HttpStatus.UNAUTHORIZED &&
      exception?.message?.includes("Unauthorized")
    ) {
      this.sendResponse(response, this.authorization(), exception);

      return;
    }

    // JWT Error
    if (exception.name === "JsonWebTokenError") {
      this.sendResponse(response, this.jwtException(exception), exception);

      return;
    }

    this.sendResponse(response, error, exception);
  }
}
