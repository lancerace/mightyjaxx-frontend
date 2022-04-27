import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Link } from '@mui/material';
import style from './signup.module.css';
import axios from 'axios';

interface IState {
    email: string;
    password: string;
}

export default function Signup() {
    const [state, setState] = useState<IState>({ email: "", password: "" });

    async function register(email: string, password: string) {
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, {
            email, password
        });
    }

    return (
        <Grid container>
            <Grid container direction="column" alignItems="center" className={style.mainContainer}>
                <Grid item container justifyContent="center" alignItems="center">
                    <Typography variant="h3">MightyJaxx</Typography>
                </Grid>

                <Grid item container justifyContent="center">
                    <Grid container item md={4} sm={12} className={style.loginContainer}>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField required fullWidth label="Email" variant="outlined" onChange={(e) => {
                                setState({ ...state, email: e.target.value })
                            }} />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField fullWidth label="Password" variant="outlined" type="password" onChange={(e) => {
                                setState({ ...state, password: e.target.value })
                            }} />
                        </Grid>

                        <Grid md={12} xs={12} sm={12} item>
                            <Typography variant="body2" align="center">
                                By signing up, you agree to MightyJaxx's&nbsp;
                                <Link
                                    href="#"
                                    onClick={() => {
                                    }}>
                                    Terms and Conditions&nbsp;
                                </Link>
                                and&nbsp;
                                <Link
                                    href="#"
                                    onClick={() => {
                                    }}>
                                    Privacy Policy.
                                </Link>
                            </Typography>
                        </Grid>

                        <Grid item md={12} container justifyContent="center" alignItems="flex-start">
                            <Button
                                style={{ backgroundColor: '#1db954' }}
                                fullWidth
                                variant="contained"
                                size="large"
                                disableRipple
                                onClick={async (e) => {
                                    e.preventDefault();

                                    if (state.email.length === 0 || state.password.length === 0) {
                                        alert("email or password cannot be empty");
                                        return;
                                    }


                                    const { data }: any = await register(state.email, state.password).catch(({ response }) => alert(response.data.message));;
                                    if (data.success) {
                                        alert("registered successfully");
                                        window.location.href = `${window.location.origin}`;
                                    }
                                }}>
                                Sign up
                            </Button>
                        </Grid>
                        <Grid md={12} item>
                            <div className="divider" />
                        </Grid>

                        <Grid md={12} xs={12} item>
                            <Typography variant="body2" align="center">
                                Already have an account?&nbsp;
                                <Link
                                    href="/login"
                                    onClick={() => {
                                        console.log('test click');
                                    }}>
                                    Log in
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
