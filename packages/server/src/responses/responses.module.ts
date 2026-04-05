import { Module } from "@nestjs/common";
import { FormsModule } from "../forms/forms.module";
import { ResponsesResolver } from "./responses.resolver";
import { ResponsesService } from "./responses.service";

@Module({
  imports: [FormsModule],
  providers: [ResponsesResolver, ResponsesService],
})
export class ResponsesModule {}
