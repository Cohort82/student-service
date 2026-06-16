let collection;
export const init = db => collection = db.collection('college');

export const addStudent = async ({id, name, password}) => {
    const existingStudent = await collection.findOne({_id: id});
    if (existingStudent) {
        return false;
    }
    await collection.insertOne({_id: id, name, password, scores: {}});
    return true;
}

export const findStudent = async id => await collection.findOne({_id: id}, {projection: {password: 0}});

export const deleteStudent = async id => await collection.findOneAndDelete({_id: id}, {projection: {password: 0}});

export const updateStudent = async (id, data) => await collection.findOneAndUpdate({_id: id}, {$set: data}, {
    returnDocument: 'after',
    projection: {scores: 0}
})

export const findByName = async name => await collection.find({
    name: {
        $regex: `^${name}$`,
        $options: 'i'
    }
}, {projection: {password: 0}}).toArray()


export const countByNames = async names => {
    const regexConditions = names.map(name => ({name: {$regex: `^${name}$`, $options: 'i'}}));
    return await collection.countDocuments({$or: regexConditions});
}

export const findByMinScore = async (exam, minScore) => await collection.find({[`scores.${exam}`]: {$gte: minScore}}, {projection: {password: 0}}).toArray();