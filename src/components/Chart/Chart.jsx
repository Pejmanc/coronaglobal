import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(195, 219, 234, 0.7)', 'rgba(74, 170, 152, 0.7)', 'rgba(266, 167, 54, 0.7)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  // const lineChart = (
  //   dailyData[0] ? (
  //     <Line
  //       data={{
  //         labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
  //         datasets: [{
  //           data: dailyData.map((data) => data.confirmed),
  //           label: 'Infected',
  //           borderColor: '#9fc7df',
  //           backgroundColor: '#9fc7df',
  //           fill: true,
  //         }, {
  //           data: dailyData.map((data) => data.recovered),
  //           label: 'Recovered',
  //           borderColor: '#4eb59c',
  //           backgroundColor: '#4eb59c',
  //           fill: true,
  //         },{
  //           data: dailyData.map((data) => data.deaths),
  //           label: 'Deaths',
  //           borderColor: '#e2a736',
  //           backgroundColor: '#e2a736',
  //           fill: true,
  //         },  
  //         ],
  //       }}
  //     />
  //   ) : null
  // );

  return (
    <div className={styles.container}>
      {barChart}
    </div>
  );
};

export default Chart;