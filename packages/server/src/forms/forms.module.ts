import { Module } from "@nestjs/common";
import { FormsResolver } from "./forms.resolver";
import { FormsService } from "./forms.service";

@Module({
  providers: [FormsResolver, FormsService],
  exports: [FormsService],
})
export class FormsModule {}
