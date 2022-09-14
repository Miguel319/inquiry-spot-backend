import { Email } from "@/email/infrastructure/persistence/schemas";
import { getEmailStub } from "../stubs";
import { BaseRepoMock } from "./base-repo.mock";

export class EmailModel extends BaseRepoMock<Email> {
  protected entityStub = getEmailStub();
}
