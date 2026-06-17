// The Arrange, Act, Assert (AAA) pattern in TDD unit testing involves three steps:
// Arrange (setting up the test environment),
// Act (executing the code under test),
// and Assert (verifying the expected outcome).
// This pattern helps in writing clear, maintainable, and effective unit tests.

import {jest, beforeEach, describe, it, expect} from '@jest/globals';
import {countStudentsByNames, findStudentsByMinScore, findStudentsByName} from "../repository/studentRepository.js";

const mockRepo = {
    createStudent: jest.fn(),
    findStudentById: jest.fn(),
    deleteStudentById: jest.fn(),
    updateStudent: jest.fn(),
    findStudentsByName: jest.fn(),
    countStudentsByNames: jest.fn(),
    findStudentsByMinScore: jest.fn()
}

jest.unstable_mockModule('../repository/studentRepository', () => mockRepo);

const studentService = await import('../service/studentService.js');

beforeEach(() => {
    jest.clearAllMocks();
})

describe('Student Service', () => {
    it('addStudent returns false when student already exists', async () => {
        // Arrange
        mockRepo.findStudentById.mockResolvedValue({_id: 1});
        // Act
        const result = await studentService.addStudent({
            id: 1,
            name: 'John Doe',
            password: 'secret'
        });
        // Assert
        expect(result).toBeFalsy();
        expect(mockRepo.createStudent).not.toHaveBeenCalled();
        expect(mockRepo.findStudentById).toHaveBeenCalledWith(1);
    })
    it('addStudent returns true when student does not exists', async () => {
        // Arrange
        mockRepo.findStudentById.mockResolvedValue(null);
        // Act
        const result = await studentService.addStudent({
            id: 2,
            name: 'Bob',
            password: '1234'
        });
        // Assert
        expect(result).toBeTruthy();
        expect(mockRepo.createStudent).toHaveBeenCalledWith({
            _id: 2,
            name: 'Bob',
            password: '1234'
        });
        expect(mockRepo.findStudentById).toHaveBeenCalledWith(2);
    })
    it('findStudent delegates to repository', async () => {
        const student = {
            id: 1,
            name: 'John Doe',
            password: 'secret'
        }
        mockRepo.findStudentById.mockResolvedValue(student);

        const result = await studentService.findStudent(1);

        expect(result).toEqual(student);
        expect(mockRepo.findStudentById).toHaveBeenCalledWith(1);
    })
    it('deleteStudent delegates to repository', async () => {
        const student = {
            id: 3,
            name: 'John Doe',
            password: 'secret'
        }
        mockRepo.deleteStudentById.mockResolvedValue(student);

        const result = await studentService.deleteStudent(3);

        expect(result).toEqual(student);
        expect(mockRepo.deleteStudentById).toHaveBeenCalledWith(3);
    })
    it('updateStudent returns updated student without scores', async () => {
        const toObject = jest.fn().mockReturnValue({
            id: 5,
            name: 'Peter',
            password: 'secret',
            scores: {Math: 90}
        });
        mockRepo.updateStudent.mockResolvedValue({toObject});

        const result = await studentService.updateStudent(5, {name: 'Peter'});
        expect(result).toEqual({
            id: 5,
            name: 'Peter',
            password: 'secret',
            scores: undefined
        })
        expect(toObject).toHaveBeenCalled();
    })
})