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
    let student = repo.deleteStudent(+id);
    if (student) {
        student.password = undefined;
    }
    return student;
}

export const updateStudent = async (id, data) => {
    let student = repo.findStudent(+id);
    if (student) {
        student = {...student, ...data};
        student = {...repo.updateStudent(student)};
        student.scores = undefined;
    }
    return student;
}

export const addScore = async (id, exam, score) => {
    const student = repo.findStudent(+id);
    if (student) {
        student.scores[exam] = score;
        repo.updateStudent(student);
    }
    return student;
}

export const findByName = async (name) => repo.findByName(name).map(s => ({...s, password: undefined}));

export const countByNames = async (names) => {
    names = Array.isArray(names) ? names : [names];
    return repo.countByNames(names);
}

export const findByMinScore = async (exam, minScore) => repo.findByMinScore(exam, minScore).map(s => ({
    ...s,
    password: undefined
}));
