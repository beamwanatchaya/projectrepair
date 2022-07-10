import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import axios from 'axios';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { getDayOfYear, set } from 'date-fns';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Typography() {
    const navigate = useNavigate()
    const [datainfo, setDatainfo] = useState();
    const [error,setError] = useState({status:false,message:''});
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData")).role !== "user") {
            navigate('/dashboard')
        } else {
            setDatainfo(JSON.parse(localStorage.getItem("userData")))
        }
    }, [])


    
    const handleSubmit = (event) => {
        console.log("event.currentTarget ===>", event.currentTarget)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
        console.log(data.get('newPassword'))
        // console.log("userid ==>", userid.user_id)
        if (data.get('newPassword')===data.get('confirmPassword')){
            setError({status:false,message:''})
            const datas = {
                oldPassword: data.get('oldPassword'),
                newPassword: data.get('newPassword'),
                confirmPassword: data.get('confirmPassword'),
                iduser: datainfo.user_id
               
            }
            console.log(datas)
        }
        else {
           setError({status:true,message:'Passwords do not match'})
        } 
        
      
        //     name: data.get('Name'),
        //     surname: data.get('SurName'),
        //     phone: data.get('Phone'),
        //     room: data.get('Room'),
        //     details: data.get('Details'),
        //     iduser: data.get('Iduser'),
        //     status: data.get('Status'),
        //     date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        // });

        axios.post('http://server.tomart.online/api/changepass', datas).then(res => {
            console.log(res.data)
            if (res.status===200) {
                console.log("sendsucceed")
                // window.location.href = '/history'
            }

        })
    };

    return (
        
        <MainCard title="Reset Password" >
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
            >
                <div>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                  
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                            
                            <Grid item xs={6}>
                                <Item><TextField
                                    required
                                    name='oldPassword'
                                    id="oldPassword"
                                    label="รหัสผ่านเดิม"
                                   
                                    fullWidth
                                    type="password"
                                    style={{width : '70%'}}
                                /></Item>
                            </Grid>
                            
                            <Grid item xs={6}>
                                <Item><TextField
                                    required
                                    name='newPassword'
                                    id="newPassword"
                                    label="รหัสผ่านใหม่"
                                    
                                    fullWidth
                                    type="password"
                                    style={{width : '70%'}}
                                /></Item>
                            </Grid>
                            
                            <Grid item xs={6}>
                                <Item><TextField
                                    required
                                    name='confirmPassword'
                                    id="confirmPassword"
                                    label="ยืนยันรหัสผ่านใหม่"
                                    
                                    fullWidth
                                    type="password"
                                    style={{width : '70%'}}
                                /></Item>
                            </Grid>



                            
                        </Grid>
                        
                        <center> {error.status?(<p>{error.message}</p>):null} <Button type='submit' variant="contained">Save</Button></center>
                    </Box>
                </div>
            </Box>
        </MainCard>

    )


};

// };



