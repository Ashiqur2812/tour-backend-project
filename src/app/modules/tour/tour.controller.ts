import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourService } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";

const createTour = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.createTour(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result
    });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await TourService.getAllTours(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tours retrieved successfully',
        data: result.data,
        meta: result.meta
    });
});

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TourService.singleTour(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour retrieved successfully',
        data: result
    });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await TourService.updateTour(id, payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour updated successfully',
        data: result
    });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTour(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result
    });
});

const createTourType = catchAsync(async (req: Request, res: Response) => {
    const name = req.body;
    const result = await TourService.createTourType(name);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour type created successfully',
        data: result
    });
});

const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
    const tour = await TourService.getAllTourTypes();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour types retrieved successfully',
        data: tour
    });
});

const getSingleTourType = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const tour = await TourService.getSingleTourType(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type retrieved successfully',
        data: tour
    });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    // console.log(id, name);
    const tour = await TourService.updateTourType(id, name);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour type updated successfully',
        data: tour
    });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const tour = await TourService.deleteTourType(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type deleted successfully',
        data: tour
    });
});

export const TourController = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourTypes,
    getSingleTourType,
    updateTourType,
    deleteTourType
};
