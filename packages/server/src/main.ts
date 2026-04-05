import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, origin?: string | boolean) => void) => {
      const allowed =
        !origin ||
        /^http:\/\/localhost(:\d+)?$/.test(origin) ||
        /\.vercel\.app$/.test(origin);
      callback(null, allowed ? origin : false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  });
  const port = process.env.PORT ?? 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`🚀 GraphQL server running at http://0.0.0.0:${port}/graphql`);
}

bootstrap();
