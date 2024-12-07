import { Router, Request, Response,NextFunction } from "express";
import { addUserHandler, getUserByIdHandler, getUsersHandler, updateUserHandler, deleteUserHandler } from "../../handlers/User/User.js";
import express from 'express';

const Route = Router();
const app = express();

app.use(express.json());

app.put('/users/:id', updateUserHandler as (request: Request, response: Response) => void
);
Route.get("/", getUsersHandler as (request: Request, response: Response) => void);
Route.get(
  "/:id",
  getUserByIdHandler as (request: Request, response: Response) => void
);
Route.post("/Users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await addUserHandler(req, res);
  } catch (error) {
    next(error); 
  }
});

Route.put("/:id" , updateUserHandler as (request: Request, response: Response) => void
);
Route.delete("/:id", deleteUserHandler as (request: Request, response: Response) => void
);

export default Route;
