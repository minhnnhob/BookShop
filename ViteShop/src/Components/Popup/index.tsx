import React from "react";

interface PopupProps {
    children: React.ReactNode;
}

export default function Popup({ children }: PopupProps) {
    <div
    className="fixed-top"
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <div
      className="row"
      style={{
        backgroundColor: "#FFFFFF",
        maxWidth: "60vw",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      <div className="p-30">{children}</div>
    </div>
  </div>

}