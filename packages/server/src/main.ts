import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  
  // Allow all origins for the test task
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  
  await app.listen(port, "0.0.0.0");
  console.log(`🚀 GraphQL server running at http://0.0.0.0:${port}/graphql`);
}

bootstrap().catch((err) => {
  console.error("Failed to start server", err);
});
