import { useState } from "react";

import ChatButton from "./ChatButton";
import ChatBox from "./Chatbox";
function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <ChatBox onClose={() => setOpen(false)} />
      ) : (
        <ChatButton onClick={() => setOpen(true)} />
      )}
    </>
  );
}

export default ChatWidget;
