import React, { ChangeEvent, useState } from 'react';
import PassIcon from "../icons/PassIcon";
import UserIcon from "../icons/UserIcon";
import { useNavigate } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';
import { User } from '../types';

function LoginScreen() {

  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<User>();
  //const [showTaskBoard, setShowTaskBoard] = useState(false);

  const navigate = useNavigate();

  const handleLoginBlur = () => {
    setEditMode((prev) => !prev);
  }

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleLoginClick = () => {

    const userToValidate:User = {
      userName: userName,
      userPass: password,
    };

    setUser(userToValidate);

    console.log("Username: " + userName);
    console.log("Password: " + password);

    // Validate user information at API endpoint 'validateUser'
    fetch("http://localhost:9090/validate-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userToValidate)
  })
  .then(response => {
    if (response.ok) {
      // User validated, navigate to '/task-board'
      navigate('/task-board');
    } else if (response.status === 401) {
      // Unauthorized - display an error message
      console.log("Invalid password");
      // You can show an error message to the user or handle it accordingly
    } else if (response.status === 404) {
      // User not found - display an error message
      console.log("User not found");
      // You can show an error message to the user or handle it accordingly
    } else {
      // Other error - display a generic error message
      console.log("An error occurred");
      // You can show a generic error message to the user or handle it accordingly
    }
  })
  .catch(error => {
    console.error("Error:", error);
    // Handle network errors or fetch-related issues
  });
  }

  
  return (
    <div className="
      m-auto
      flex
      flex-col
      py-40
      w-full
      min-h-screen
      items-center
      text-center
      overflow-x-auto
      overflow-y-hidden
      px-[20px]
      bg-pageBackgroundColor
    ">
      <div className="
        bg-columnBackgroundColor
        w-[350px]
        h-[400px]
        max-h-[500px]
        rounded-xl
        flex
        flex-col
        p-8
      ">
        <div className="
          px-[13px]
          text-[32px]
          text-mainAccentColor
          text-left
          font-bold
        ">
          Log in
            <div className="
            text-[18px]
            text-mainAccentColor
            text-left
            font-medium
            ">
              to get productive</div>
        </div>
        
        <div className="
          flex
          flex-col
          p-2
        ">
          <div className="flex items-center mb-4">
            <input className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              w-[270px]
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              placeholder-mainAccentColor
              placeholder-opacity-50
              mt-8
            "
            placeholder="Username" 
            value={userName}
            onChange={handleUserName}
            onClick={() => { 
              setEditMode(true); 
            }}/>
          </div>
          <div className="flex items-center mb-6">
            <input className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              w-[270px]
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              placeholder-mainAccentColor
              placeholder-opacity-50
            "
            placeholder="Password" 
            value={password}
            onChange={handlePassword}
            onClick={() => { 
              setEditMode(true); 
            }}/>
          </div>
        </div>
        <div>
          <button className="
            border-2
            px-10
            py-2
            rounded-xl
            border-mainAccentColor
            border-opacity-50
            hover:bg-mainAccentColor
            hover:text-columnBackgroundColor
          "
          onClick={handleLoginClick}
          >Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
