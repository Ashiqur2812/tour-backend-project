/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";


const getNewAccessToken = async (refreshToken: string) => {

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return {
        accessToken: newAccessToken
    };

};


const resetPassword = async (newPassword: string, oldPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId);
    console.log(user);

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string);
    console.log(isOldPasswordMatch);

    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Old password does not match');
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));
    user!.save();

};

export const AuthServices = {
    // credentialsLogin,
    getNewAccessToken,
    resetPassword
};
