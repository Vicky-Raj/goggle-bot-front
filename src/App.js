import React,{useState,useEffect} from "react"
import MaterialTable from "material-table"
import axios from "axios";
import {Button} from "@material-ui/core";

function Editable() {
  const url = "http://meetbot.ddns.net";


  const [classes,setClasses] = useState([
    { title: 'ClassName', field: 'name' },
    { title: 'Url', field: 'url' },
  ]);

  const [classData, setClassData] = useState([

  ]);


  const [timeTable,setTimeTable] = useState([
    { title: 'Day', field: 'day' ,editable:"never"},
    { title: '9', field: '9',lookup:{"none":"none"}},
    { title: '10', field: '10',lookup:{"none":"none"}},
    { title: '11', field: '11',lookup:{"none":"none"}},
    { title: '12', field: '12',lookup:{"none":"none"}},
    { title: '14', field: '14',lookup:{"none":"none"}},
    { title: '15', field: '15',lookup:{"none":"none"}},
  ]);

  const [tableData,setTableData] = useState([
    {day:"Mon",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},
    {day:"Tue",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},
    {day:"Wed",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},
    {day:"Thu",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},
    {day:"Fri",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},
    {day:"Sat",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},
  ]);


  const save = ()=>{
    axios.post(url+"/data",{classData,tableData})
  }

  const join = ()=>{
    axios.post(url+"/join")
  }
  const leave = ()=>{
    axios.post(url+"/leave")
  }

  const attend = ()=>{
    axios.post(url+"/attend")
  }


  useEffect(()=>{
    const lookup = {};
    classData.forEach((val)=>{
      lookup[val.url] = val.name;
    })
    lookup["none"] = "none";
    for(let i=1;i<timeTable.length;i++){
      timeTable[i]["lookup"] = lookup;
    }
    setTimeTable([...timeTable])
  },[classData])

  useEffect(()=>{
    axios.get(url+"/data").then((res)=>{
      setClassData(res.data.classes);
      if(res.data.classes.length)
        setTableData(res.data.timeTable);
    })
  },[])

  return (
    <>
    <Button onClick={save}variant="contained" color="primary" style={{margin:"0 10px"}}>save</Button>
    <Button onClick={join}variant="contained" color="primary" style={{margin:"0 10px"}}>join</Button>
    <Button onClick={leave}variant="contained" color="primary" style={{margin:"0 10px"}}>leave</Button>
    <Button onClick={attend}variant="contained" color="primary" style={{margin:"0 10px"}}>attend</Button>


    <MaterialTable
      title="Classes"
      columns={classes}
      data={classData}
      options={{
        paging:true,
        pageSize:6,       
        emptyRowsWhenPaging: true,   
        pageSizeOptions:[6,12,20,50],
      }}    
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
                setClassData([...classData, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...classData];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setClassData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...classData];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setClassData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />
     <MaterialTable
      title="TimeTable"
      columns={timeTable}
      data={tableData}
      options={{
        paging:true,
        pageSize:6,       
        emptyRowsWhenPaging: true,   
        pageSizeOptions:[6,12,20,50],
      }}    
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
                setTableData([...tableData, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...tableData];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setTableData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
      }}
    />
    </>
  )
}
 export default Editable
