import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // Extremely permissive CORS to solve the deployment blocker
  app.enableCors({
    origin: true, // Reflect the requesting origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0"); // Listen on all interfaces for Railway
  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
