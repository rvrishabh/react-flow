import {
  ArrowLeftIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const SideBar = (props: any) => {
  const { handleLabelChange, selectedNode, nodeLabel, setSelectedNode } = props;

  // Handle drag event
  const handleOnDrag = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex">
      <div className="h-screen border" />
      {selectedNode ? (
        <div className="w-full">
          <div className="flex items-center px-2 py-4 border">
            <div
              onClick={() => {
                // Clear selected node
                setSelectedNode(null);
              }}
              className="cursor-pointer"
            >
              <ArrowLeftIcon className="size-6" />
            </div>
            <div className="w-full text-center">Message</div>
          </div>
          <div className="px-4 py-4">
            <div>Text</div>
            <textarea
              rows={4}
              value={nodeLabel}
              onChange={handleLabelChange}
              placeholder="Enter node label"
              className="w-full border p-2 rounded-lg my-2"
            />
          </div>
          <div className="border-t-2" />
        </div>
      ) : (
        <div className="p-4">
          <div
            draggable
            onDragStart={(e) => handleOnDrag(e, "textNode")}
            className="border border-blue-300 text-blue-300 cursor-pointer flex flex-col gap-1 rounded justify-center items-center px-10 py-4"
          >
            <div>
              <ChatBubbleBottomCenterTextIcon className="size-6" />
            </div>
            Message
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
