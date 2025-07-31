import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import products from "./products.json"; // or static array if you're not using external json

function App() {
  const [selectedCode, setSelectedCode] = useState(products[0].code);
  const [ppu, setPpu] = useState(products[0].price);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [dataItems, setDataItems] = useState([]);

  const handleProductChange = (e) => {
    const code = e.target.value;
    const selected = products.find((p) => p.code === code);
    setSelectedCode(code);
    setPpu(selected.price);
  };

  const addItem = () => {
    const item = products.find((p) => p.code === selectedCode);

    const qtyNum = parseInt(qty);
    const ppuNum = parseFloat(ppu);
    const discountNum = isNaN(parseFloat(discount)) ? 0 : parseFloat(discount);
    const amount = qtyNum * ppuNum;

    if (qtyNum <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    if (discountNum > amount) {
      alert("Discount cannot be more than the total price.");
      return;
    }

    const newItem = {
      item: item.name,
      ppu: ppuNum,
      qty: qtyNum,
      discount: discountNum,
    };

    const index = dataItems.findIndex(
      (v) => v.item === newItem.item && v.ppu === newItem.ppu
    );

    const updated = [...dataItems];
    if (index !== -1) {
      updated[index].qty += newItem.qty;
      updated[index].discount += newItem.discount;
    } else {
      updated.push(newItem);
    }

    setDataItems(updated);
    setQty(1);
    setDiscount(0);
  };

  const clearItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    const updated = [...dataItems];
    updated.splice(index, 1);
    setDataItems(updated);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="flex-start">
        {/* FORM - 3 columns out of 12 */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add Item
            </Typography>

            <TextField
              fullWidth
              select
              label="Product"
              value={selectedCode}
              onChange={handleProductChange}
              margin="normal"
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              type="number"
              label="Price Per Unit"
              value={ppu}
              onChange={(e) => setPpu(e.target.value)}
              margin="normal"
            />


            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              type="number"
              label="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addItem}
              sx={{ mt: 2 }}
            >
              Add
            </Button>
          </Paper>
        </Grid>

        {/* TABLE - 9 columns out of 12 */}
        <Grid item xs={12} md={8} lg={9}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearItems={clearItems}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
