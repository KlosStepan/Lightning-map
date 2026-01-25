import React from "react";

type AvatarCircleProps = {
  n: number;
  fnct: (n: number) => void;
  selected: boolean;
  size?: number;
};


const AvatarCircle: React.FC<AvatarCircleProps> = ({ n, fnct, selected, size =  48 }) => (
  <div
    onClick={() => fnct(n)}
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      border: selected ? "2px solid #F23CFF" : "2px solid #fff", // Always white when not selected
      margin: 4,
      cursor: "pointer",
      // boxShadow removed (no glow)
      transition: "border 0.2s",
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src={`/avatars/${n}.png`}
      alt={`Avatar ${n}`}
      style={{
        width: "70%",
        height: "70%",
        objectFit: "contain",
        background: "white",
        display: "block",
        margin: "auto",
      }}
    />
  </div>
);

export default AvatarCircle;