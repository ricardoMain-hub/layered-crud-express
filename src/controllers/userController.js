import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../models/userModel.js";

// Standarized Response Function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User Created Successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users Fetched Successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return handleResponse(res, 404, "User Not Found!");
    handleResponse(res, 200, "Users Fetched Successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const updateUsers = await updateUserService(req.params.id, name, email);
    if (!updateUsers) return handleResponse(res, 404, "User Not Found!");
    handleResponse(res, 200, "Users Update Successfully", updateUsers);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const removeUser = await deleteUserService(req.params.id);
    if (!removeUser) return handleResponse(res, 404, "User Not Found!");
    handleResponse(res, 200, "Users Delete Successfully", removeUser);
  } catch (error) {
    next(error);
  }
};
