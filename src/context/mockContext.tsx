import { createContext } from "react";

export const mockUserContextValue = {
  data: [], // Mock data
  loading: false, // Mock loading status
  error: false, // Mock error status
  addUser: jest.fn(), // Mock addUser function
  addModal: false, // Mock addModal state
  editModal: false, // Mock editModal state
  handleAddModal: jest.fn(), // Mock handleAddModal function
  handleEditModal: jest.fn(), // Mock handleEditModal function
  editItemId: null, // Mock editItemId
  setEditItemId: jest.fn(), // Mock setEditItemId function
  updateUser: jest.fn(), // Mock updateUser function
};

export const UserContext = createContext(mockUserContextValue);
