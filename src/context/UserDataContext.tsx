import { Dispatch, SetStateAction, createContext } from "react";
import { User } from "../interface";

export type DataContextProps = {
  data: User[];
  loading: boolean;
  error: boolean;
  addUser: (user: User) => void;
  addModal: boolean;
  editModal: boolean;
  handleAddModal: () => void;
  handleEditModal: () => void;
  editItemId: number | null;
  setEditItemId: Dispatch<SetStateAction<number | null>>;
  updateUser: (item: User) => void;
  notification: boolean;
  setNotification: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<DataContextProps>(
  {} as DataContextProps
);
