import { Email } from "../../src/domain/entities";

export const getEmailStub = (): Email =>
  ({
    _id: "2dsd32432sdf87ehA",
    body: "ABC ABC ABC ABC ABCABC",
    recipientEmailAddress: "recipient@email.com",
    subject: "Hello World",
    from: {
      email: "abc@email.com",
      name: "Abc",
    },
  } as Email);
