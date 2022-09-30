import {
  CacheInterceptor,
  CacheModule,
  Module,
  Provider,
} from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

const providers: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },
];

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 1000,
      isGlobal: true,
    }),
  ],
  providers,
  exports: providers,
})
export class CustomCacheModule {}
