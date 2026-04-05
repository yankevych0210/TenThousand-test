import { Module, Controller, Get } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { FormsModule } from "./forms/forms.module";
import { ResponsesModule } from "./responses/responses.module";

@Controller("/")
class HealthController {
  @Get()
  health(): string {
    return "Forms Lite API is running!";
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
      introspection: true,
    }),
    FormsModule,
    ResponsesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
