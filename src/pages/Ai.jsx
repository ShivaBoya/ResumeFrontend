import React, { useState } from "react";

function OpenCopilotButton() {
  const [showInfo, setShowInfo] = useState(false);

  const openCopilot = () => {
    // Open GitHub Copilot documentation / dashboard / codespace in new tab
    window.open("https://github.com/features/copilot", "_blank", "width=1200,height=800");
  };

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        onClick={openCopilot}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition duration-300"
      >
        Open Copilot
      </button>

      {/* Dynamic info tooltip */}
      {showInfo && (
        <div className="absolute top-full mt-2 w-64 p-4 bg-white border rounded shadow-lg z-10">
          <h3 className="font-semibold text-gray-800 mb-2">Resume Builder + Copilot</h3>
          <p className="text-gray-700 text-sm mb-2">
            GitHub Copilot can assist you in writing your Resume Builder code faster by providing
            AI-powered code suggestions, examples, and automation.
          </p>
          <p className="text-gray-600 text-xs">
            Click the button to open Copilot documentation and start integrating smart code suggestions into your project.
          </p>
        </div>
      )}
    </div>
  );
}

export default OpenCopilotButton;
