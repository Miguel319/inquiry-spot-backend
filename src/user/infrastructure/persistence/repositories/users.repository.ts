import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "@/infrastructure/repositories";
import { UserDocument } from "../schemas";

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel("User") readonly userModel: Model<UserDocument>) {
    super(userModel);
  }
}
