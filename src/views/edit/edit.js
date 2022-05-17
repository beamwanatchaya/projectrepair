import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import axios from 'axios';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
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

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { getDayOfYear } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { id } from 'date-fns/locale';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function EditForm(props) {
    const editdata = useLocation()
    const [name, setName] = useState(editdata.state.editData.name);
    const [surname, setSurname] = useState(editdata.state.editData.surname);
    const [phone, setPhone] = useState(editdata.state.editData.phone);
    const [room, setRoom] = useState(editdata.state.editData.room);
    const [details, setDetails] = useState(editdata.state.editData.details);

    const [date, setDate] = useState(new Date(editdata.state.editData.date));

  
    // console.log(props.location)
  
    

    const handleSubmit = (event) => {
        console.log("event.currentTarget ===>", event.currentTarget)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userid = JSON.parse(localStorage.getItem('userData'))

        console.log("userid ==>", userid.user_id)
        const datas = {
            id: `${editdata.state.editData.id}`,
            name: `${name}`,
            surname: `${surname}`,
            phone:`${phone}`,
            room: `${room}`,
            details: `${details}`,
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
        axios.post('https://server.tomart.online/api/repairForm/editform', datas).then(res => {
            console.log(res.data)
            if (res.data.messege === "succed") {
                console.log("sendsucced")
                window.location.href = '/history'
            }

        })
    };
    useEffect(() => {
        setName(editdata.state.editData.name)
    }, [])
    return (

        <MainCard title="EditForm" >
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
            >
                <div>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Item>
                                    <TextField
                                        required
                                        name='Name'
                                        id="Name"
                                        label="Name"
                                        defaultValue={name}
                                        fullWidth
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item><TextField
                                    required
                                    name='SurName'
                                    id="SurName"
                                    label="SurName"
                                    defaultValue=" "
                                    fullWidth
                                    value={surname}
                                    onChange={(e)=>setSurname(e.target.value)}
                                /></Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item><TextField
                                    required
                                    name='Phone'
                                    id="Phone"
                                    label="Phone number"
                                    defaultValue=" "
                                    fullWidth
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                /></Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item><TextField
                                    required
                                    name='Room'
                                    id="Room"
                                    label="Room number"
                                    defaultValue=" "
                                    fullWidth
                                    value={room}
                                    onChange={(e)=>setRoom(e.target.value)}
                                /></Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item><TextField
                                    required
                                    name='Details'
                                    id="Details"
                                    label="Details"
                                    defaultValue=" "
                                    fullWidth
                                    value={details}
                                    onChange={(e)=>setDetails(e.target.value)}
                                /></Item>
                            </Grid>



                            <Grid item xs={6}>
                                <Item>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            name='dateTime'
                                            label="DateTime"
                                            id='dateTime'
                                            onChange={(newValue) => setDate(newValue)}
                                            value={date}

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



