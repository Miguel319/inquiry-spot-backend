import { getUserStub } from "../stubs";

export const FAKE_TOKEN =
  "sdfi9#)$_@434d0fdsfdsfsdfsd0-4430#(0dfdk0$#(FSDLN8(#KJSDd;!03";

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue({
    user: getUserStub(),
    token: FAKE_TOKEN,
  }),
  signIn: jest.fn().mockResolvedValue({
    user: getUserStub(),
    token: FAKE_TOKEN,
  }),
});
