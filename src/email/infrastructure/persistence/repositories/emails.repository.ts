import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EmailDocument } from "../schemas";
import { BaseRepository } from "@/common/infrastructure/persistence/repositories";

@Injectable()
export class EmailsRepository extends BaseRepository<EmailDocument> {
  constructor(@InjectModel("Email") readonly emailModel: Model<EmailDocument>) {
    super(emailModel);
  }
}
