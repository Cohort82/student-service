import * as repo from "../repository/studentRepository.js";

export const addStudent = async ({id, name, password}) => {
    return repo.addStudent({id, name, password});
}

export const findStudent = async (id) => repo.findStudent(+id);

export const deleteStudent = async (id) => repo.deleteStudent(+id);

export const updateStudent = async (id, data) => repo.updateStudent(+id, data);

export const addScore = async (id, exam, score) => repo.updateStudent(+id, {[`scores.${exam}`]: score});

export const findByName = async (name) => repo.findByName(name);

export const countByNames = async (names) => {
    names = Array.isArray(names) ? names : [names];
    return repo.countByNames(names);
}

export const findByMinScore = async (exam, minScore) => repo.findByMinScore(exam, +minScore);
