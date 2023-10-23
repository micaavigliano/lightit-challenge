import React from "react";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserDataContext";
import { AddCircle } from "@mui/icons-material";
import AddUserForm from "../components/AddUserForm";
import Modal from "../components/Modal";

const Header = () => {
  const { addModal, handleAddModal } = useContext(UserContext);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const openModal = () => {
    handleAddModal();
  };

  const closeModal = () => {
    handleAddModal();
  };

  useEffect(() => {
    if (!addModal) {
      buttonRef.current?.focus();
    }
  }, [addModal]);

  return (
    <header className="w-screen bg-slate-700 p-6">
      <nav className="flex flex-row justify-between">
        <h1 className="text-white text-2xl">Patient Data Management</h1>
        <button
          className="text-white p-2 flex align-center gap-2 border rounded-lg border-white"
          onClick={openModal}
          ref={buttonRef}
        >
          <span>Add New User</span>
          <AddCircle />
        </button>
        <Modal isOpen={addModal} onClose={closeModal} title="Add new user">
          <AddUserForm />
        </Modal>
      </nav>
    </header>
  );
};

export default Header;
