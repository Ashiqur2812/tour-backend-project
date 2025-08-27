import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {

    // const baseSlug = payload.name.toLowerCase().split(' ').join('-');
    // let slug = `${baseSlug}-division`;
    // console.log(slug);

    // let counter = 0;
    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}`;
    // }

    // payload.slug = slug;

    const division = await Division.create(payload);
    return division;

};

const getAllDivisions = async () => {
    const division = await Division.find({});
    const totalDivision = await Division.countDocuments();
    return {
        data: division,
        meta: {
            total: totalDivision
        }
    };
};
const getSingleDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    
    return {
        data: division,
    };
};


const updateDivision = async (id: string, payload: Partial<IDivision>) => {
    const existingDivision = await Division.findById(id);

    if (!existingDivision) {
        throw new Error('Division Not Found');
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: id }
    });

    if (duplicateDivision) {
        throw new Error('A division with this name already exist');
    }

    // if (payload.name) {
    //     const baseSlug = payload.name.toLowerCase().split(' ').join('-');
    //     let slug = `${baseSlug}-division`;

    //     let count = 0;
    //     while (await Division.exists({ slug })) {
    //         slug = `${slug}-${count++}`;
    //     }
    //     payload.slug = slug;
    // }

    const updateDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    return updateDivision;

};

const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null;
};

export const DivisionService = {
    createDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision,
    getSingleDivision
};