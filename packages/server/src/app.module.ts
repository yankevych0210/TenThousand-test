import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { FormsModule } from "./forms/forms.module";
import { ResponsesModule } from "./responses/responses.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema.graphql"),
      sortSchema: true,
      playground: false,
      introspection: true,
    }),
    FormsModule,
    ResponsesModule,
  ],
})
export class AppModule {}
