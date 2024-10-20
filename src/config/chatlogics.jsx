// Function to get the sender's name
export const getSender = (loggedUser, users) => {
  if (!users || users.length < 2 || !loggedUser) return ""; // Check if users and loggedUser are valid
  return users[0]?._id === loggedUser?._id
    ? users[1]?.name || ""
    : users[0]?.name || "";
};

// Function to get the sender's full object
export const getSenderFull = (loggedUser, users) => {
  if (!users || users.length < 2 || !loggedUser) return null; // Check if users and loggedUser are valid
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};
