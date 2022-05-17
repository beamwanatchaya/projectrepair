
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
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';

import AccountCircle from '@mui/icons-material/AccountCircle';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography, Chip, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// project imports
import BajajAreaChartCard from '../dashboard/Default/BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Update } from '@mui/icons-material';

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


function createData(Id, name, surname, phone, roomnumber, details, DateTime) {
    return { Id, name, surname, phone, roomnumber, details, DateTime };
}

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();
    const [isSearching,setisSearching] = useState(false);
    const [findData,setfindData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setdata] = useState([]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };
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
        if (JSON.parse(localStorage.getItem("userData")).role === "user") {
            axios.get(`http://localhost:8080/api/repairForm/getform/${JSON.parse(localStorage.getItem("userData")).user_id}`).then(res => {
                console.log(res.data)
                // setdata(res.data)
                setdata(res.data)

            })
        } else {
            axios.get(`http://localhost:8080/api/repairForm/getform`).then(res => {
                console.log(res.data)
                // setdata(res.data)
                setdata(res.data)

            })
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
        axios.post("http://localhost:8080/api/repairForm/updatestatus", data).then(res => {
            console.log(res)
        })

    }
    const handleSearch = (e) => {
        setisSearching(true)
        const datasearch = data.filter((data) => data.room.toLowerCase().includes(e.target.value.toLowerCase()))
       console.log(datasearch)
       setfindData(datasearch)
       if(e.target.value===''){
           setisSearching(false)
       }
    }
        
   
    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Paper 
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 230 }}
            >
                
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Room"
                    inputProps={{ 'aria-label': 'search room' }}
                    onChange={handleSearch}
                />
               
                    <SearchIcon />
               
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
               
            </Paper>
        </div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell align="left">name</StyledTableCell>
                            <StyledTableCell align="left">surname&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">phone number&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">room number&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">status&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">details&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">date time&nbsp;</StyledTableCell>
                            <StyledTableCell align="left">edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isSearching?
                            findData.map((row, index) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.surname}</StyledTableCell>
                                    <StyledTableCell align="left">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="left">{row.room}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {JSON.parse(localStorage.getItem("userData")).role === "admin" ? <Box sx={{ minWidth: 100 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={row.status}
                                                    onChange={(e) => updatestatus(row.id, e.target.value)}
                                                >
                                                    <MenuItem value="wait">wait</MenuItem>
                                                    <MenuItem value="pending">pending</MenuItem>
                                                    <MenuItem value="success">success</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box> : <StyledTableCell align="right">{row.status}</StyledTableCell>}
    
    
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.details}</StyledTableCell>
                                    <StyledTableCell align="left">{row.dates}</StyledTableCell>
                                    <StyledTableCell align="left"> <Link to="/edit"
                                        state={{ editData: row }}
                                    ><EditIcon /></Link></StyledTableCell>
    
    
                                </StyledTableRow>
                               
                            )
                        ):data.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.surname}</StyledTableCell>
                                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                                <StyledTableCell align="left">{row.room}</StyledTableCell>
                                <StyledTableCell align="left">
                                    {JSON.parse(localStorage.getItem("userData")).role === "admin" ? <Box sx={{ minWidth: 100 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={row.status}
                                                onChange={(e) => updatestatus(row.id, e.target.value)}
                                            >
                                                <MenuItem value="wait">wait</MenuItem>
                                                <MenuItem value="pending">pending</MenuItem>
                                                <MenuItem value="success">success</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box> : <StyledTableCell align="right">{row.status}</StyledTableCell>}


                                </StyledTableCell>
                                <StyledTableCell align="left">{row.details}</StyledTableCell>
                                <StyledTableCell align="left">{row.dates}</StyledTableCell>
                                <StyledTableCell align="left"> <Link to="/edit"
                                    state={{ editData: row }}
                                ><EditIcon /></Link></StyledTableCell>


                            </StyledTableRow>
                           
                        )
                    )}
                       
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

        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
