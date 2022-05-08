import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import style from './addProduct.module.css';
import Paper from '@mui/material/Paper';

interface IState {
    title: string;
    file: any | null;
    imageUrl: string;
    display: any;
}

async function addProduct(title: string, file?: any) {
    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('title', title);
    /*const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, formData , {
        headers: {
            'Content-Type': `multipart/form-data; boundary=MyBoundary`,
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`} 
        }
      );*/
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        method: 'POST',
        body: formData,
        headers: {
            //'Content-Type':'multipart/form-data; boundary=$DELIM', //dont have to set content type, auto set by form data
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    );

    console.log(response);
    return response;
}

export default function AddProduct() {
    const [state, setState] = useState<IState>({ title: "", file: null, imageUrl: "", display: null});

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
                        {/*<Grid item md={12} sm={12} xs={12}>
                            <TextField fullWidth label="Image url" variant="outlined" onChange={(e) => {
                                setState({ ...state, imageUrl: e.target.value })
                            }} />
                        </Grid>

                        <Grid md={12} xs={12} sm={12} item>
                            <div className="divider">
                                <strong>or</strong>
                            </div>
                        </Grid>*/}

                        <Grid item md={12} container justifyContent="center" alignItems="flex-start">
                            <Button
                                disableRipple
                                variant="contained"
                                component="label">
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    name='file'
                                    onChange={e => {
                                        console.log("file is coming");

                                        if (e.target?.files) {
                                            console.log("set");
                                            setState({ ...state, file: e.target.files[0], display: URL.createObjectURL(e.target.files[0]) })
                                        }
                                    }}
                                />
                            </Button>

                        </Grid>

                        <Grid container item md={12} sm={12} xs={12} justifyContent="center">
                            <Paper elevation={3}>
                                <img src={state.display} alt="test" height={"150vh"} />
                            </Paper>
                        </Grid>

                        <Grid item md={12} container justifyContent="center" alignItems="flex-start" style={{ marginTop: "0vh" }}>
                            <Button
                                style={{ backgroundColor: '#1db954' }}
                                fullWidth
                                variant="contained"
                                size="large"
                                disableRipple
                                onClick={async (e) => {
                                    e.preventDefault();
                                    console.log("click");
                                    const response = await addProduct(state.title, state.file).catch(err => {
                                        return alert(err.response.data.message);
                                    });
                                    console.log(response);
                                    if (response?.status === 201) {
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
