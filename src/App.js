import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from './components/ChartComponent';
import Button from './components/Button';
import Header from './components/Header';



const App = () => {
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  const [chart, setChart] = useState(0);
  const [show, setShow] = useState(false);

  const [freq, setFreq] = useState([]);

  // Fetch API Data and Compute frequency
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://www.terriblytinytales.com/test.txt');
      const ans = data.split(/\W+/);
      const map = new Map();
      ans.forEach((item) => {
        if (map.has(item)) {
          map.set(item, map.get(item) + 1);
        } else {
          map.set(item, 1);
        }
      });
      const map2 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
      setFreq([...map2.entries()].slice(0, 20));
    };

    getData();
  }, []);

  // Initialise Histogram Data
  useEffect(() => {
    const series = [];
    freq.forEach((item) => {
      series.push({ name: item[0], data: [item[1]] });
    });
    setChart({
      options: {
        theme: {
          mode: 'light',
          palette: 'palette10',
        },
        chart: {
          toolbar: {
            show: false,
          },
          type: 'area',
        },
        plotOptions: {
          bar: {
            columnWidth: '100%',
            rangeBarOverlap: true,
          },
        },
        xaxis: {
          categories: ['Words in the Data Given'],
        },
      },
      series: [...series],
    });
  }, [freq]);

  // Reveal Histogram
  const handleBtnClick = () => {
    setShow(!show);
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center">
      {show && <ChartComponent chart={chart} screenSize={screenSize} freq={freq} />}
      <Button show={show} handleBtnClick={handleBtnClick} />
      <Header />

    </div>
  );
};

export default App;
