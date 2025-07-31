import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import accessoryData from './accessory.json'
import DataTable from './components/DataTable'
import {
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Box
} from '@mui/material'

function App() {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      productId: '',
      quantity: ''
    }
  })

  const sRef = useRef()
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([])

  // internal variable, not a state
  const selectedItemsRef = useRef([
    { id: 1, name: "Door Visor", price: 100, quantity: 2 },
    { id: 2, name: "Mud Guard", price: 200, quantity: 1 },
    { id: 3, name: "Seat Cover", price: 400, quantity: 1 }
  ])

  const productId = watch("productId")
  const selectedProduct = accessoryData.find(p => p.id === parseInt(productId))
  const displayPrice = selectedProduct ? selectedProduct.price : 0

  const updateFiltered = () => {
    setFilteredSelectedItems([...selectedItemsRef.current])
  }

  const onSubmit = (data) => {
    const product = accessoryData.find(p => p.id === parseInt(data.productId))
    if (!product) return

    selectedItemsRef.current.push({
      ...product,
      quantity: parseInt(data.quantity)
    })

    updateFiltered()
    reset()
  }

  const deleteItemByIndex = (index) => {
    selectedItemsRef.current.splice(index, 1)
    updateFiltered()
  }

  const search = (keyword) => {
    setFilteredSelectedItems(
      selectedItemsRef.current.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  }

  const sortAsc = () => {
    setFilteredSelectedItems(prev =>
      [...prev].sort((a, b) => a.name.localeCompare(b.name))
    )
  }

  const sortDesc = () => {
    setFilteredSelectedItems(prev =>
      [...prev].sort((a, b) => b.name.localeCompare(a.name))
    )
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Accessory Order Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="product-label">Product</InputLabel>
          <Controller
            name="productId"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="product-label" label="Product">
                {accessoryData.map(accessory => (
                  <MenuItem key={accessory.id} value={accessory.id}>
                    {accessory.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="quantity"
          control={control}
          rules={{ required: true, min: 1 }}
          render={({ field }) => (
            <TextField {...field} type="number" label="Quantity" fullWidth />
          )}
        />

        <Typography variant="body1">Price: {displayPrice} ฿</Typography>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>

      {/* Search and Sort Controls */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <input type="text" placeholder="Search..." ref={sRef} />
        <Button variant="outlined" onClick={() => search(sRef.current.value)}>Search</Button>
        <Button variant="outlined" onClick={sortAsc}>Sort A-Z</Button>
        <Button variant="outlined" onClick={sortDesc}>Sort Z-A</Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Selected Items
      </Typography>

      <Container>
        <DataTable
          data={filteredSelectedItems}
          onDelete={deleteItemByIndex}
        />
      </Container>
    </Container>
  )
}

export default App
