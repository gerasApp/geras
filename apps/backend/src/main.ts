import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  if (!process.env.FRONTEND_URL) {
    throw new Error("No se encontró variable de entorno FRONTEND_URL");
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  const port = process.env.API_PORT;
  if (!port) {
    throw new Error("No se encontró variable de entorno API_PORT");
  }

  await app.listen(port);
}
bootstrap().catch(console.error);
