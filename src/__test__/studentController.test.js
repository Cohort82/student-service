import {describe, expect, jest, afterEach, it} from '@jest/globals';

const mockService = {
    addStudent: jest.fn(),
    findStudent: jest.fn(),
    deleteStudent: jest.fn(),
    updateStudent: jest.fn(),
    addScore: jest.fn(),
    findByName: jest.fn(),
    countByNames: jest.fn(),
    findByMinScore: jest.fn()
};

import request from 'supertest';
import express from 'express';

jest.unstable_mockModule('../service/studentService.js', () => mockService);

const { default: studentRouter } = await import('../routes/studentRoutes.js');
const service = await import('../service/studentService.js');

const app = express();
app.use(express.json());
app.use(studentRouter);

describe('Student Controller Integration Tests', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /student', () => {
        it('should add a student successfully', async () => {
            service.addStudent.mockResolvedValue(true);
            const response = await request(app)
                .post('/student')
                .send({ id: 1, name: 'John Doe', password: 'password123' });
            
            expect(response.status).toBe(204);
            expect(service.addStudent).toHaveBeenCalled();
        });

        it('should return 400 if validation fails', async () => {
            const response = await request(app)
                .post('/student')
                .send({ id: 'invalid', name: 'John Doe' });
            
            expect(response.status).toBe(400);
        });

        it('should return 409 if student already exists', async () => {
            service.addStudent.mockResolvedValue(false);
            const response = await request(app)
                .post('/student')
                .send({ id: 1, name: 'John Doe', password: 'password123' });
            
            expect(response.status).toBe(409);
        });
    });

    describe('GET /student/:id', () => {
        it('should get a student successfully', async () => {
            const mockStudent = { id: 1, name: 'John Doe' };
            service.findStudent.mockResolvedValue(mockStudent);
            const response = await request(app).get('/student/1');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudent);
        });

        it('should return 404 if student not found', async () => {
            service.findStudent.mockResolvedValue(null);
            const response = await request(app).get('/student/999');
            
            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /student/:id', () => {
        it('should delete a student successfully', async () => {
            const mockStudent = { id: 1, name: 'John Doe' };
            service.deleteStudent.mockResolvedValue(mockStudent);
            const response = await request(app).delete('/student/1');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudent);
        });

        it('should return 404 if student not found', async () => {
            service.deleteStudent.mockResolvedValue(null);
            const response = await request(app).delete('/student/999');
            
            expect(response.status).toBe(404);
        });
    });

    describe('PATCH /student/:id', () => {
        it('should update a student successfully', async () => {
            const mockStudent = { id: 1, name: 'John Updated' };
            service.updateStudent.mockResolvedValue(mockStudent);
            const response = await request(app)
                .patch('/student/1')
                .send({ name: 'John Updated' });
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudent);
        });

        it('should return 400 if validation fails', async () => {
            const response = await request(app)
                .patch('/student/1')
                .send({ name: null });
            
            expect(response.status).toBe(400);
        });

        it('should return 404 if student not found', async () => {
            service.updateStudent.mockResolvedValue(null);
            const response = await request(app)
                .patch('/student/999')
                .send({ name: 'John' });
            
            expect(response.status).toBe(404);
        });
    });

    describe('PATCH /score/student/:id', () => {
        it('should add a score successfully', async () => {
            service.addScore.mockResolvedValue(true);
            const response = await request(app)
                .patch('/score/student/1')
                .send({ examName: 'Math', score: 90 });
            
            expect(response.status).toBe(204);
        });

        it('should return 400 if validation fails', async () => {
            const response = await request(app)
                .patch('/score/student/1')
                .send({ examName: 'Math', score: 101 }); // Score max 100
            
            expect(response.status).toBe(400);
        });

        it('should return 404 if student not found', async () => {
            service.addScore.mockResolvedValue(false);
            const response = await request(app)
                .patch('/score/student/999')
                .send({ examName: 'Math', score: 90 });
            
            expect(response.status).toBe(404);
        });
    });

    describe('GET /students/name/:name', () => {
        it('should return students by name', async () => {
            const mockStudents = [{ id: 1, name: 'John' }];
            service.findByName.mockResolvedValue(mockStudents);
            const response = await request(app).get('/students/name/John');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudents);
        });
    });

    describe('GET /quantity/students', () => {
        it('should return student count', async () => {
            service.countByNames.mockResolvedValue(5);
            const response = await request(app).get('/quantity/students?names=John&names=Doe');
            
            expect(response.status).toBe(200);
            expect(response.body).toBe(5);
        });
    });

    describe('GET /students/exam/:exam/minscore/:minScore', () => {
        it('should return students by min score', async () => {
            const mockStudents = [{ id: 1, name: 'John' }];
            service.findByMinScore.mockResolvedValue(mockStudents);
            const response = await request(app).get('/students/exam/Math/minscore/80');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudents);
        });
    });
});
