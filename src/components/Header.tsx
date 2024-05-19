import React from "react";

const Header = ({ saveChanges, emptyFlow }: any) => {
  return (
    <div className="w-screen h-14 bg-slate-300 flex justify-end items-center gap-2 pr-6">
      <button
        onClick={saveChanges}
        className="border border-blue-500 rounded-lg p-2"
      >
        Save Changes
      </button>
      <button
        className="border border-red-500 rounded-lg p-2"
        onClick={emptyFlow}
      >
        Empty Flow
      </button>
    </div>
  );
};

export default Header;
