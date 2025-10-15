import React from "react";

type AvatarCircleProps = {
  n: number;
  fnct: (n: number) => void;
  selected: boolean;
  size?: number;
};

const AvatarCircle: React.FC<AvatarCircleProps> = ({ n, fnct, selected, size = 48 }) => (
  <div
    onClick={() => fnct(n)}
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      border: selected ? "2px solid #F23CFF" : "2px solid #ccc",
      margin: 4,
      cursor: "pointer",
      boxShadow: selected ? "0 0 8px #F23CFF" : undefined,
      transition: "border 0.2s, box-shadow 0.2s",
      display: "inline-block",
    }}
  >
    <img
      src={`/avatars/${n}.png`}
      alt={`Avatar ${n}`}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

export default AvatarCircle;