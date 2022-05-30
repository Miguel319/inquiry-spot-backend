import { User } from "@/domain/entities";
import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export interface IApiResponse {
  message?: string;
  res: Response;
  data?: unknown;
}

export interface IApiAuthResponse {
  token: string;
  user: User;
  res: Response;
}

export class ApiResponse {
  public static getSuccessfully({ res, data }: IApiResponse) {
    return res.status(HttpStatus.OK).json(data);
  }

  public static createSuccessfully({
    message,
    data,
    res,
  }: IApiResponse): Response {
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: message || `Entity created successfully!`,
      data: data || null,
    });
  }

  public static updateSuccessfully({
    message,
    data,
    res,
  }: IApiResponse): Response {
    return res.status(HttpStatus.OK).json({
      success: true,
      message: message || "Entity updated successfully!",
      data: data || null,
    });
  }

  public static deleteSuccessfully({
    message,
    data,
    res,
  }: IApiResponse): Response {
    return res.status(HttpStatus.OK).json({
      success: true,
      message: message || "Entity deleted successfully!",
      data: data || null,
    });
  }

  public static signInSuccessfully({
    res,
    user,
    token,
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
        message: "Signed in successfully!",
        user,
      });
  }

  public static signUpSuccessfully({
    res,
    user,
    token,
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
        message: "Signed up successfully!",
        user,
      });
  }
}
