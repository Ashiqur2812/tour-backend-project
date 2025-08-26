import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import { IDivision } from "./division.interface";


const createDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.createDivision(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Division Created Successfully',
        data: result
    });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.getAllDivisions();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Division retrieved Successfully',
        data: result.data,
        meta: result.meta
    });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload: IDivision = req.body;

    const result = await DivisionService.updateDivision(id, payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Division Updated Successfully',
        data: result
    });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await DivisionService.deleteDivision(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Division Deleted Successfully',
        data: result
    });
});

export const DivisionController = {
    createDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision
};
