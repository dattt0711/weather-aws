import * as moment from 'moment';
import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import styles from './styles.module.css'
import clsx from 'clsx';
import WindImage from '../../images/wind.png';
import HumidityImage from '../../images/humidity-sensor.png';
import CloudImage from '../../images/cloud.png';
import CelsiusImage from '../../images/celsius.png';
export const WeatherCard = (props) => {
    const { dataList } = props;
    const data = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
        {
            id: 6,
        },
        {
            id: 7,
        },
    ];
    return (
        <Grid container ml={5} spacing={2}>
            {
                dataList.map((item, index) => (
                    <Grid key={index} item xs={3} className={styles.weatherTodayContainer} mr={6} mt={4}>
                        <Grid container alignItems="center" mt={2} >
                            <Grid item xs={6} className={styles.textCenter} mb={3}>
                                <Typography className={clsx(styles.bold, styles.lgTitle)}>
                                    {moment(item?.Date).format('dddd')}
                                </Typography>
                                <Typography className={styles.light}>
                                    {item?.Day?.IconPhrase}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={styles.textCenter}>
                                <img src={CloudImage} alt="" className={styles.lgIcon} />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" mb={2}>
                            <Grid item xs={6} className={styles.textCenter}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                                    <img src={WindImage} alt="" className={styles.smallIcon} />
                                    <Typography pl={1} className={styles.mdSubtitle}>
                                        10.3 km/h
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={HumidityImage} alt="" className={styles.smallIcon} />
                                    <Typography pl={1} className={styles.mdSubtitle}>
                                        60%
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} className={styles.textCenter}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography className={styles.xlText} mr={1}>
                                        32
                                    </Typography>
                                    <img src={CelsiusImage} alt="" className={styles.mdIcon} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid >
    )
}
