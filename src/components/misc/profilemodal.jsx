import React from "react";

const Profilemodal = ({ user, showModal, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="flex justify-center items-center fixed inset-0 z-50">
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative flex flex-col w-full max-w-md mx-auto bg-white rounded-lg z-50 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Profile</h3>
              <button
                className="text-black text-2xl outline-none focus:outline-none"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center space-y-4 mb-4">
              <img
                className="rounded-full w-36 h-36 object-cover"
                src={user.pic}
                alt={user.name}
              />
              <p className="text-lg">{user.name}</p>
              <p className="text-lg">{user.email}</p>
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profilemodal;
