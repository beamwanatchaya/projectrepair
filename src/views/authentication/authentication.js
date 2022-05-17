import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie'
import useEffect from 'react';
import loginBG from '../../assets/images/auth/loginBG.png'
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {
    useEffect(() => {
        if (localStorage.getItem("userData") !== null) {
            navigate('/dashboard')
        } 
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const datas = {
            username: data.get('UserID'),
            password: data.get('password')
        }

        axios.post('https://server.tomart.online/api/repair/login', datas).then(res => {
            console.log("project", res.data)
            if (res.data !== 'incorrect') {
                console.log("loginsucceed")
                localStorage.setItem('userData', JSON.stringify(res.data))
                window.location.href = 'https://tomart.online/dashboard'
            }
            else {
                console.log('รหัสผ่านไม่ถูกต้อง')
            }
        })
    };

    return (



        // <ThemeProvider theme={theme}>

            <div style={{
                backgroundImage: `url(${loginBG})`,
                height : '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize : 'cover',
                zIndex : -10
            }}>
                <Container component="main" maxWidth="xs" >


                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ยืนยันตัวตน
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="UserID" label="UserID" name="UserID" autoComplete="UserID" autoFocus />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel control={<Checkbox value="remember" color="success" />} label="Remember me" /> */}
                            <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }}>
                                verify
                            </Button>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>
            </div>
        // </ThemeProvider>

    );
}
