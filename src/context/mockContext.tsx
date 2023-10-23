import { createContext } from "react";

export const mockUserContextValue = {
  data: [],
  loading: false,
  error: false,
  addUser: jest.fn(),
  addModal: false,
  editModal: false,
  handleAddModal: jest.fn(),
  handleEditModal: jest.fn(),
  editItemId: null,
  setEditItemId: jest.fn(),
  updateUser: jest.fn(),
  notification: false,
  setNotification: jest.fn(),
};

export const UserContext = createContext(mockUserContextValue);
