import request from 'supertest';
import app from '../app';
import { sequelize } from '../models';
import User from '../models/User';

describe('User Integration Tests', () => {
    
    beforeAll(async () => {
        await sequelize.authenticate();
        await User.destroy({ where: {}, truncate: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    let userId: number;

    // 1. Teste de Criação (POST)
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                firstName: "Diego",
                lastName: "Portella",
                age: 30,
                email: "diego.test@example.com"
            });

        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.firstName).toBe("Diego");
        
        userId = response.body.user.id;
    });

    // 2. Teste de Listagem (GET ALL)
    it('should list all users', async () => {
        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    // 3. Teste de Busca por ID (GET BY ID)
    it('should get a user by ID', async () => {
        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.email).toBe("diego.test@example.com");
    });

    // 4. Teste de Atualização (PUT)
    it('should update a user', async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .send({
                firstName: "Diego Updated",
                age: 31
            });

        expect(response.status).toBe(200);
        
        const updatedUser = await request(app).get(`/users/${userId}`);
        expect(updatedUser.body.firstName).toBe("Diego Updated");
        expect(updatedUser.body.age).toBe(31);
    });

    // 5. Teste de Erro (Email duplicado)
    it('should not allow duplicate emails', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                firstName: "Diego",
                lastName: "Clone",
                age: 25,
                email: "diego.test@example.com"
            });

        expect(response.status).toBe(400);
    });

    // 6. Teste de Exclusão (DELETE)
    it('should delete a user', async () => {
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.status).toBe(200);

        const check = await request(app).get(`/users/${userId}`);
        expect(check.status).toBe(404);
    });
});