import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserDataContext";
import { User } from "../interface";
import { Person, Description, Http } from "@mui/icons-material";

interface EditUserProps {
  item: User;
  onSave: (item: User) => void;
}

const EditUser: React.FC<EditUserProps> = ({ item, onSave }) => {
  const { handleEditModal, setNotification } = useContext(UserContext);
  const [updatedItem, setUpdatedItem] = useState(item);
  const [isFormReady, setIsFormReady] = useState<boolean>(true);
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [websiteError, setWebsiteError] = useState<string | null>(null);

  const btnDisabled = isFormReady ? "bg-green-400" : "bg-gray-300";

  const checkForm = () => {
    if (
      updatedItem.name.length >= 2 &&
      updatedItem.description.length >= 2 &&
      updatedItem.website.length >= 2
    ) {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormReady) {
      onSave(updatedItem);
      handleEditModal();
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));

    if (name === "name") {
      if (value.length >= 3) {
        setNameError(null);
      } else {
        setNameError("Name must be at least 3 characters");
      }
    } else if (name === "description") {
      if (value.length >= 3) {
        setDescriptionError(null);
      } else {
        setDescriptionError("Description must be at least 3 characters");
      }
    } else if (name === "website") {
      if (value.length >= 3) {
        setWebsiteError(null);
      } else {
        setWebsiteError("Website must be at least 3 characters");
      }
    }

    checkForm();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-4 w-full sm:mr-4 flex flex-col">
          <div
            className={`flex flex-row border rounded-lg py-2 px-4 appearance-none leading-normal ${
              nameError === null ? "border-gray-300 " : "border-red-500"
            }`}
          >
            <Person className="pr-2" />
            <input
              className={`bg-white w-full text-gray-700 focus:outline-none focus:shadow-outline focus:shadow-outline`}
              placeholder="Name"
              type="text"
              name="name"
              value={updatedItem.name}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-red-600">{nameError}</p>
        </div>
        <div className="my-4 h-32 w-full sm:mr-4 flex flex-col">
          <div
            className={` h-full flex flex-row border rounded-lg py-2 px-4 appearance-none leading-normal ${
              descriptionError === null ? "border-gray-300 " : "border-red-500"
            }`}
          >
            <Description className="pr-2" />
            <textarea
              className={`bg-white w-full text-gray-700 focus:outline-none focus:shadow-outline focus:shadow-outline`}
              name="description"
              placeholder="Description"
              value={updatedItem.description}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-red-600">{descriptionError}</p>
        </div>
        <div className="my-4 w-full sm:mr-4 flex flex-col">
          <div
            className={`flex flex-row border rounded-lg py-2 px-4 appearance-none leading-normal ${
              websiteError === null ? "border-gray-300 " : "border-red-500"
            }`}
          >
            <Http className="pr-2" />
            <input
              className={`bg-white w-full text-gray-700 focus:outline-none focus:shadow-outline focus:shadow-outline`}
              placeholder="Website"
              type="text"
              name="website"
              value={updatedItem.website}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-red-600">{websiteError}</p>
        </div>
        <div
          className={`my-4 w-1/2 sm:mr-4 flex justify-center border rounded-lg py-2 px-4 appearance-none leading-normal ${btnDisabled} `}
        >
          <button
            type="submit"
            disabled={isFormReady ? false : true}
            data-testid="submit-id"
            className="w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
