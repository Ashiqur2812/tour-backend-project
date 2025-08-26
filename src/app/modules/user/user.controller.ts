/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status-codes';
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Users Created Successfully',
        data: user
    });
});

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const verifiedToken = req.user as JwtPayload | undefined; // I am facing an issue

    if (!verifiedToken) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'Unauthorized: Invalid or missing token',
            data: null
        });
    }

    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'User updated Successfully',
        data: user
    });

});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Users Retrieved Successfully',
        data: result.data,
        meta: result.meta
    });

});

export const UserController = {
    createUser,
    getAllUsers,
    updateUser
}

