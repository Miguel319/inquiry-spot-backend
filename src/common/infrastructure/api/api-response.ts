import { UserPresenter } from "@/common/infrastructure/presenters";
import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export interface IApiResponse {
  message?: string;
  res: Response;
  data?: unknown;
}

export interface IApiAuthResponse {
  token: string;
  user: UserPresenter;
  message: string;
  res: Response;
}

export class ApiResponse {
  public static get({ res, data }: IApiResponse) {
    return res.status(HttpStatus.OK).json(data);
  }

  public static create({ message, data, res }: IApiResponse): Response {
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message,
      data: data || null,
    });
  }

  private static getOkMutationResponse({
    message,
    data,
    res,
  }: IApiResponse): Response {
    return res.status(HttpStatus.OK).json({
      success: true,
      message,
      data: data || null,
    });
  }
  public static update(apiResponse: IApiResponse): Response {
    return ApiResponse.getOkMutationResponse(apiResponse);
  }

  public static delete(apiResponse: IApiResponse): Response {
    return ApiResponse.getOkMutationResponse(apiResponse);
  }

  private static getAuthData({
    res,
    user,
    token,
    message,
  }: IApiAuthResponse): Response {
    return res
      .status(HttpStatus.OK)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env["NODE_ENV"] === "production",
      })
      .json({
        success: true,
        token,
        message,
        user,
      });
  }

  public static getEmptyRes(res: Response): Response {
    return res.status(HttpStatus.NO_CONTENT);
  }

  public static signIn(apiAuthResponse: IApiAuthResponse): Response {
    return ApiResponse.getAuthData(apiAuthResponse);
  }

  public static resetPassword(apiAuthResponse: IApiAuthResponse): Response {
    return ApiResponse.getAuthData(apiAuthResponse);
  }

  public static signUp({
    res,
    user,
    token,
    message,
  }: IApiAuthResponse): Response {
    return res
      .status(HttpStatus.CREATED)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env["NODE_ENV"] === "production",
      })
      .json({
        success: true,
        token,
        message,
        user,
      });
  }
}
