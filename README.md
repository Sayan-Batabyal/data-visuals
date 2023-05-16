# Terribly-tiny-tale-assigment

**This is a assigment for frontend engineer** 

## **Take a Demo -> https://terribly-tiny-tale-assigment.vercel.app/**

***This project is a web application that fetches a text file from an API and plots a histogram of the 20 most occurring words in the text file.***

### Libraries and Framework used
- ***React***
- ***Framer Motion***
- ***React ApexCharts***
- ***ExcelJS***
- ***FileSaver***
- ***axios***

### There are 2 main components : 
`1` **Button** ->  this component renders a button that can be animated using Framer Motion. The animation is controlled by the show prop, which determines whether the button moves up or returns to its original position. The handleBtnClick function is executed when the button is clicked, allowing for custom functionality to be implemented.

`2` **ChartComponents** -> 
- React: It imports the React library to create and manage the component.

- Framer Motion: It imports the motion component from the Framer Motion library. This library provides animation capabilities to React components. In this component, it animates the div element with a spring-like transition when it comes into view.

- React ApexCharts: It imports the Chart component from the React ApexCharts library. ApexCharts is a charting library that provides interactive and visually appealing charts for React applications. This component uses ApexCharts to render a bar chart based on the provided chart prop.

- ExcelJS: It imports the ExcelJS library, which is used for manipulating Excel files. It creates an Excel workbook, adds a worksheet named 'Sheet 1', and populates it with data from the freq prop.

- FileSaver: It imports the saveAs function from the FileSaver library. This function allows saving files on the client-side. In this component, it is used to save the generated CSV file.

- The component itself, ChartComponent, is a React functional component that receives three props: chart, screenSize, and freq. It renders a bar chart using the Chart component from React ApexCharts. The chart's options and series data are passed through the chart prop.

- Additionally, the component includes a button labeled "Export CSV." When the button is clicked, the handleExport function is triggered. This function uses ExcelJS to generate a CSV file based on the freq prop, which represents word frequencies. The CSV file is then downloaded to the user's device using


### To run this in your system 

- ***step1*** ->  git clone https://github.com/shiv292003/Terribly-Tiny-Tale-.git


**install dependencies**

- ***step2*** -> npm install


**start the project**

- ***step3*** -> npm start 


