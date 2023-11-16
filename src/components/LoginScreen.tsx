import React, { useState } from 'react';
import PassIcon from "../icons/PassIcon";
import UserIcon from "../icons/UserIcon";

function LoginScreen() {

  const [editMode, setEditMode] = useState(false);

  const handleLoginBlur = () => {
    setEditMode((prev) => !prev);
  }

  // if (editMode) {
  //   return (
  //     <div className="
  //     m-auto
  //     flex
  //     flex-col
  //     py-40
  //     w-full
  //     min-h-screen
  //     items-center
  //     text-center
  //     overflow-x-auto
  //     overflow-y-hidden
  //     px-[20px]
  //     bg-pageBackgroundColor
  //   ">
  //     <div className="
  //       bg-columnBackgroundColor
  //       w-[350px]
  //       h-[400px]
  //       max-h-[500px]
  //       rounded-xl
  //       flex
  //       flex-col
  //       p-8
  //     ">
  //       <div className="
  //         px-[13px]
  //         text-[32px]
  //         text-mainAccentColor
  //         text-left
  //         font-bold
  //       ">
  //         Log in
  //           <div className="
  //           text-[18px]
  //           text-mainAccentColor
  //           text-left
  //           font-medium
  //           ">
  //             to get productive</div>
  //       </div>
        
  //       <div className="
  //         flex
  //         flex-col
  //         p-2
  //       ">
  //         <div className="flex items-center mb-4">
  //           <input className="
  //             bg-black
  //             text-md
  //             h-[60px]
  //             w-[270px]
  //             rounded-xl
  //             font-bold
  //             text-mainAccentColor
  //             p-5
  //             flex
  //             items-center
  //             justify-between
  //             placeholder-mainAccentColor
  //             placeholder-opacity-50
  //             mt-8
  //           "
  //           placeholder="Username" 
  //           onClick={() => { 
  //             setEditMode(true); 
  //           }}
  //           onBlur={handleLoginBlur}
  //           />
  //         </div>
  //         <div className="flex items-center mb-6">
  //           <input className="
  //             bg-black
  //             text-md
  //             h-[60px]
  //             w-[270px]
  //             rounded-xl
  //             font-bold
  //             text-mainAccentColor
  //             p-5
  //             flex
  //             items-center
  //             justify-between
  //             placeholder-mainAccentColor
  //             placeholder-opacity-50
  //           "
  //           placeholder="Password" 
  //           onBlur={handleLoginBlur}/>
  //         </div>
  //       </div>
  //       <div>
  //         <button className="
  //           border-2
  //           px-10
  //           py-2
  //           rounded-xl
  //           border-mainAccentColor
  //           border-opacity-50
  //           hover:bg-mainAccentColor
  //           hover:text-columnBackgroundColor
  //         ">Login</button>
  //       </div>
  //     </div>
  //   </div>

  //   )
  // }
  
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
          ">Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
