import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "@/domain/entities";
import { BaseRepository } from "../base.repository";

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel("User") readonly userModel: Model<UserDocument>) {
    super(userModel);
  }
}
