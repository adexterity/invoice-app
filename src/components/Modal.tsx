import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import SpanningTable from "./TableComponent";
import { SelectChangeEvent } from "@mui/material";

const style = {
  position: "relative" as "relative",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  paddingTop: 0,
};

export default function BasicModal({ open, onClose }) {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          width: "80%",
          height: "80%",
          transform: "translate(10%, 10%)",
          position: "fixed",
          top: 0,
          left: 30,
          backgroundColor: "white",
        }}
      >
        {/* general box */}
        <Box sx={style}>
          <Box
            className="child-box"
            sx={{
              borderBottom: "1px solid gray",
              position: "sticky",
              backgroundColor: "white",
              zIndex: 100,
              top: 0,
              left: 0,
              width: "100%",
              height: "60px",
              marginBottom: 0,
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                color: "white",
                backgroundColor: "blue",
                position: "absolute",
                top: "10px",
                right: "100px",
                "&:hover": {
                  backgroundColor: "blue",
                },
              }}
            >
              save
            </Button>
            <Button
              onClick={onClose}
              sx={{
                color: "black",
                position: "absolute",
                top: "10px",
                right: "5px",
                width: "50px",
                fontWeight: "400",
                fontSize: "20px",
                padding: "1px",
              }}
            >
              x
            </Button>
          </Box>
          <Box
            sx={{
              my: 3,
              marginTop: 0,
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 3 }}
            >
              create Invoice
            </Typography>
            <div>
              <Typography variant="body2" component="p">
                Date:
              </Typography>
              <Typography variant="body1" component="p">
                04 Jul, 2024
              </Typography>
              <div>
                <Typography
                  id="modal-modal-title"
                  variant="body2"
                  component="p"
                >
                  Date:
                </Typography>
              </div>
            </div>
            <div className="flex justify-start gap-6 my-4">
              <div className="lg:w-40 ">
                <Typography variant="body2" component="p">
                  Biiled from:
                </Typography>
                <Typography variant="body1" component="p">
                  Hospital test
                </Typography>
              </div>
              <div className="lg:w-40 ">
                <Typography variant="body2" component="p">
                  Biiled to:
                </Typography>
                <Typography variant="body1" component="p">
                  Emmnual Afolabi
                </Typography>
              </div>
            </div>

            <div className="flex justify-start my-4 lg:gap-6">
              <div className="lg:w-40 ">
                <Typography variant="body2" component="p">
                  Service Provider
                </Typography>
                <Typography variant="body1" component="p">
                  Hospital Test <br /> Lekki, Lagos Nigeria <br /> 08132556677
                </Typography>
              </div>
              <div className="lg:w-40 ">
                <Typography variant="body2" component="p">
                  Patient Details
                </Typography>
                <Typography variant="body1" component="p">
                  Patient Details <br />
                  Emmanuel Afolabi <br />
                  08132556677 <br />
                </Typography>
              </div>
            </div>
          </Box>

          <SpanningTable />
        </Box>
      </Modal>
    </>
  );
}
