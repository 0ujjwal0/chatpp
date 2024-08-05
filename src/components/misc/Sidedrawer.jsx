import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../../context/chatprovider";
import Profilemodal from "./profilemodal";
const Sidedrawer = () => {
  const [search, setSearch] = useState("");
  const [searchresult, setSearchresult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingchat, setloadingchat] = useState();
  const {user}=ChatState();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-white flex justify-between">
      <div className="p-4">
        <button>
          <SearchIcon
            fontSize="small"
            className=""
          />
          search
        </button>
      </div>
      <h1 className="p-4 text-xl">Talkie</h1>
      <div className="p-4">
        <button>
          <NotificationsActiveIcon sx={{ marginRight: 1 }} />
        </button>
        <button onClick={toggleDropdown}>
          <div className="flex bg-gray-200 rounded-xl px-3 py-1">
            <Avatar
              alt="Travis Howard"
              src={user.pic}
              sx={{ width: 30, height: 30, marginRight: 1 }}
              name={user.name}
              cursor="pointer"
            />
            <ArrowDropDownOutlinedIcon
              sx={{ fontSize: 30 }}
              className="rounded bg-gray-100 p-1 "
            />
          </div>
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>

              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
      <Profilemodal />
    </div>
  );
};

export default Sidedrawer;
