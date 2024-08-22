import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none", // Remove border focus
  boxShadow: 24,
  p: 4,
  borderRadius: "8px", // Rounded corners
};

export default function SuccessPaymentModel({ success }) {
  const navigate = useRouter();
  const [open, setOpen] = React.useState(success);

  React.useEffect(() => {
    if (success) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 120000); // Close after 20 minutes

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [success]);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <figure>
            <img src="/img/successPayment.png" alt="success" className="rounded-t-lg" />
          </figure>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center font-bold"
          >
            Payment Successful
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
            Your payment was successfully processed.
          </Typography>

          <Link href={"/subscriptions"} className="w-full flex justify-center">
            <Button
              href="/subscriptions"
              // onClick={() => navigate.push("/store")}
              variant="outlined"
              className="mt-[2.5vw] p-[1vw]"
              sx={{
                mt: 2,
                borderColor: "#FF387A",
                color: "#FF387A",
                borderRadius: "8px", // Rounded corners
                "&:hover": {
                  borderColor: "darkred",
                  color: "darkred",
                },
                "&:focus": {
                  outline: "none", // Remove border focus
                },
              }}
            >
              Go to Subscription Page
            </Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
