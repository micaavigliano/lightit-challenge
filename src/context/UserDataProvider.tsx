import React, { ReactNode, useState, useEffect } from "react";
import { UserContext } from "./UserDataContext";
import useDataFetching from "../hook/useDataFetching";
import { User } from "../interface";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data, loading, error } = useDataFetching(
    "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users"
  );
  const [userData, setUserData] = useState<User[]>(data);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  const addUser = (user: User) => {
    const updatedData = [user, ...userData];

    setUserData(updatedData);
  };

  const updateUser = (updatedUser: User) => {
    const updatedData = userData.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      }
      return user;
    });

    setUserData(updatedData);
  };

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  const handleEditModal = () => {
    setEditModal(!editModal);
  };

  return (
    <UserContext.Provider
      value={{
        data: userData,
        loading,
        error,
        addUser,
        addModal,
        editModal,
        handleAddModal,
        updateUser,
        handleEditModal,
        editItemId,
        setEditItemId,
        notification,
        setNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
