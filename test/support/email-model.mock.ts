import { Email } from "../../src/domain/entities";
import { getEmailStub } from "../stubs";
import { BaseRepoMock } from "./base-repo.mock";

export class EmailModel extends BaseRepoMock<Email> {
  protected entityStub = getEmailStub();
}
