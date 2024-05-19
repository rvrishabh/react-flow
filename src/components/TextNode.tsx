import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Handle, NodeProps, Position } from "reactflow";

const TextNode = ({ data: { label } }: NodeProps<{ label: string }>) => {
  return (
    <div className="border rounded-lg text-xs w-44">
      <div className="flex gap-3 border-b rounded-t-lg px-2 py-2 bg-green-200">
        <div>
          <ChatBubbleBottomCenterTextIcon className="size-4" />
        </div>
        <h4 className="font-semibold">Send Message</h4>
      </div>
      <div>
        <div className="p-2 ">{label}</div>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default TextNode;
