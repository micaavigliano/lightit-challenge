import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserDataContext";
import Profile from "../assets/profile-cat.jpeg";
import { Person, Description, Http } from "@mui/icons-material";

const AddUserForm = () => {
  const { addUser, data, handleAddModal, setNotification } =
    useContext(UserContext);
  const [isFormReady, setIsFormReady] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [websiteError, setWebsiteError] = useState<string | null>(null);

  const btnDisabled = isFormReady ? "bg-green-400" : "bg-gray-300";

  const [newUser, setNewUser] = useState({
    avatar: Profile,
    name: "",
    description: "",
    website: "",
    id: data.length + 1,
  });

  const checkForm = () => {
    if (
      newUser.name.length >= 2 &&
      newUser.description.length >= 2 &&
      newUser.website.length >= 2
    ) {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prevItem) => ({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormReady) {
      addUser(newUser);
      setNewUser({
        name: "",
        description: "",
        website: "",
        id: 0,
        avatar: "",
      });
      handleAddModal();
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    }
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
            <Person className="m-auto pr-2" />
            <input
              className={`bg-white w-full text-gray-700 focus:outline-none focus:shadow-outline focus:shadow-outline`}
              type="text"
              data-testid="name-id"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-red-600">{nameError}</p>
        </div>
        <div className="my-4 w-full h-32 sm:mr-4 flex flex-col">
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
              data-testid="desc-id"
              value={newUser.description}
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
            <Http className="m-auto pr-2" />
            <input
              name="website"
              className={`bg-white w-full text-gray-700 focus:outline-none focus:shadow-outline focus:shadow-outline`}
              placeholder="Website"
              data-testid="website-id"
              type="text"
              value={newUser.website}
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

export default AddUserForm;
