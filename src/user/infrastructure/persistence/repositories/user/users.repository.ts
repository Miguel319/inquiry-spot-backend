import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "../../schemas";
import { BaseRepository } from "@/common/infrastructure/persistence/repositories";

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel("User") readonly userModel: Model<UserDocument>) {
    super(userModel);
  }
}
