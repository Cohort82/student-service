import * as repo from "../repository/studentRepository.js";

export const addStudent = async ({id, name, password}) => {
    return repo.addStudent({id, name, password});
}

export const findStudent = async (id) => {
    let student = repo.findStudent(+id);
    if (student) {
        student = {...student};
        student.password = undefined;
    }
    return student;
}

export const deleteStudent = async (id) => {
    // TODO: Implement deleteStudent
}

export const updateStudent = async (id, data) => {
    // TODO: Implement updateStudent
}

export const addScore = async (id, exam, score) => {
    // TODO: Implement addScore
}

export const findByName = async (name) => {
    // TODO: Implement findByName
}

export const countByNames = async (names) => {
    // TODO: Implement countByNames
}

export const findByMinScore = async (exam, minScore) => {
    // TODO: Implement findByMinScore
}