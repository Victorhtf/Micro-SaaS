import { Request, Response } from 'express';
import UsersController from '../controllers/UsersControllers';
import prismaClient from '../utils/PrismaClient';

jest.mock('../utils/PrismaClient', () => ({
  user: {
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Users controller', () => {
  test('Should receive a list of all users', async () => {
    const expectedUsers = [
      {
        id: '66ccf0ed8e1b49225696a77c',
        name: 'Jhon',
        lastName: 'Doe',
        username: 'JhonDoe',
        password: 'Jhon123@',
        company: 'Javascript',
        email: 'jhon@hotmail.com',
        isActive: true,
        createdAt: '2024-08-26T21:17:33.366Z',
        updatedAt: '2024-08-26T21:17:33.366Z',
      },
    ];

    // PrismaClient mock for return expectedUsers
    (prismaClient.user.findMany as jest.Mock).mockResolvedValue(expectedUsers);

    const req = {} as unknown as Request;
    // Response mock
    const res = {
      status: jest.fn().mockReturnThis(), // To allow nesting
      json: jest.fn(),
    } as unknown as Response;

    await UsersController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Users listed successfully',
      data: expectedUsers,
    });
  });

  test('Should receive an object for one user', async () => {
    const expectedUser = {
      id: '66ccf0ed8e1b49225696a77c',
      name: 'Jhon',
      lastName: 'Doe',
      username: 'JhonDoe',
      password: 'Jhon123@',
      company: 'Javascript',
      email: 'jhon@hotmail.com',
      isActive: true,
      createdAt: '2024-08-26T21:17:33.366Z',
      updatedAt: '2024-08-26T21:17:33.366Z',
    };

    // PrismaClient mock for return expectedUser
    (prismaClient.user.findUniqueOrThrow as jest.Mock).mockResolvedValue(
      expectedUser
    );

    // Response mock
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Request mock
    const req = {
      params: { id: '66ccf0ed8e1b49225696a77c' },
    } as unknown as Request;

    await UsersController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: 'User listed successfully',
      data: expectedUser,
    });
  });

  test('Should create an user', async () => {
    const expectedCreatedUser = {
      id: '66cdd1e0026690670c40edc0',
      name: 'Jhon',
      lastName: 'Doe',
      username: 'JhonDoe',
      password: 'Jhon123@',
      company: 'Javascript',
      email: 'jhon@hotmail.com',
      isActive: true,
      createdAt: '2024-08-27T13:17:20.341Z',
      updatedAt: '2024-08-27T13:17:20.341Z',
    };

    (prismaClient.user.create as jest.Mock).mockResolvedValue(
      expectedCreatedUser
    );

    const req = {
      body: {
        name: 'Jhon',
        lastName: 'Doe',
        username: 'JhonDoe',
        password: 'Jhon123@',
        company: 'Javascript',
        email: 'jhon@hotmail.com',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await UsersController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      data: expectedCreatedUser,
    });
  });

  test('Should update user', async () => {
    const expectedUpdatedUser = {
      id: '66cdd1e0026690670c40edc0',
      name: 'John',
      lastName: 'Doe',
      username: 'JohnDoeUpdated',
      company: 'NewCompany',
      email: 'johnupdated@hotmail.com',
      isActive: true,
      createdAt: new Date('2023-08-01T12:00:00Z'),
      updatedAt: new Date(),
    };

    (prismaClient.user.update as jest.Mock).mockResolvedValue(
      expectedUpdatedUser
    );

    const req = {
      params: { id: '66ce0f4ef268adc8b59a9a2b' },
      body: {
        name: 'John',
        lastName: 'Doe',
        username: 'JohnDoeUpdated',
        company: 'NewCompany',
        email: 'johnupdated@hotmail.com',
        isActive: true,
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await UsersController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: 'User updated successfully',
      data: expectedUpdatedUser,
    });
  });

  test('Should delete user', async () => {
    const expectedDeletedUSer = {
      id: '66ccf0ed8e1b49225696a77c',
      name: 'Jhon',
      lastName: 'Doe',
      username: 'JhonDoe',
      password: 'Jhon123@',
      company: 'Javascript',
      email: 'jhon@hotmail.com',
      isActive: true,
      createdAt: '2024-08-26T21:17:33.366Z',
      updatedAt: '2024-08-26T21:17:33.366Z',
    };

    (prismaClient.user.delete as jest.Mock).mockResolvedValue(
      expectedDeletedUSer
    );

    const req = {
      params: { id: '66ccf0ed8e1b49225696a77c' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await UsersController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: 'User deleted successfully',
      data: expectedDeletedUSer,
    });
  });
});
