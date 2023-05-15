import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import axios from 'axios'
import Chart from 'react-apexcharts'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
const App = () => {
  function getCurrentDimension(){
    return {
      	width: window.innerWidth,
      	height: window.innerHeight
    }
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }  
    window.addEventListener('resize', updateDimension);
    return(() => {
        window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const [chart, setChart] = useState(0)
  const [show,setShow]=useState(false)

  const [freq,setFreq]=useState([])
  
  //Fetch API Data and Compute frequency
  useEffect(() => {
    const getData=async ()=>{
      const {data}=await axios.get("https://www.terriblytinytales.com/test.txt")
      const ans=data.split(/\W+/)
     const map=new Map()
      ans.forEach((item)=>{
        if(map.has(item)){
          map.set(item,map.get(item)+1)
        }
        else{
          map.set(item,1)
        }
      })
      const map2=new Map([...map.entries()].sort((a,b)=>{return b[1]-a[1]}))
      console.log(map2);
      setFreq([...map2.entries()].slice(0,20))
    }
    
    getData()
  }, [])
  
  //Initialise Histogram Data
  useEffect(() => {
    
    const series=[]
    freq.forEach((item)=>{series.push({name:item[0],data:[item[1]]})})
    const words=[]
    freq.forEach((itm)=>{words.push(itm[0])})
    setChart({
      options: {
        theme: {
          mode: 'light', 
          palette: 'palette10'
        },
        chart: {
          toolbar:{
            show:false
          },
          type:"area"
        },
        plotOptions:{
          bar:{
            columnWidth:"100%",
            rangeBarOverlap: true,
          }
        },
        xaxis: {
          categories: ["Words in the Data Given"]
        }
      },
      series: [...series]
    })
  }, [freq])
  
  //Reveal Histogram
  const handlebtnClick=()=>{
     setShow(!show)
  }

  //Make CSV File Export
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.addRow(['Words', 'Frequency']);
    freq.forEach((itm)=>{
      worksheet.addRow([itm[0],itm[1]]);

    })  
    workbook.csv.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'data.csv');
    });
  };
  

  return (
    <div className=' w-full min-h-screen flex flex-col gap-5 items-center justify-center'>
       {show&&<motion.div
       initial={{y:300}}
       whileInView={{y:0}}
       transition={{duration:0.7,ease:"ease-in-out", type:"spring"}}
       className='flex items-center justify-center flex-col'
       >
        <Chart
              options={chart.options}
              series={chart.series}
              type='bar'
              width={Math.min(900,screenSize.width-200)}
            /> 
        <button className='bg-blue-700 text-white px-4 py-2 rounded-md' onClick={handleExport}>Export CSV</button>
        </motion.div>
        }
       <motion.button  
       className='bg-blue-700 text-white px-4 py-2 rounded-md' 
       animate={{y:show?-900:0}}
       transition={{duration:1,ease:"ease-in-out", type:"spring"}}
       onClick={handlebtnClick}>Submit</motion.button>
    </div>  
  )
}

export default App