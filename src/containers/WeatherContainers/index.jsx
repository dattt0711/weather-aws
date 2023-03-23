import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Tabs, Tab, IconButton } from '@mui/material';
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
import FahrenheitImage from '../../images/fahrenheit.png';
import { getLocationKey, getFiveDaysForecasts, getDailyForecasts } from '../../services/utils';
const WeatherContainers = () => {
  const [listForecasts, setListForecasts] = useState([]);
  const [dailyForecast, setDailyForeCast] = useState([]);
  const [value, setValue] = useState(1);
  const [isCelsius, setIsCelsius] = useState(false);
  const [location, setLocation] = useState({
    localName: 'Ha Dong',
    city: 'Hanoi',
    country: 'VietNam',
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(async () => {
    const result = await getLocationKey();
    const locationKey = result?.data?.Key;
    localStorage.setItem('locationKey', locationKey);
    setLocation({
      localName: result?.data?.EnglishName,
      city: result?.data?.ParentCity?.EnglishName,
      country: result?.data?.Country?.EnglishName,
    })
  }, [])
  useEffect(async () => {
    const locationKey = localStorage.getItem('locationKey');
    const fiveDays = await getFiveDaysForecasts(locationKey);
    const data = fiveDays?.data?.DailyForecasts
    setListForecasts(data);
  }, [])
  useEffect(async () => {
    const locationKey = localStorage.getItem('locationKey');
    const dailyForecast = await getDailyForecasts(locationKey);
    const data = dailyForecast?.data?.DailyForecasts[0];
    setDailyForeCast(data);
  }, [])
  return (
    <Box className={styles.mainWeather}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={styles.box}>
            <Box className={clsx(styles.fullWidth, styles.textColor)}>
              <img src={ImageCover} className={styles.coverImage} />
              <Box className={styles.coverText}>
                <Typography variant="h4" fontSize={24} mb={1} className={styles.textColor}>
                  {location?.localName}
                </Typography>
                <Typography variant="subtitle1" mb={3}>
                  {location?.city}
                </Typography>
                <Typography variant="h3" fontSize={18}>
                  {location?.country}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }} className={styles.mainWeather}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent:'space-between' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Today" />
                <Tab label="Week" />
              </Tabs>
              <Box mr={5}>
              <IconButton
              onClick={()=>setIsCelsius(false)}
               className={clsx({[styles.activeIconButton]: !isCelsius})} >
                <img src={FahrenheitImage} className={styles.smallIcon}/>
              </IconButton>
              <IconButton 
              onClick={()=>setIsCelsius(true)}
              color="primary" className={clsx({[styles.activeIconButton]: isCelsius})}>
                <img src={CelsiusImage} className={styles.smallIcon}/>
              </IconButton>
              </Box>
            </Box>
            <TabPanel value={value} index={0}>
              <TodayTab data={dailyForecast} isCelsius={isCelsius}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WeatherCard dataList={listForecasts} isCelsius={isCelsius}/>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WeatherContainers;