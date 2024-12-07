import { Request, Response } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../../database/service/UserService/UserService.js";
import { IAddUser, IUser } from "@/types/User.t.js";  
import { TResponse } from "@/types/index.js";
import { z } from 'zod';


const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1, "Name must not be empty").optional(),
  username: z.string().min(1, "Name must not be empty").optional(),
});

export const getUsersHandler = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  if (page <= 0 || pageSize <= 0) {
    return res.status(400).send({
      success: false,
      data: null,
      error: { message: "Invalid pagination parameters. 'page' and 'pageSize' must be positive integers." }
    });
  }

  try {
    const users = await getUsers(page, pageSize);
    
    if (!users || users.length === 0) {
      return res.status(404).send({
        success: false,
        data: null,
        error: { message: "No users found." }
      });
    }

    return res.status(200).send({
      success: true,
      data: users,
      error: null
    });
  } catch (error) {

    return res.status(500).send({
      success: false,
      data: null,
      error: { message: "Internal Server Error", details: error.message || error }
    });
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        error: { message: "User not found", details: { id } }
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
      error: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      error: { message: "Internal Server Error", details: error }
    });
  }
};

export const addUserHandler = (
  request: Request<{}, {}, IAddUser>,
  response: Response<TResponse<IUser>>
) => {
  try {
    return response.status(201).send({
      data: {
        id:3,
        name: "Kamalia",
        username: "@Kamalia",
        email: "Kamalia@mail.com",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      error: null,
      success: true,
    });
  } catch (error) {
    return response.status(500).send({
      data: null,
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      data: null,
      error: { message: "Invalid ID provided. ID must be a positive integer." }
    });
  }

  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: "Invalid update data provided",
        details: result.error.flatten() 
      }
    });
  }

  const updates: Partial<IUser> = result.data;

  try {
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        data: null,
        error: { message: "User not found", details: { id } }
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedUser,
      error: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      error: { message: "Internal Server Error", details: error }
    });
  }
};


export const deleteUserHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      data: null,
      error: { message: "Invalid ID provided. ID must be a positive integer." }
    });
  }

  try {
    const success = await deleteUser(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        data: null,
        error: { message: "User not found", details: { id } }
      });
    }

    return res.status(200).json({
      success: true,
      data: null,
      error: null
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      data: null,
      error: { message: "Internal Server Error", details: error.message || error }
    });
  }
};
