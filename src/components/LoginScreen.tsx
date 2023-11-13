import React from 'react';
import PassIcon from "../icons/PassIcon";
import UserIcon from "../icons/UserIcon";

function LoginScreen() {
  return (
    <div className="
      m-auto
      flex
      flex-col
      py-20
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
        h-[500px]
        max-h-[500px]
        rounded-xl
        flex
        flex-col
        p-8
        shadow-xl
        shadow-mainAccentColor
      ">
        <div className="
          py-[50px]
          text-[30px]
          text-mainAccentColor
          text-center
          font-bold
        ">
          Minimal Todo
        </div>
        <div className="
          flex
          flex-col
          p-2
        ">
          <div className="flex items-center mb-4">
            <UserIcon />
            <input className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              cursor-grab
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              justify-between
              placeholder-mainAccentColor
              placeholder-opacity-50
            "
            placeholder="Username" />
          </div>
          <div className="flex items-center mb-8">
            <PassIcon />
            <input className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              cursor-grab
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              justify-between
              placeholder-mainAccentColor
              placeholder-opacity-50
            "
            placeholder="Password" />
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
          ">Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
