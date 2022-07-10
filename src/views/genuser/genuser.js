
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TablePagination from '@mui/material/TablePagination';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography, Chip, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// project imports
import BajajAreaChartCard from '../dashboard/Default/BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import SendIcon from '@mui/icons-material/Send';


// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Update } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#4527a0",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function createData(Id, name, surname, phone, roomnumber, username, password) {
    return { Id, name, surname, phone, roomnumber, username, password };
}

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setdata] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [name, setname] = useState();
    const [lname, setlname] = useState();
    const [room, setroom] = useState();
    const [phone, setphone] = useState();
    const [role, setrole] = useState();
    const [edit,setedit]  = useState(false);
    const [editdata,seteditdata] = useState();
     const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const openedit = (data) => {
        seteditdata (data)
        setedit(true)
        
    }
    const [opendelete, setOpendelete] = useState({
        isopen: false,
        id: 0
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData")).role === "admin") {
            // axios.get(`https://server.tomart.online/api/repairForm/getform/${JSON.parse(localStorage.getItem("userData")).user_id}`).then(res => {
            //     console.log(res.data)
            //     // setdata(res.data)
            //     setdata(res.data)

            // })
            axios.get(`https://server.tomart.online/api/repair/getuser`).then(res => {
                // console.log(res.data)
                // setdata(res.data)
                setdata(res.data)

            })
        } else {
            axios.get(`https://server.tomart.online/api/repair/getuser`).then(res => {
                // console.log(res.data)
                // setdata(res.data)
                setdata(res.data)

            })
        }
    }, [])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData")).role !== "admin") {
            navigate('/dashboard')
        }
    }, [])


    const updateItem = (id, whichvalue, newvalue) => {
        const index = data.findIndex(x => x.id === id);

        if (index !== -1) {
            const temporaryarray = data.slice();
            temporaryarray[index][whichvalue] = newvalue;
            setdata(temporaryarray);
        }
        else {
            console.log('no match');
        }
    }

    const updatestatus = (id, event) => {
        updateItem(id, 'status', event)
        console.log(id, event)
        const data = {
            id: `${id}`,
            status: event
        }
        axios.post("https://server.tomart.online/api/repairForm/updatestatus", data).then(res => {
            console.log(res)
        })

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const adduser = (e) => {
        e.preventDefault()
        console.log(name, lname, room, phone, username, password, role)
        const data = {
            'username': username,
            'password': password,
            'name': name,
            'lname': lname,
            'room': room,
            'phone': phone,
            'role': role

        }

        axios.post("https://server.tomart.online/api/repair/genusername", data).then(res => {
            console.log(res)
            axios.get(`https://server.tomart.online/api/repair/getuser`).then(res => {
                // console.log(res.data)
                // setdata(res.data)
                setdata(res.data)

            })
            setOpen(false);

        })

    }
    const deleted = (id) => {
        console.log("id:", id)
        axios.get(`https://server.tomart.online/api/repair/deleteuser/${id}`).then(res => {
            console.log(res)
            const newdata = data.filter((datas) => datas.id !== id);
            setOpendelete({isopen:false,id:0})

            setdata(newdata);

        })
        
    }
    const edituesr = (e) => {
        e.preventDefault()
        console.log(name, lname, room, phone, username, password, role)
        const data = {
            'username': username,
            'password': password,
            'name': name,
            'lname': lname,
            'room': room,
            'phone': phone,
            'role': role

    } 
    console.log(data)
}
    const handledialog = (userid) => {
        setOpendelete({ isopen: true, id: userid });
    }
    const handleClickOpendelete = (userid) => {
        console.log('ddd')
        handledialog(userid)
    };

    const handleClosedelete = () => {
        setOpendelete(false);
    };

    console.log(opendelete)

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
                <Button variant="contained" color='primary' onClick={handleClickOpen} startIcon={<AddCircleOutlineIcon />}>
                    Add
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="left">name</StyledTableCell>
                            <StyledTableCell align="left">surname&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">phone number&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">room number&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">username&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">password&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">role&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">edit</StyledTableCell>
                            <StyledTableCell align="left">delete</StyledTableCell>
                           

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <>
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.lname}</StyledTableCell>
                                    <StyledTableCell align="left">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="left">{row.room}</StyledTableCell>
                                    {/* <StyledTableCell align="left">
                                    {JSON.parse(localStorage.getItem("userData")).role === "admin" ? <Box sx={{ minWidth: 100 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={row.role}
                                                onChange={(e) => updatestatus(row.id, e.target.value)}
                                            >
                                                <MenuItem value="Admin">admin</MenuItem>
                                                <MenuItem value="User">User</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                    </Box> : <StyledTableCell align="right">{row.role}</StyledTableCell>}


                                </StyledTableCell> */}
                                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                                    <StyledTableCell align="left">{row.password}</StyledTableCell>
                                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                                    <StyledTableCell align="left"> <EditIcon onClick ={()=> openedit(row)} /></StyledTableCell>
                                    <StyledTableCell align="left">
                                       
                                            <DeleteIcon style={{cursor:"pointer"}} color='primary' onClick={() => handleClickOpendelete(row.id)} />
                                     
                                    </StyledTableCell>

                                </StyledTableRow>


                            </>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={adduser}>
                    <DialogTitle style={{ fontSize: 20 }}>Genuserid</DialogTitle>
                    <DialogContent>

                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="name"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setname(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="surname"
                            label="surname"
                            type="surname"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setlname(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Phone"
                            label="Phone"
                            type="Phone"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setphone(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Room"
                            label="Room"
                            type="Room"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setroom(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="username"
                            label="username"
                            type="username"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setusername(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="password"
                            label="password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setpassword(e.target.value)}
                        />

                        <FormControl fullWidth style={{ marginTop: 10 }}>
                            <InputLabel id="demo-simple-select-label">role</InputLabel>
                            <Select required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="role"
                                onChange={(e) => setrole(e.target.value)}
                            // onChange={(e) => updatestatus(row.id, e.target.value)}
                            >
                                <MenuItem value="admin">admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>

                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog open={edit} onClose={() => setedit(!edit)}>
                <form onSubmit={edituesr}>
                    <DialogTitle style={{ fontSize: 20 }}>edituser</DialogTitle>
                    <DialogContent>

                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="name"
                            type="name"
                            fullWidth
                            defaultValue={editdata.name}
                            variant="standard"
                            onChange={(e) => setname(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="surname"
                            label="surname"
                            type="surname"
                            fullWidth
                            defaultValue={editdata.surname}
                            variant="standard"
                            onChange={(e) => setlname(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Phone"
                            label="Phone"
                            type="Phone"
                            fullWidth
                            defaultValue={editdata.phone}
                            variant="standard"
                            onChange={(e) => setphone(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Room"
                            label="Room"
                            type="Room"
                            fullWidth
                            defaultValue={editdata.Room}
                            variant="standard"
                            onChange={(e) => setroom(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="username"
                            label="username"
                            type="username"
                            fullWidth
                            defaultValue={editdata.username}
                            variant="standard"
                            onChange={(e) => setusername(e.target.value)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="password"
                            label="password"
                            type="password"
                            fullWidth
                            defaultValue={editdata.password}
                            variant="standard"
                            onChange={(e) => setpassword(e.target.value)}
                        />

                        <FormControl fullWidth style={{ marginTop: 10 }}>
                            <InputLabel id="demo-simple-select-label">role</InputLabel>
                            <Select required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="role"
                                defaultValue={editdata.role}
                                onChange={(e) => setrole(e.target.value)}
                            // onChange={(e) => updatestatus(row.id, e.target.value)}
                            >
                                <MenuItem value="admin">admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>

                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setedit(!edit)}>Cancel</Button>
                        <Button type='submit'>edit</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog
                open={opendelete.isopen}
                onClose={handleClosedelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        double check Will you delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosedelete}>Cancel</Button>
                    <Button onClick={() => deleted(opendelete.id)} >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            



        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
