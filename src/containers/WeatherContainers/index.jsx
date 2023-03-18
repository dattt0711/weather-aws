import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Tabs, Tab } from '@mui/material';
import ImageCover from '../../images/cover.jpg';
import styles from './styles.module.css'
import clsx from 'clsx';
import { TabPanel } from '../../components/TabPanel';
import { TodayTab } from './TodayTab';
import { WeatherCard } from './WeatherCard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WindImage from '../../images/wind.png';
import HumidityImage from '../../images/humidity-sensor.png';
import CelsiusImage from '../../images/celsius.png';
import { getLocationKey, getFiveDaysForecasts } from '../../services/utils';
const WeatherContainers = () => {
  const [listForecasts, setListForecasts] = useState([]);
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(async () => {
    const result = await getLocationKey();
    const locationKey = result?.data?.Key;
    localStorage.setItem('locationKey', locationKey);
  }, [])
  useEffect(async () => {
    const locationKey = localStorage.getItem('locationKey');
    const fiveDays = await getFiveDaysForecasts(locationKey);
    const data = fiveDays?.data?.DailyForecasts;
    setListForecasts(data);
  }, [])
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={styles.box}>
            <Box className={clsx(styles.fullWidth)}>
              <img src={ImageCover} className={styles.coverImage} />
              <Box className={styles.coverText}>
                <Typography variant="h4" fontSize={24} mb={1}>
                  MECCA
                </Typography>
                <Typography variant="subtitle1" mb={3}>
                  Saudi Arabia
                </Typography>
                <Typography variant="h3" >
                  32
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Today" />
                <Tab label="Week" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TodayTab />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WeatherCard dataList={listForecasts} />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WeatherContainers;