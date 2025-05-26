import React from "react";

const SidebarItem = ({ setSection, currentSection, section, icon }) => {
    return (
      <div
        onClick={() => setSection(section)}
        className={`flex items-center gap-2 p-2 hover:bg-[#e9ebee] rounded cursor-pointer ${
          currentSection === section ? "bg-[#ecf3ff] text-[#4861ff]" : ""
        }`}
      >
        <span className={`${currentSection === section ? "text-[#4861ff]" : 'text-[#838b97]'}`}>{icon}</span>
        <span className={`w-5 h-5 ${currentSection === section ? "text-[#4861ff]" : "text-[#838b97]"}`}>
          {section}
        </span>
      </div>
    );
  };

  
  export default SidebarItem