import express, { Request, Response } from 'express';
import { User } from "./types/User";
import { ErrorTypes } from "./types/ErrorTypes";
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 3000;
const usersEndpoint = process.env.USERS_ENDPOINT || 'users';

let users: User[] = [
  {id: 1, name: 'Georgiy Cherdak', username: 'zxcCuresed'},
  {id: 2, name: 'Vlad CherPak', username: 'Polovnik'},
];
let nextUserId = 3;

const app = express();
app.use(express.json());

app.get(usersEndpoint, (req: Request, res: Response) => {
  return res.json(users);
});

app.post(usersEndpoint, (req: Request, res: Response) => {
  const { username, name } = req.body;

  if (!username) {
    return generateError(ErrorTypes.NO_USERNAME_ERROR, res);
  }

  const newUser: User = {
    id: nextUserId++,
    username,
    name,
  };

  users.push(newUser);

  return res.status(201).json(newUser);
});

app.get(`${usersEndpoint}/:id`, (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(user => user.id === +id);

  return user ? res.json(user) : generateError(ErrorTypes.USER_NOT_FOUND, res);
});

app.put(`${usersEndpoint}/:id`, (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, name } = req.body;
  const user = users.find(user => user.id === +id);

  if (!user) {
    return generateError(ErrorTypes.USER_NOT_FOUND, res);
  }

  user.username = username || user.username;
  user.name = name || user.name;

  return res.json(user);
});

app.delete(`${usersEndpoint}/:id`, (req: Request, res: Response) => {
  const { id } = req.params;
  let deletedUser: null | User = null
  const filteredArray = users.filter(user => {
    if (user.id === +id) {
      deletedUser = user;

      return false;
    }

    return true
  })

  users = filteredArray;

  return deletedUser ? res.json(deletedUser) : generateError(ErrorTypes.USER_NOT_FOUND, res);
});

const generateError = (error: ErrorTypes, response: Response) => {
  switch (error) {
    case ErrorTypes.NO_USERNAME_ERROR:
      return response.status(404).json({ error: 'Username is required' })

      case ErrorTypes.USER_NOT_FOUND:
      return response.status(404).json({ error: 'User not found' })
  }
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});