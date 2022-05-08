import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
//import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, IProduct, selectAllProducts } from '../../reducers/product';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import immutable from 'immutable';
interface IState {
  products: IProduct[];
}
export default function Product() {
  //const dispatch = useDispatch()
  //const products = useSelector((state: any) => state.product);
  //const products = useSelector(selectAllProducts);
  /* useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch])*/

  const [state, setState] = useState<IState>({ products: [] });
  const [open, setOpen] = useState<boolean>(false);
  const fetchProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
    setState({ ...state, products: data.products })

  };

  const deleteProduct = async (sku) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${sku}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return data;
  }
  useEffect(() => {
    fetchProducts();
  }, [])

  const columns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', width: 240 },
    { field: 'title', headerName: 'Title', width: 220 },
    { field: 'fileUrl', headerName: 'Images', width: 200, renderCell:(cellValues)=>{
      
      return(<img src={cellValues.row.fileUrl} alt="" height="140vh"></img>)
    } },
    {
      field: "edit", headerName: '', width: 80, renderCell: (cellValues) => {
        return (<Button variant="contained"
          onClick={(e) => {
            window.location.href = `${window.location.href}edit/${cellValues.row.sku}`;
          }
          }
        >edit</Button>)
      }
    },
    {
      field: "delete", headerName: '', width: 80, renderCell: (cellValues) => {
        return (<React.Fragment>
          <Button variant="contained" onClick={() => {
            setOpen(true);
            sessionStorage.setItem('deleteSku', cellValues.row.sku);
          }}>delete</Button>
        </React.Fragment>)
      }
    }]

  return (
    <Grid container alignItems="center" justifyContent="center">

      <Grid container item md={8} sm={8} xs={8} style={{ marginTop: '5vh', marginBottom: '5vh' }} justifyContent="space-between">
        <b>Product List</b>
        <TextField label="search"></TextField>
        <Grid item>
          <Button variant="contained" href={`${window.location.origin}/add`}>Add Product</Button>
          <Button variant="outlined" color="secondary" href={`${window.location.origin}/add`}
            onClick={() => {
              localStorage.removeItem("accessToken");
            }}>logout</Button>
        </Grid>
      </Grid>
      <Grid item md={11} sm={12} xs={12} style={{ height: "80vh" }}>
        {
          (state.products) ? <React.Fragment><DataGrid
            rows={state.products}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            getRowId={(row) => row.sku}
            rowHeight={150}

          />

            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>No</Button>
                <Button onClick={async () => {
                  let deleteSku: string | null = sessionStorage.getItem('deleteSku');
                  await deleteProduct(deleteSku);
                  setOpen(false);
                  const updatedProducts: IProduct[] = state.products.filter(product => product.sku !== deleteSku);
                  setState({ products: updatedProducts });
                }
                } autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
            : null
        }</Grid>
    </Grid>
  );
}