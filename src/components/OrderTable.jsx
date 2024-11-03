/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { formatDate, getInitial } from "../utils/helpers";
import Pagination from "./Pagination";
import { useGetData } from "../utils/api";
import { map } from "lodash";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable({
  orderData,
  pagination,
  handlePageChange,
  onViewOrder,
  onDownload,
  onApply,
}) {
  const [order, setOrder] = React.useState("desc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const { data: orders = [] } = orderData || {};
  const { data, isLoading: loading } = useGetData(
    "device/get-device-by-name?name=Electric Hot Water Bag"
  );
  const { data: customers } = useGetData("customers/get-customers");
  const [search, setSearch] = useState({
    invoice: "",
    product_id: null,
    customer_id: null,
  });

  const onSearch = () => {
    const { invoice, product_id, customer_id } = search;
    onApply({
      invoice,
      product_id: product_id || "",
      customer_id: customer_id || "",
    });
  };
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Product</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by product"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          onChange={(e, value) => {
            setSearch((prevState) => ({ ...prevState, product_id: value }));
          }}
        >
          {map(data, (option) => (
            <Option key={option.id} value={option.id}>
              {option.title}
            </Option>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl> */}
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          onChange={(e, value) => {
            setSearch((prevState) => ({ ...prevState, customer_id: value }));
          }}
        >
          {/* <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option> */}
          {map(customers, (customer) => (
            <Option key={customer.id} value={customer.id}>
              {customer.first_name} {customer.last_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search Invoice #"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "130px", md: "180px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input
            size="sm"
            placeholder="Search Invoice #"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
        <FormControl size="sm">
          <br />
          <Button color="primary" size="sm" onClick={onSearch}>
            Apply
          </Button>
        </FormControl>
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== orders.length
                  }
                  checked={selected.length === orders.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? orders.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === orders.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    order === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Product</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Quantity</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...orders].sort(getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.order_no}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {formatDate(row.created_at)}
                  </Typography>
                </td>
                <td>
                  {/* <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: "success",
                        Refunded: "neutral",
                        Cancelled: "danger",
                      }[row.status]
                    }
                  >
                    {row.status}
                  </Chip> */}
                  <Typography level="body-xs">{row.device?.title}</Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">
                      {getInitial(row.customer?.first_name)}
                    </Avatar>
                    <div>
                      <Typography level="body-xs">
                        {row.customer?.first_name} {row.customer?.last_name}
                      </Typography>
                      {/* <Typography level="body-xs">
                        {row.customer.email}
                      </Typography> */}
                    </div>
                  </Box>
                </td>
                <td>
                  <Typography level="body-xs">{row.quantity}</Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link
                      level="body-xs"
                      component="button"
                      onClick={() => onDownload(row)}
                    >
                      Download
                    </Link>
                    {/* <RowMenu /> */}
                    <Button variant="plain" onClick={() => onViewOrder(row)}>
                      <Typography level="body-xs">View</Typography>
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Pagination
        onPageChange={(data) => handlePageChange(data)}
        {...pagination}
      />
    </React.Fragment>
  );
}
