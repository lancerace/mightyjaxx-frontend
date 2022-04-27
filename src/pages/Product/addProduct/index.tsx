import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import style from './addProduct.module.css';


interface IState {
    title: string;
    imageUrl: string;
}

async function addProduct(title: String, imageUrl: string, file?: any) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        title,
        imageUrl
    }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
}

export default function AddProduct() {
    const [state, setState] = useState<IState>({ title: "", imageUrl: "" });

    return (
        <Grid container>
            <Grid container direction="column" alignItems="center" className={style.mainContainer}>

                <Grid item container justifyContent="center" alignItems="center">
                    <Typography variant="h3">Add Product</Typography>
                </Grid>

                <Grid item container justifyContent="center">
                    <Grid container item md={4} sm={12} className={style.loginContainer}>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField required fullWidth label="Title" variant="outlined" onChange={(e) => {
                                setState({ ...state, title: e.target.value })
                            }} />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField fullWidth label="Image url" variant="outlined" onChange={(e) => {
                                setState({ ...state, imageUrl: e.target.value })
                            }} />
                        </Grid>

                        {/*<Grid md={12} xs={12} sm={12} item>
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

                        <Grid item md={12} container justifyContent="center" alignItems="flex-start" style={{ marginTop: "20vh" }}>
                            <Button
                                style={{ backgroundColor: '#1db954' }}
                                fullWidth
                                variant="contained"
                                size="large"
                                disableRipple
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const response = await addProduct(state.title, state.imageUrl).catch(err => {
                                        return alert(err.response.data.message);
                                    });
                                    if (response?.status === 201){
                                        alert("product created successfully");
                                        window.location.href = `${window.location.origin}/`;
                                    }
                                }}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
