import React from "react";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { map } from "lodash";
import { formatDate, formatNumber, getInitial } from "../utils/helpers";
import { Button } from "@mui/joy";

const PaginationMobile = ({
  page: currentPage = 0,
  pageSize,
  totalRecords,
  onPageChange,
}) => {
  const totalPages = Math.ceil((totalRecords || 0) / pageSize);

  if (!totalPages) {
    return null;
  }

  //Calculate the current page record range
  const startRecord = currentPage * formatNumber(pageSize) + 1;
  const endRecord = Math.min(
    (currentPage + 1) * formatNumber(pageSize),
    formatNumber(totalRecords)
  );
  return (
    <Box
      className="Pagination-mobile"
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        py: 2,
      }}
    >
      <IconButton
        aria-label="previous page"
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography level="body-sm" sx={{ mx: "auto" }}>
        {startRecord} - {endRecord} of {totalRecords}
      </Typography>
      <IconButton
        aria-label="next page"
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default PaginationMobile;
