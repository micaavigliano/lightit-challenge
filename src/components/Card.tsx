import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserDataContext";
import { Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import EditUser from "./EditUser";
import Modal from "./Modal";
import { User } from "../interface";
import dayjs from "dayjs";

interface CardProps {
  item: User[];
}

const Card: React.FC<CardProps> = ({ item }) => {
  const { editModal, handleEditModal, updateUser } = useContext(UserContext);
  const [itemId, setItemId] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const openEditModal = (itemId: number) => {
    setItemId(itemId);
    handleEditModal();
  };

  const handleUserUpdate = (updatedUser: User) => {
    updateUser(updatedUser);

    handleEditModal();
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const closeModal = () => {
    handleEditModal();
  };

  const formattedDay = (day: string) => {
    const date = dayjs(day).format("MMMM D, YYYY h:mm A");

    return date;
  };

  useEffect(() => {
    if (!editModal) {
      const buttonToFocus = document.querySelector(
        `button[data-item-id="${itemId}"]`
      );

      if (buttonToFocus instanceof HTMLElement) {
        buttonToFocus.focus();
      }
    }
  }, [editModal, itemId]);

  return (
    <>
      {item.map((data: User) => (
        <div
          className="border-solid border-2 h-fit border-gray-500 p-4 rounded-lg shadow-lg transition duration-150 overflow-hidden max-[920px]:w-full w-2/5 container"
          key={data.id}
        >
          <div className="flex max-[920px]:flex-col flex-row">
            <img
              src={data.avatar}
              className="h-32 w-32 rounded-full max-[920px]:m-auto mr-4"
              alt={`${data.name} avatar profile`}
            />
            <div className="w-full max-[920px]:mt-2 m-auto">
              <div>
                <p className="font-bold text-md mb-0 leading-tight tracking-wide">
                  {data.name}
                </p>
                <p className="font-normal text-xs text-gray-600 mt-0">
                  {formattedDay(data.created_at!)}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-md font-medium">Website:</p>
                <a
                  href={data.website}
                  className="underline underline-offset-2 text-violet-600 hover:text-violet-700"
                >
                  {data.website}
                </a>
              </div>
            </div>
            <button
              onClick={() => openEditModal(data.id!)}
              data-item-id={data.id}
              className="h-1/2 m-auto"
              aria-label="edit user profile"
            >
              <Edit />
            </button>
            {editModal && itemId === data.id && (
              <Modal
                isOpen={editModal}
                onClose={closeModal}
                title={"Edit user data"}
              >
                <EditUser item={data} onSave={handleUserUpdate} />{" "}
              </Modal>
            )}
          </div>
          <details className="w-full  mt-4">
            <summary
              className="flex cursor-pointer list-none items-center gap-2"
              onClick={toggleDetails}
            >
              <div>
                {detailsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </div>
              <p>Additional information</p>
            </summary>
            <div className="h-36 border border-dotted overflow-auto">
              <p>{data.description}</p>
            </div>
          </details>
        </div>
      ))}
    </>
  );
};

export default Card;
