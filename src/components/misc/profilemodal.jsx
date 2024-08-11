import React from "react";

const Profilemodal = ({
  user,
  showModal,
  setShowModal,
 
}) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="flex justify-center items-center fixed inset-0 z-50">
          <div
            className="fixed inset-0  bg-black opacity-50 "
            onClick={closeModal}
          ></div>

          <div className="relative flex flex-col w-full max-w-md mx-auto bg-white rounded-lg z-50 p-4 ">
            <div className="flex items-center justify-end mb-4">
              <button
                className="text-black text-2xl outline-none focus:outline-none"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4 mb-4 h-full">
              <img
                className="rounded-full w-36 h-36 object-cover bg-violet-300 border border-violet-400 shadow-xl shadow-violet-300"
                src={user.pic}
                alt=""
              />
              <div className="bg-gradient-to-bl from-violet-200 to-gray-200 w-full flex-grow rounded-xl p-2 shadow-xl shadow-violet-300 border border-b-violet-400">
                <p className="text-3xl m-2 leading-0 font-semibold text-violet-500 ">
                  {user.name}
                </p>
                <p className="text-lg m-2 text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profilemodal;
