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
import { getDayOfYear } from 'date-fns';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Typography() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [room, setRoom] = useState("");
    const [details, setDetails] = useState("");
    const [iduser, setIduser] = useState("");
    const [status, setStatus] = useState("");
    const [datainfo, setDatainfo] = useState();

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
        // const userid = JSON.parse(localStorage.getItem('userData'))

        // console.log("userid ==>", userid.user_id)
        const datas = {
            name: datainfo.name,
            surname: datainfo.lname,
            phone: datainfo.phone,
            room: datainfo.room,
            details: data.get('Details'),
            iduser: datainfo.user_id,
            status: 'wait',
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
        console.log({
            name: data.get('Name'),
            surname: data.get('SurName'),
            phone: data.get('Phone'),
            room: data.get('Room'),
            details: data.get('Details'),
            iduser: data.get('Iduser'),
            status: data.get('Status'),
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        });

        axios.post('http://128.199.139.142:8080/api/repairForm/form', datas).then(res => {
            console.log(res.data)
            if (res.data === "sendform succeed") {
                console.log("sendsucceed")
                window.location.href = '/history'
            }

        })
    };

    return (
        
        <MainCard title="Online Repair Notification Form" >
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
                                    name='Details'
                                    id="Details"
                                    label="Details"
                                    defaultValue=" "
                                    fullWidth
                                    style={{width : '70%'}}
                                /></Item>
                            </Grid>



                            <Grid item xs={6}>
                                <Item>
                                    <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField  style={{width : '70%'}} {...props} />}
                                            name='dateTime'
                                            label="DateTime"
                                            id='dateTime'
                                            onChange={(newValue) => setDate(newValue)}
                                            value={date}
                                           
                                            fullWidth
                                            

                                        />
                                    </LocalizationProvider>
                                </Item>
                            </Grid>
                        </Grid>
                        <center> <Button type='submit' variant="contained">Save</Button></center>
                    </Box>
                </div>
            </Box>
        </MainCard>

    )


};

// };



