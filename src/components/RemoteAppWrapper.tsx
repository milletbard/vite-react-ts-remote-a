import React from "react";
import "@/App.css";

const RemoteAppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="remote-a-root">
      <div id="remote-a-app">{children}</div>
    </div>
  );
};
export default RemoteAppWrapper;
