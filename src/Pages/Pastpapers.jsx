import React, { useEffect, useState } from 'react'
import Past from '../Components/Past'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { mobile } from '../Responsive';
import FormPaper from '../Components/FormPaper';
import { useDispatch, useSelector } from 'react-redux';
import { PaperSuccess } from '../Redux/PaperRedux';
import { Req } from '../Url';

const Container = styled.div`
padding: 50px;
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 100px;
${mobile({
    justifyContent:"center",
    gap:"50px"
})}
`
const Section = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin: 20px;
`
const Name = styled.h1`
font-size: 40px;
font-weight: 400;
${mobile({
  fontSize:"20px"
})}
`
const Button = styled.button`
width: 120px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
background-color: teal;
cursor: pointer;
color: white;
border: none;
border-radius: 5px;
gap: 5px;
`
const Main = styled.div`
    position: relative;
    height: ${props=>props.open ? "100vh" : "100%"};
    overflow-y: ${props=>props.open && "hidden"};
`

const Pastpapers = () => {
    const [open,setopen] = useState(false)
    const past = useSelector((state)=>state.Paper.paper)
    const dispatch = useDispatch()
    useEffect(()=>{
      const getpaper = async()=>{
        await Req.get("/pastpapers/getpaper")
        .then((res)=>{
          if(res.status === 200){
            dispatch(PaperSuccess(res.data))
          }
        })
      }
      getpaper()
    },[dispatch])
  return (
    <Main open={open} >
    <Navbar/>
    <Section>
         <Name>PAST PAPERS</Name>
         <Button onClick={()=>setopen(true)}><ArticleOutlinedIcon/>Add Papers</Button>
     </Section>
     <Container>
      {past && past.map((items)=>(
        <Past key={items._id} items={items}/>
        ))}
     </Container>
     <FormPaper open={open} setopen={setopen}/>
     </Main>
  )
}

export default Pastpapers