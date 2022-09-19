import { forwardRef, Module, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard, JwtStrategy } from "@/user/infrastructure/guards";
import { AuthService } from "../services/implementations";
import { EmailsModule } from "@/email/application/modules";
import { UsersModule } from "@/user/application/modules/users.module";
import { AuthController } from "@/user/presentation/controllers/auth";

const AuthUseCaseProvider: Provider = {
  provide: "IAuthService",
  useClass: AuthService,
};

@Module({
  imports: [
    forwardRef(() => EmailsModule),
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "100d" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthUseCaseProvider, JwtAuthGuard, AuthService, JwtStrategy],
  exports: [AuthUseCaseProvider, JwtAuthGuard, AuthService, JwtStrategy],
})
export class AuthModule {}
