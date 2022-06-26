import { User } from "@/domain/entities";
import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export interface IApiResponse {
  message: string;
  res: Response;
  data?: unknown;
}

export interface IApiAuthResponse {
  token: string;
  user: User;
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

  public static update({ message, data, res }: IApiResponse): Response {
    return res.status(HttpStatus.OK).json({
      success: true,
      message,
      data: data || null,
    });
  }

  public static delete({ message, data, res }: IApiResponse): Response {
    return res.status(HttpStatus.OK).json({
      success: true,
      message,
      data: data || null,
    });
  }

  public static signIn({
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

  public static resetPassword({
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
