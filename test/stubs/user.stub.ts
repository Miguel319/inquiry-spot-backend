import { User } from "@/user/infrastructure/persistence/schemas";

export const getUserStub = (): User =>
  ({
    _id: "3243243434",
    name: "Abc",
    email: "abc@gmail.com",
    password: "HelloWorld",
  } as User);
