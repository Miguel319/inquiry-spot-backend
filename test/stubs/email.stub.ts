import { Email } from "@/email/infrastructure/persistence/schemas";

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
