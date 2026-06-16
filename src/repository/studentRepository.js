import Student from "../model/student.js";

const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudent = id => students.get(id);

export const deleteStudent = id => {
    const student = students.get(id);
    students.delete(id);
    return student;
}

export const updateStudent = (student) => {
    if (students.has(student.id)) {
        students.set(student.id, student);
        return student;
    }
}

export const findByName = name => [...students.values()].filter(s => s.name.toLowerCase() === name.toLowerCase());


export const countByNames = names => {
    console.log(Array.isArray(names));
    names = names.map(n => n.toLowerCase());
    return [...students.values()].filter(s => names.includes(s.name.toLowerCase())).length;
}

export const findByMinScore = (exam, minScore) => [...students.values()].filter(s => s.scores[exam] >= minScore);