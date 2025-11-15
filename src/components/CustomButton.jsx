// src/components/CustomButton.jsx
import React from "react";

const CustomButton = ({
  label = "Click Me",
  onClick,
  icon: Icon,
  bgColor = "#D45500",
  textColor = "#fff",
  hoverColor = "#b34400",
  width = "auto",
  height = "auto",
  borderRadius = "8px",
  fontSize = "16px",
  padding = "10px 20px",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ccc" : bgColor,
        color: textColor,
        border: "none",
        borderRadius,
        fontSize,
        padding,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width,
        height,
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.target.style.backgroundColor = hoverColor;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.target.style.backgroundColor = bgColor;
      }}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default CustomButton;
