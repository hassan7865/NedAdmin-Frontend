import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import TestComp from '../Components/TestComp';
import { mobile } from '../Responsive';
import TestForms from '../Components/TestForms';
import { useDispatch, useSelector } from 'react-redux';
import { Req } from '../Url';
import { TestFailure, TestSuccess } from '../Redux/TestRedux';
const Container = styled.div`
position: relative;
height: 100%;
overflow: hidden;
width: 100%;
`
const AddButton = styled.div`
    position: fixed;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: navy;
    bottom: 100px;
    right: 100px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${mobile({
  right: "30px",
  width: "60px",
  height: "60px"
})}
`
const Main = styled.div`
overflow-y: hidden;
position: relative;
height: ${props=>props.open ? "100vh" : "100%"};
overflow-y: ${props=>props.open && "hidden"};
`
const Test = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('1');
  const [open, setopen] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const test = useSelector((state)=>state.Test&&state.Test.test[0])
  useEffect(()=>{
    const gettest = async()=>{
      await Req.get("/test/gettest")
      .then((res)=>{
        if(res.status === 200){
        dispatch(TestSuccess(res.data))
        }
      }).catch((err)=>dispatch(TestFailure()))
    }
    gettest()
  },[dispatch])
  return (
    <Main open={open}>
      <Navbar />
      <Container>
        <Box sx={{ width: '100%', typography: 'body1'}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList style={{ display: "flex" }} onChange={handleChange} aria-label="lab API tabs example">
                <Tab style={{ flex: "1" }} label="Mock" value="1" />
                <Tab style={{ flex: "1" }} label="Chemistry" value="2" />
                <Tab style={{ flex: "1" }} label="Physics" value="3" />
                <Tab style={{ flex: "1" }} label="Maths" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {test && test.mock.map((item)=>(
                <TestComp key={item._id} type="mock" item={item}/>
              ))}
            </TabPanel>
            <TabPanel value="2">
            {test && test.chemistry.map((item)=>(
                <TestComp  key={item._id} type="chemistry" item={item}/>
              ))}
            </TabPanel>
            <TabPanel value="3">
            {test && test.physics.map((item)=>(
                <TestComp  key={item._id} type="physics" item={item}/>
              ))}
            </TabPanel>
            <TabPanel value="4">
            {test && test.math.map((item)=>(
                <TestComp  key={item._id} type="math" item={item}/>
              ))}
            </TabPanel>
          </TabContext>
        </Box>
        <AddButton onClick={() => setopen(true)}>
          <AddOutlinedIcon />
        </AddButton>
      </Container>
      <TestForms open={open} setopen={setopen} />
    </Main>
  )
}

export default Test