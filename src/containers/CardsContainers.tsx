import React, { useContext } from "react";
import Card from "../components/Card";
import { UserContext } from "../context/UserDataContext";
import Loading from "../components/Loading";

const CardsContainers = () => {
  const { data, loading, notification } = useContext(UserContext);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto px-4 flex max-[920px]:flex-col flex-row flex-wrap justify-center gap-4 mt-4">
      <Card item={data} />
      {notification && (
        <div
          className="fixed p-auto w-1/2 h-1/4 border-solid border-2 border-gray-500 p-4 rounded-lg shadow-lg transition duration-150 z-50 text-white bg-slate-700"
          aria-live="assertive"
          role="alert"
        >
          <p>New card!</p>
        </div>
      )}
    </div>
  );
};

export default CardsContainers;
