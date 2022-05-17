import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { set } from 'date-fns';
import Totalform from './Totalform';

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [historydata, setHistoryData] = useState([]);
    const [iduser, setIduser] = useState();
    useEffect(() => {
        setLoading(false);
        setIduser(JSON.parse(localStorage.getItem("userData")).user_id)
        if (JSON.parse(localStorage.getItem("userData")).user_id === undefined) {
            window.location.href = "http://tomart.online:3000/"
        } else {
            console.log("NO")
            if (JSON.parse(localStorage.getItem("userData")).role === "user") {
                axios.get(`http://128.199.139.142:8080/api/repairForm/getform/${JSON.parse(localStorage.getItem("userData")).user_id}`).then(res => {
                    console.log(res.data)
                    // setdata(res.data)
                    setHistoryData(res.data)

                })
            } else {
                axios.get(`http://128.199.139.142:8080/api/repairForm/getform`).then(res => {
                    console.log(res.data)
                    // setdata(res.data)
                    setHistoryData(res.data)

                })
            }
        }
    }, []);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Link to="/history">
                            <EarningCard isLoading={isLoading} />
                        </Link>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Link to="/utils/util-shadow">
                            <TotalOrderLineChartCard isLoading={isLoading} />
                        </Link>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                {JSON.parse(localStorage.getItem("userData")).role === "user" ? 
                                <Link to="/utils/util-typography">
                                    <Totalform isLoading={isLoading} title='Repair Form' />
                                </Link> : 
                                <Link to="/genuser">
                                    <Totalform isLoading={isLoading} title='Create user' />
                                </Link>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <PopularCard isLoading={isLoading} historydata={historydata} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
