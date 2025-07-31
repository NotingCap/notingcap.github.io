import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";

function QuotationTable({ data, deleteByIndex, clearItems }) {
  if (!data || data.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="h5">Quotation</Typography>
        <Typography color="textSecondary">
          <CiShoppingCart /> No items
        </Typography>
      </Box>
    );
  }

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu - v.discount, 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.discount, 0);

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h5">Quotation</Typography>
        <Button variant="outlined" color="error" startIcon={<MdClear />} onClick={clearItems}>
          Clear
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  <BsFillTrashFill
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteByIndex(i)}
                  />
                </TableCell>
                <TableCell align="center">{row.qty}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell align="center">{row.ppu}</TableCell>
                <TableCell align="center">{row.discount}</TableCell>
                <TableCell align="right">
                  {row.qty * row.ppu - row.discount}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <strong>Total Discount</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{totalDiscount}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{total}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default QuotationTable;
