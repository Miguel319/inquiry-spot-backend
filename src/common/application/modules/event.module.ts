import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot()],
  exports: [EventEmitterModule, ScheduleModule],
})
export class EventModule {}
