import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import svg from "../assets/gets.svg";

export default function MuiLogo(props) {
  const { sx, ...other } = props;
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...other}
      sx={[
        {
          width: 36,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
        <img src={svg} alt="Logo " width="100%" height="auto" />
      </div>
    </AspectRatio>
  );
}
