import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "../../../../infrastructure/repositories";
import { EmailDocument } from "../schemas";

@Injectable()
export class EmailsRepository extends BaseRepository<EmailDocument> {
  constructor(@InjectModel("Email") readonly emailModel: Model<EmailDocument>) {
    super(emailModel);
  }
}
