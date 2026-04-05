import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // Allow the Vercel app in production and localhost in development
  app.enableCors({
    origin: ["http://localhost:5173", "https://ten-thousand-test-client.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 GraphQL server running on port ${port}`);
}

bootstrap();
