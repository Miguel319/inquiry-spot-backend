const token: string =
  "ABSDFSFSDFDSdsjnfjini9*&$%^34234234SDKJNFJKSDN!9ew8894rwds";

export const JwtService = jest.fn().mockReturnValue({
  sign: jest.fn().mockResolvedValue(token),
});
