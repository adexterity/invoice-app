import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SelectSmall from "./inputComponents/selectComponent";
import { formatCurrency } from "../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -20%)",
  minWidth: 400,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //get the totalPrice from the redux state

  const totalPrice = useSelector(
    (state: RootState) => state.invoice.totalPrice
  );

  return (
    <div>
      <Button onClick={handleOpen}>create Invoice</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="relative">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            create New Invoice
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <SelectSmall />
          </Typography>

          <div
            className="bg-green-600 text-white inline p-2 
          text-xl rounded absolute right-2 bottom-2"
          >
            Total: {formatCurrency(totalPrice)}{" "}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
