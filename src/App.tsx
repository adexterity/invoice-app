import * as React from "react";
import Button from "@mui/material/Button";

import "./App.css";
import BasicModal from "./components/Modal";
import { Products } from "./constant/constant";
import { useDispatch} from "react-redux";
/* import { RootState } from "./state/store";
 */import { getAllItems } from "./state/invoice/invoiceSlice";

function App() {
/*   const stateProduct = useSelector((state: RootState) => state.invoice.items);
 */  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllItems(Products));
  }, []);

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen bg-black">
        {/*  <Button variant="contained">
        create Invoice

        </Button> */}

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ color: "white" }}
        >
          create Invoice
        </Button>
        <BasicModal open= {open} onClose={handleClose} />
      </div>
    </>
  );
}

export default App;

/* 
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}

*/
