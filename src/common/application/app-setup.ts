import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { RootModule } from "./modules";
import { i18nValidationErrorFactory } from "nestjs-i18n";
import { ConfigService } from "@nestjs/config";
import {
  FallbackExpectionFilter,
  HttpExceptionFilter,
  ValidationFilter,
} from "@/common/infrastructure/filters";
import { LoggingInterceptor } from "@/common/infrastructure/interceptors";
import { LoggerService } from "../infrastructure/logger";

export class AppSetup {
  constructor(private readonly _logger: LoggerService) {}

  async run(): Promise<void> {
    try {
      const app: NestExpressApplication =
        await NestFactory.create<NestExpressApplication>(RootModule);

      const configService: ConfigService<unknown, boolean> =
        app.get(ConfigService);

      this.setBasicConfig(app);
      this.setupGlobalPipes(app);
      this.setupGlobalFilters(app);
      this.setupMainMiddlewares(app);
      this.setupGlobalInterceptors(app);
      this.buildAPIDocumentation(app);

      const port: number = Number(configService.get("API_PORT")) || 3000;

      await app.listen(port, () => this.log(port));
    } catch (error) {
      Logger.error(
        `❌ Error: could not start server: ${error}`,
        "Bootstrap",
        false,
      );
      process.exit();
    }
  }

  private setBasicConfig(app: NestExpressApplication) {
    app.setGlobalPrefix("api/v1");

    app.enableCors();
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title = "Inquiry Spot";
    const description = "Inquiry Spot documentation";
    const version = "1.0.0";

    const options: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("documentation", app, document);
  }

  private setupMainMiddlewares(app: NestExpressApplication): void {
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: "50mb" }));

    app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
      }),
    );

    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60,
        max: 1000,
        message:
          "⚠️  Too many simultaneous requests. Please, try again after an hour.",
      }),
    );
  }

  private setupGlobalFilters(app: NestExpressApplication): void {
    app.useGlobalFilters(
      new FallbackExpectionFilter(this._logger),
      new HttpExceptionFilter(new Logger()),
      new ValidationFilter(),
    );
  }

  private setupGlobalInterceptors(app: NestExpressApplication): void {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  private setupGlobalPipes(app: NestExpressApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: i18nValidationErrorFactory,
      }),
    );
  }

  private log(port: number): void {
    Logger.log(`  ✅  Server started on port: ${port}.`);
  }

  static create(): AppSetup {
    return new AppSetup(new LoggerService());
  }
}
