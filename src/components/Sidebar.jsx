import React, { useState } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import { closeSidebar, getUser, removeToken } from "../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { map, upperFirst } from "lodash";
import { MENU_LIST } from "../utils/constants";
import { Avatar } from "@mui/joy";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const onNavigate = (url) => {
    navigate(url);
  };

  const userInfo = getUser();
  const { email, first_name = "", last_name } = userInfo || {};

  const logOut = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <Sheet
      className="Sidebar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: isHovered ? "220px" : "70px",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        {isHovered ? <Typography level="title-lg">GETS</Typography> : null}
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {map(MENU_LIST, ({ name, icon: Icon, url }) => {
            return (
              <ListItem key={name}>
                <ListItemButton
                  selected={pathname === url}
                  onClick={() => onNavigate(url)}
                >
                  <Icon />
                  {isHovered && (
                    <ListItemContent>
                      <Typography level="title-sm">{name}</Typography>
                    </ListItemContent>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="outlined" size="sm">
          {first_name.charAt(0)?.toUpperCase()}
        </Avatar>
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <Typography level="title-sm">
            {upperFirst(first_name)} {upperFirst(last_name.charAt(0))}.
          </Typography>
        </Box>
        {isHovered ? (
          <IconButton
            onClick={logOut}
            size="sm"
            variant="plain"
            color="neutral"
          >
            <LogoutRoundedIcon />
          </IconButton>
        ) : null}
      </Box>
    </Sheet>
  );
}
