import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Sidebar from "../../components/Sidebar";
import OrderTable from "../../components/OrderTable";
import OrderList from "../../components/OrderList";
import Header from "../../components/Header";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import AddOrder from "./AddOrder";
import { Loader, Toast } from "../../components";
import { fetchApi, useGetData } from "../../utils/api";
import { saveAs } from "file-saver";

const initialStates = {
  open: false,
  message: "",
  severity: "",
};
const initialPageStates = { page: 0, pageSize: 25, totalRecords: 0 };

export default function OrderDashboardTemplate() {
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState(initialPageStates);
  const [toastData, setToastData] = useState(initialStates);
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const { page = 0, pageSize = 5 } = pagination;
  const { data, isLoading, refetch } = useGetData(
    `orders/order-list?page=${page}&pageSize=${pageSize}`
  );
  const { totalCount = 0 } = data || {};

  useEffect(() => {
    if (totalCount) {
      setPagination((prevState) => ({
        ...prevState,
        totalRecords: totalCount,
      }));
    }
  }, [totalCount, setPagination]);

  const handlePageChange = (pageNumber) => {
    setPagination((prevState) => ({ ...prevState, page: pageNumber }));
  };
  const handleClickOpen = () => {
    setOrder("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onViewOrder = (order) => {
    setOpen(true);
    setOrder(order);
  };

  const onDownload = (order) => {
    setLoading(true);
    fetchApi(`orders/download-invoice?order_id=${order?.id}`).then((data) => {
      if (data.pdfBase64) {
        const { pdfBase64 } = data;
        const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;
        saveAs(pdfDataUrl, `Invoice-${data?.order?.order_no || ""}.pdf`);
      }
      setLoading(false);
    });
  };

  const { open: toastOpen, message, severity } = toastData;
  return (
    <>
      <Loader loading={isLoading || loading} />
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          <Header />
          <Sidebar />
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 2, md: 6 },
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100dvh",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
              >
                <Link underline="none" color="neutral" aria-label="Home">
                  <HomeRoundedIcon />
                </Link>
                <Typography
                  color="primary"
                  sx={{ fontWeight: 500, fontSize: 12 }}
                >
                  Orders
                </Typography>
              </Breadcrumbs>
            </Box>
            <Box
              sx={{
                display: "flex",
                mb: 1,
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "start", sm: "center" },
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Typography level="h2" component="h1">
                Orders
              </Typography>
              <Button
                color="primary"
                startDecorator={<AddCircleOutlineRounded />}
                size="sm"
                onClick={handleClickOpen}
              >
                Add Order
              </Button>
            </Box>
            <OrderTable
              orderData={data}
              handlePageChange={handlePageChange}
              pagination={pagination}
              onViewOrder={onViewOrder}
              onDownload={onDownload}
            />
            <OrderList
              orderData={data}
              handlePageChange={handlePageChange}
              pagination={pagination}
              onViewOrder={onViewOrder}
              onDownload={onDownload}
            />
          </Box>
        </Box>
      </CssVarsProvider>
      {open ? (
        <AddOrder
          open={open}
          handleClose={handleClose}
          setToastData={setToastData}
          order={order}
          refetch={refetch}
        />
      ) : null}
      <Toast
        open={!!toastOpen}
        handleClose={() => setToastData(initialStates)}
        message={message}
        severity={severity}
      />
    </>
  );
}
