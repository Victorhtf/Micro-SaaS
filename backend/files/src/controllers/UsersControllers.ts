import { Request, Response } from 'express';
import prismaClient from '../utils/PrismaClient';

class Users {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await prismaClient.user.findMany();

      return res.status(200).json({
        message: 'Users listed successfully',
        data: users,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Failed to retrieve users',
          error: error.message,
        });
      }
      return res.status(500).json({
        message: 'An unknown error occurred',
      });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUniqueOrThrow({
        where: { id: id },
      });
      return res.status(200).json({
        message: 'User listed successfully',
        data: user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({
          message: 'User not found',
          error: error.message,
        });
      }
      return res.status(500).json({
        message: 'An unknown error occurred',
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, lastName, username, company, email } = req.body;
      const user = await prismaClient.user.create({
        data: {
          name,
          lastName,
          username,
          company,
          email,
          isActive: true,
        },
      });
      return res.status(201).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Failed to create user',
          error: error.message,
        });
      }
      return res.status(500).json({
        message: 'An unknown error occurred',
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await prismaClient.user.update({
        where: { id },
        data: updates,
      });
      return res.status(200).json({
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Failed to update user',
          error: error.message,
        });
      }
      return res.status(500).json({
        message: 'An unknown error occurred',
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedUser = await prismaClient.user.delete({
        where: { id },
      });
      return res.status(200).json({
        message: 'User deleted successfully',
        data: deletedUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Failed to delete user',
          error: error.message,
        });
      }
      return res.status(500).json({
        message: 'An unknown error occurred',
      });
    }
  }
}

export default Users;
