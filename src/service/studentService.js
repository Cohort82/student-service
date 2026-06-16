import * as repo from "../repository/studentRepository.js";

export const addStudent = async ({id, name, password}) => {
    return repo.addStudent({id, name, password});
}

export const findStudent = async (id) => renameId(await repo.findStudent(+id));

export const deleteStudent = async (id) => renameId(await repo.deleteStudent(+id));

export const updateStudent = async (id, data) => renameId(await repo.updateStudent(+id, data));

export const addScore = async (id, exam, score) => repo.updateStudent(+id, {[`scores.${exam}`]: score});

export const findByName = async (name) => (await repo.findByName(name)).map(renameId);

export const countByNames = async (names) => {
    names = Array.isArray(names) ? names : [names];
    return repo.countByNames(names);
}

export const findByMinScore = async (exam, minScore) => (await repo.findByMinScore(exam, +minScore)).map(renameId);

function renameId(student) {
    if (student) {
        student.id = student._id;
        delete student._id;
    }
    return student;
}