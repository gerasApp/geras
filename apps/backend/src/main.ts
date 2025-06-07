import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

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

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle("API de Simulación de Inversiones")
    .setDescription("API para simular planes de inversión")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  const port = process.env.API_PORT;
  if (!port) {
    throw new Error("No se encontró variable de entorno API_PORT");
  }

  await app.listen(port);
}
bootstrap().catch(console.error);
