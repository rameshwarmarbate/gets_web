import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Pagination = ({
  page: currentPage = 0,
  pageSize,
  totalRecords,
  onPageChange,
}) => {
  const totalPages = Math.ceil((totalRecords || 0) / pageSize);

  let pagination = [],
    i = 1;

  while (i <= totalPages) {
    if (
      i <= 3 || //the first three pages
      i >= totalPages - 2 || //the last three pages
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      //the currentPage, the page before and after
      pagination.push(i);
      i++;
    } else {
      //any other page should be represented by ...
      pagination.push("...");
      //jump to the next page to be linked in the navigation
      i = i < currentPage ? currentPage - 1 : totalPages - 2;
    }
  }
  if (!totalPages) {
    return null;
  }

  // Calculate the current page record range
  //   const startRecord = currentPage * formatNumber(pageSize) + 1;
  //   const endRecord = Math.min(
  //     (currentPage + 1) * formatNumber(pageSize),
  //     formatNumber(totalRecords)
  //   );
  return (
    <Box
      className="Pagination-laptopUp"
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <Box sx={{ flex: 1 }} />
      {pagination?.map((page) => (
        <IconButton
          key={page}
          size="sm"
          variant={Number(page) ? "outlined" : "plain"}
          color={currentPage + 1 == page ? "primary" : "neutral"}
          onClick={() => onPageChange(page - 1)}
          disabled={page === "..."}
        >
          {page}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
