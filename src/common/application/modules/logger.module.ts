import { LoggerService } from "@/common/infrastructure/logger";
import { Module } from "@nestjs/common";

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
