"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import Sidebar from "../../components/Common/Sidebar/Sidebar";
import Sidebar from "@/app/components/Common/Sidebar/Sidebar";
import { useGlobalContext } from "@/context/globalState";
import GetAppIcon from "@mui/icons-material/GetApp";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
// import Loading from "../components/Common/Loading";
import Loading from "@/app/components/Common/Loading";

const Page = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { fetchWooCommerceData, customerID, imediatelyUpdateDownload } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      if (customerID && customerID !== null) {
        setLoading(true);
        const orders = await fetchWooCommerceData(`wc/v3/orders/?customer=${customerID}`);
        setData(orders.data || []); // Ensure data is set correctly
        setLoading(false);
      }
    } catch (err) {
      toast.error("Network fail please try again later", {
        position: "top-right",
        style: { marginTop: 40 },
      });
      setLoading(false);
    }
  };

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDownload = (order) => {
    const doc = new jsPDF();
    doc.text("Invoice", 10, 10);
    doc.text(`Order Name: ${order.line_items[0].name}`, 10, 20);
    doc.text(`Price: $${order.line_items[0].price}`, 10, 30);
    doc.text(`Quantity: ${order.line_items[0].quantity}`, 10, 40);
    doc.text(`Subtotal: $${order.line_items[0].subtotal}`, 10, 50);
    doc.text(`Total: $${order.total}`, 10, 60);
    doc.text(
      `Billing Address: ${order.billing.first_name} ${order.billing.last_name}, ${order.billing.address_1}, ${order.billing.address_2}, ${order.billing.city}, ${order.billing.state}, ${order.billing.postcode}, ${order.billing.country}`,
      10,
      70
    );
    doc.text(`Email: ${order.billing.email}`, 10, 80);
    doc.text(`Phone: ${order.billing.phone}`, 10, 90);
    doc.save("invoice.pdf");
  };

  useEffect(() => {
    fetchData();
  }, [customerID, imediatelyUpdateDownload]);

  console.log(data, "order data");
  return (
    <main className="bg-[#FAFAFA]">
      <Sidebar />
      <section className="rounded-lg w-full lg:max-w-[50vw] max-w-[90vw] translate-y-[5vw] lg:translate-x-[26vw] translate-x-[5vw]">
        <h1 className="font-bold text-[6vw] lg:text-[2vw] lg:ml-[0vw] ml-[5vw] sm:text-[3vw]">
          Orders
        </h1>
        <div className="p-[2vw] bg-white border-[1px] border-[#F5F5F5] mt-[1vw] translate-y-[15vw] sm:translate-y-[7vw] lg:translate-y-0 rounded-lg flex flex-col lg:gap-[0vw] gap-[4vw]">
          {loading ? (
            <Loading h={10} w={10} />
          ) : data && data.length > 0 ? (
            data?.map((order, index) => (
              <React.Fragment key={index}>
                <div className="flex mt-[1vw] lg:gap-[0vw] gap-[3vw]">
                  <figure className="w-full max-w-[20vw] lg:max-w-[4vw] sm:max-w-[10vw]">
                    <img src={order?.line_items[0]?.image?.src} alt="img" className="w-full" />
                  </figure>
                  <div className="ml-[1vw] flex-grow">
                    <p className="lg:text-[1vw] text-[4vw] font-bold sm:text-[2.5vw]">
                      {order?.line_items[0].name}
                    </p>
                    <div className="flex justify-between w-full">
                      <p className="mt-[0.8vw] text-[3vw] lg:text-[0.9vw] font-bold sm:text-[2vw]">
                        ${order?.line_items[0].price}{" "}
                        <Button
                          className="lg:text-[0.7vw] text-[2vw] sm:text-[1.5vw]"
                          variant="text"
                          sx={{
                            color: "#FF387A",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "0.8vw",
                            padding: 0,
                            marginLeft: "1vw",
                            minWidth: "auto",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                          onClick={() => handleOpen(order)}
                        >
                          View Invoice
                        </Button>
                      </p>
                    </div>
                  </div>
                  <figure
                    className="self-end w-full max-w-[5vw] lg:max-w-[1.2vw] sm:max-w-[2.5vw]"
                    onClick={() => handleDownload(order)}
                  >
                    <GetAppIcon className="w-full cursor-pointer" />
                  </figure>
                </div>
                {index < data.length - 1 && (
                  <div className="border-[1px] border-b-[#EEEEEE] mt-[1.3vw]"></div>
                )}
              </React.Fragment>
            ))
          ) : (
            <p className="text-[#FF387A] text-center font-bold lg:text-[1.5vw] text-[1.5vw] sm:text-[2vw]">
              No Orders
            </p>
          )}
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 shadow-lg p-6 rounded-lg max-w-lg w-full">
          {selectedOrder && (
            <>
              <h2 className="text-2xl font-bold mb-4" id="modal-title">
                Invoice
              </h2>
              <div className="space-y-2" id="modal-description">
                <p>
                  <strong>Order Name:</strong> {selectedOrder.line_items[0].name}
                </p>
                <p>
                  <strong>Price:</strong> ${selectedOrder.line_items[0].price}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedOrder.line_items[0].quantity}
                </p>
                <p>
                  <strong>Subtotal:</strong> ${selectedOrder.line_items[0].subtotal}
                </p>
                <p>
                  <strong>Total:</strong> ${selectedOrder.total}
                </p>
                <p>
                  <strong>Billing Address:</strong>{" "}
                  {`${selectedOrder.billing.first_name} ${selectedOrder.billing.last_name}, ${selectedOrder.billing.address_1}, ${selectedOrder.billing.address_2}, ${selectedOrder.billing.city}, ${selectedOrder.billing.state}, ${selectedOrder.billing.postcode}, ${selectedOrder.billing.country}`}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.billing.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.billing.phone}
                </p>
                {/* Add more order details as needed */}
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="contained" color="primary" onClick={handleClose} className="mr-2">
                  Close
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </main>
  );
};

export default Page;
