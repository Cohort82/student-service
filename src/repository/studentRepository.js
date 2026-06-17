import Student from '../model/student.js';

export const createStudent = student => Student.create(student);

export const findStudentById = id => Student.findById(id).exec();

export const deleteStudentById = id => Student.findByIdAndDelete(id).exec();

export const updateStudent = (id, data) => Student.findByIdAndUpdate(id, data, {new: true}).exec();

export const findStudentsByName = name => Student.find({name: new RegExp(`^${name}$`, 'i')}).exec();


export const countStudentsByNames = names => {
    const regexConditions = names.map(name => ({name:  new RegExp(`^${name}$`, 'i')}));
    return Student.countDocuments({$or: regexConditions});
}

export const findStudentsByMinScore = (exam, minScore) => Student.find({[`scores.${exam}`]: {$gte: minScore}}).exec();