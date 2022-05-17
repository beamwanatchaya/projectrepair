import  React,{Fragment,useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import MuiDateRangePickerDay from '@mui/lab/DateRangePickerDay';
// material-ui
import { Box, Card, Grid } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import chartData from '../dashboard/Default/chart-data/total-growth-bar-chart';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// ===============================|| SHADOW BOX ||=============================== //

const ShadowBox = ({ shadow }) => (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4.5,
                bgcolor: 'primary.light',
                color: 'grey.800'
            }}
        >
            <Box sx={{ color: 'inherit' }}>statistics {shadow}</Box>
        </Box>
    </Card>
);

ShadowBox.propTypes = {
    shadow: PropTypes.string.isRequired
};

// ============================|| UTILITIES SHADOW ||============================ //

const UtilitiesShadow = ({isLoading}) => {
    const [dateNow,setdateNow] = useState('');
    // const [value, setValue] = React.useState([null, null]);
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
                const newChartData = {
                    ...chartData.options,
                    series: [
                        {
                            name: 'การแจ้งซ่อมทั้งหมด',
                            // data: [res.data.length === 2 ? res.data[0].count + res.data[1].count : res.data[0].count + res.data[1].count + res.data[2].count, 0, 0]
                            data: [resultdata.all, 0, 0]
                        },
                        {
                            name: 'กำลังดำเนินการ',
                            data: [0, resultdata.pending, 0]
                        },
                        {
                            name: 'ดำเนินการเรียบร้อย',
                            data: [0, 0, resultdata.success]
                        }
                    ]
                };
                if (!isLoading) {
                    ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
                }
        })
      
    } else {
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
              const newChartData = {
                  ...chartData.options,
                  series: [
                      {
                          name: 'การแจ้งซ่อมทั้งหมด',
                          data: [resultdata.all, 0, 0]
                      },
                      {
                          name: 'กำลังดำเนินการ',
                          data: [0,resultdata.pending, 0]
                      },
                      {
                          name: 'ดำเนินการเรียบร้อย',
                          data: [0, 0, resultdata.success]
                      }
                  ]
              };
              if (!isLoading) {
                  ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
              }
      })
    }
const date = new Date(); // 2020-06-21
const longMonth = date.toLocaleString('en-us', { month: 'long' });
if(longMonth){setdateNow(longMonth)}
      // do not load chart when loading
  }, [isLoading]);
// let date = new Date(); // 2020-06-21
// let longMonth = date.toLocaleString('en-us', { month: 'long' });
    return(
        <MainCard title="Statistics "> 
      <h4> {dateNow}</h4> 
           <Chart {...chartData} />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <div>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </div>
        )}
      />
    </LocalizationProvider>
      
        */}
        </MainCard>
    )
    
};
    
export default UtilitiesShadow;
