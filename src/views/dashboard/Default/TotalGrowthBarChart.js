import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import { padding } from '@mui/system';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },

];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const [pending, setPending] = useState(0);
    const [succed, setSucced] = useState(0);
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData")).role === "user") {
            axios.get(`https://server.tomart.online/api/repairForm/series/${JSON.parse(localStorage.getItem("userData")).user_id}`).then(async(res) => {
                console.log("ress", res.data) 
                const resultdata = {all:0,pending:0,success:0}
                await res.data.forEach(element => {
                    resultdata.all+=element.count
                    if (element.status==='pending'){
                        resultdata.pending+=element.count
                    }
                    else if(element.status==='success'){
                        resultdata.success+=element.count
                    }
                });
                if (res.data[0] !== undefined && res.data.length > 1) {
                    setPending(res.data[0].count)
                    setSucced(res.data[1].count)
                    const newChartData = {
                        ...chartData.options,
                        colors: [primary200, primaryDark, secondaryMain, secondaryLight],
                        xaxis: {
                            labels: {
                                style: {
                                    colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: [primary]
                                }
                            }
                        },
                        grid: {
                            borderColor: grey200
                        },
                        tooltip: {
                            theme: 'light'
                        },
                        legend: {
                            labels: {
                                colors: grey500
                            }
                        },
    
                        series: [
                            {
                                name: '??????????????????????????????????????????????????????',
                                data: [resultdata.all, 0, 0]
                            },
                            {
                                name: '??????????????????????????????????????????',
                                data: [0, resultdata.pending, 0]
                            },
                            {
                                name: '??????????????????????????????????????????????????????',
                                data: [0, 0, resultdata.success]
                            }
                        ]
                    };
                    if (!isLoading) {
                        ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
                    }
                } 
            })
          
        } 
        else {
            
            axios.get("https://server.tomart.online/api/repairForm/series").then(async(res) => {
                const resultdata = {all:0,pending:0,success:0}
                await res.data.forEach(element => {
                    resultdata.all+=element.count
                    if (element.status==='pending'){
                        resultdata.pending+=element.count
                    }
                    else if(element.status==='success'){
                        resultdata.success+=element.count
                    }
                });
                if (res.data[0] !== undefined && res.data.length > 1) {
                    setPending(res.data[0].count)
                    setSucced(res.data[1].count)
                    const newChartData = {
                        ...chartData.options,
                        colors: [primary200, primaryDark, secondaryMain, secondaryLight],
                        xaxis: {
                            labels: {
                                style: {
                                    colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: [primary]
                                }
                            }
                        },
                        grid: {
                            borderColor: grey200
                        },
                        tooltip: {
                            theme: 'light'
                        },
                        legend: {
                            labels: {
                                colors: grey500
                            }
                        },
    
                        series: [
                            {
                                name: '??????????????????????????????????????????????????????',
                                data: [resultdata.all, 0, 0]
                            },
                            {
                                name: '??????????????????????????????????????????',
                                data: [0, resultdata.pending, 0]
                            },
                            {
                                name: '??????????????????????????????????????????????????????',
                                data: [0, 0, resultdata.success]
                            }
                        ]
                    };
                    if (!isLoading) {
                        ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
                    }
                } 
          })
        }
       
        


        // do not load chart when loading
    }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Statistics</Typography>
                                        </Grid>
                                        
                                        <Grid item>
                                            <Typography variant="h3">statistics</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
