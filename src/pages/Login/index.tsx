import React,{useState} from 'react';
// prettier-ignore
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import style from './login.module.css';


interface IState {
    email: string;
    password: string;
}
export default function Login() {
    const [state, setState] = useState<IState>({ email: "", password: "" });


async function login():Promise<any>{
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`,{
       email:state.email,password:state.password
   })
}

    return (
        <Grid container>
            <Grid container direction="column" alignItems="center" className={style.mainContainer}>
                <Grid item container justifyContent="center" alignItems="center">
                    <Typography variant="h3">MightyJaxx</Typography>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle2">Welcome Back. To continue</Typography>
                </Grid>

                <Grid item container justifyContent="center">
                    <Grid container item md={4} className={style.loginContainer}>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField fullWidth label="Email" variant="outlined" onChange={(e)=>{
                                setState({...state,email: e.target.value})
                            }} />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField fullWidth label="Password" variant="outlined" type="password" onChange={(e)=>{
                                setState({...state,password: e.target.value})
                            }} />
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: '#1db954' }}
                                size="large"
                                disableRipple
                                onClick={async (e) => {
                                    if (state.email.length === 0 || state.password.length === 0) {
                                        alert("email or password cannot be empty");
                                        return;
                                    }

                                    const { data }: any = await login().catch(({ response }) =>{
                                        console.log("error login");
                                        console.log(response);
                                        alert(response.data.message);
                                    });
                                    if (data.success) {
                                        localStorage.setItem('accessToken', data.accessToken);
                                        alert("login success!")
                                        window.location.href = `${window.location.origin}/`;
                                    }
                                }}
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid md={12} xs={12} sm={12} item>
                            <div className="divider">
                                <strong>or</strong>
                            </div>
                        </Grid>


                        <Grid md={12} xs={12} sm={12} item>
                            <Typography align="center" variant="h6">
                                Dont have an account?
                            </Typography>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12} container justifyContent="center" alignItems="flex-start">
                            <Button
                            style={{color:"black"}}
                                fullWidth
                                variant="outlined"
                                size="large"
                                disableRipple
                                href="/signup">
                                Signup
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
