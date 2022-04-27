import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import style from './editProduct.module.css';
import { useParams } from 'react-router-dom';

interface IState {
    sku:string;
    title:string;
    imageUrl:string;
}


export default function EditProduct() {

    const [state, setState] = useState<IState>({ sku: "", title: "", imageUrl: "" });
    const { sku } = useParams();

    async function getProduct(sku:string){
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${sku}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setState(data.product);
    }
    
    async function editProduct(title:String,imageUrl:string, file?:any){
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/${sku}`,{
            title,
            imageUrl
        },{
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
          });
    }
    
    useEffect(() => {
        if(sku) getProduct(sku);
    }, [])

    return (
        <Grid container>
            <Grid container direction="column" alignItems="center" className={style.mainContainer}>

                <Grid item container justifyContent="center" alignItems="center">
                    <Typography variant="h3">Edit Product</Typography>
                </Grid>

                <Grid item container justifyContent="center">
                    <Grid container item md={4} sm={12} className={style.loginContainer}>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField required fullWidth label="Title" InputLabelProps={{shrink: true}} variant="outlined" value={state.title} onChange={(e)=>{
                            setState({...state, title: e.target.value})
                            }} />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField fullWidth label="Image url" variant="outlined" InputLabelProps={{shrink: true}} value={state.imageUrl} onChange={(e)=>{
                            setState({...state, imageUrl: e.target.value})
                            }}/>
                        </Grid>

                       {/* <Grid md={12} xs={12} sm={12} item>
                            <div className="divider">
                                <strong>or</strong>
                            </div>
                        </Grid>
                        <Grid item md={12} container justifyContent="center" alignItems="flex-start">
                            <Button
                                variant="contained"
                                component="label">
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                        </Grid>*/}

                        <Grid item md={12} container justifyContent="center" alignItems="flex-start" style={{ marginTop: "10vh" }}>
                            <Button
                                style={{ backgroundColor: '#1db954' }}
                                fullWidth
                                variant="contained"
                                size="large"
                                disableRipple
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const {data}= await editProduct(state.title, state.imageUrl);
                                    if(data.success)
                                       alert("product updated successfully");
                                    window.location.href = `${window.location.origin}/`;
                                }}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
