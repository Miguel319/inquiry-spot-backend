import { ILogger } from "@/domain/logger";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LoggerService extends Logger implements ILogger {
  override debug(context: string, message: string) {
    if (process.env["NODE_ENV"] !== "production") {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  override log(context: string, message: string) {
    super.log(`[INFO] ${message}`, context);
  }

  override error(context: string, message: string, trace = "") {
    super.error(`[ERROR] ${message}`, trace, context);
  }

  override warn(context: string, message: string) {
    super.warn(`[WARN] ${message}`, context);
  }

  override verbose(context: string, message: string) {
    if (process.env["NODE_ENV"] !== "production") {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
