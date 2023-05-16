import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ChartComponent = ({ chart, screenSize, freq }) => {
  // Make CSV File Export
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.addRow(['Words', 'Frequency']);
    freq.forEach((itm) => {
      worksheet.addRow([itm[0], itm[1]]);
    });
    workbook.csv.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'data.csv');
    });
  };

  return (
    <motion.div
      initial={{ y: 300 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.7, ease: 'ease-in-out', type: 'spring' }}
      className="flex items-center justify-center flex-col"
    >
      <Chart
        options={chart.options}
        series={chart.series}
        type="bar"
        width={Math.min(900, screenSize.width - 200)}
      />
      <button className="bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleExport}>
        Export CSV
      </button>
    </motion.div>
  );
};

export default ChartComponent;
