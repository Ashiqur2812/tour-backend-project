/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { excludeField } from "../../constants";
import { tourSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });

    if (existingTour) {
        throw new Error('A tour with this title already exists');
    }

    // const baseSlug = payload.title.toLowerCase().split(' ').join('-');
    // let slug = `${baseSlug}`;
    // console.log(slug);

    // let counter = 0;
    // while (await Tour.exists({ slug })) {
    //     slug = `${slug}-${counter++}`;
    // }

    // payload.slug = slug;

    const tour = await Tour.create(payload);
    return tour;
};

const getAllTours = async (query: Record<string, string>) => {

    const filter = query;
    const searchTerm = query.searchTerm || '';
    const sort = query.sort || 'createdAt';
    const fields = query.fields.split(',').join(' ') || ''
    // console.log(fields)

    for(const field of excludeField){
        delete filter[field]
    }

    const searchQuery = { $or: tourSearchableFields.map(field => ({ [field]: { $regex: searchTerm, $options: 'i' } })) };

    const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields)

    const totalTours = await Tour.countDocuments();
    return {
        data: tours,
        meta: {
            total: totalTours
        }
    };
};

const singleTour = async (id: string) => {
    const tour = await Tour.findOne({ id });
    return tour;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error('Tour not Found');
    }

    // console.log(existingTour)
    // if (payload.title) {
    //     const baseSlug = payload.title.toLowerCase().split(' ').join('-');
    //     let slug = `${baseSlug}`;

    //     let count = 0;
    //     while (await Division.exists({ slug })) {
    //         slug = `${slug}-${count++}`;
    //     }

    //     payload.slug = slug;
    // }

    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return updatedTour;
};

const deleteTour = async (id: string) => {
    const result = await Tour.findByIdAndDelete(id);
    return result;
};

const createTourType = async (payload: ITourType) => {
    const existingTourType = await TourType.findOne({ name: payload.name });

    if (existingTourType) {
        throw new Error('Tour type already exist');
    }
    const result = await TourType.create(payload);
    return result;
};

const getAllTourTypes = async () => {
    const tour = await TourType.find({});
    const totalTour = await TourType.countDocuments();
    return { tour, totalTour };

};

const getSingleTourType = async (id: string) => {
    const tourType = await TourType.findById(id);
    return tourType;
};

const updateTourType = async (id: string, payload: Partial<ITour>) => {
    const existingTourType = await TourType.findById(id);

    if (!existingTourType) {
        throw new Error('Tour type not found');
    }

    if (payload.title) {
        const baseSlug = payload.title.toLowerCase().split(' ').join('-');
        let slug = `${baseSlug}`;
        let counter = 0;

        while (await Tour.exists({ slug })) {
            slug = `${slug}-${counter++}`;
        }

        payload.slug = slug;
    }

    const updatedTour = await TourType.findByIdAndUpdate(id, { name: payload }, { new: true, runValidators: true });

    return updatedTour;

};

const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);

    if (!existingTourType) {
        throw new Error('Tour type not found');
    }

    return await TourType.findByIdAndDelete(id);
};

export const TourService = {
    createTour,
    getAllTours,
    singleTour,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourTypes,
    getSingleTourType,
    updateTourType,
    deleteTourType
};
