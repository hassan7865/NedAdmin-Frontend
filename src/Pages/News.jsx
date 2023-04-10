import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import NewsComp from '../Components/NewsComp'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import styled from 'styled-components'
import FormAll from '../Components/FormAll';
import { useDispatch, useSelector } from 'react-redux';
import { NewsFailure, NewsSuccess } from '../Redux/NewsRedux';
import { Req } from '../Url';
const Container = styled.div``
const Section = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin: 20px;
`
const Name = styled.h1`
font-size: 40px;
font-weight: 400;
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
const News = () => {
    const [open,setopen] = useState(false)
    const news = useSelector((state)=>state.News.news)
    const dispatch = useDispatch()
    useEffect(()=>{
      const getnews = async()=>{
        await Req.get("/news/getnews")
        .then((res)=>{
          if(res.status === 200){
          dispatch(NewsSuccess(res.data))
          }
        }).catch((err)=>dispatch(NewsFailure()))
      }
      getnews()
    },[dispatch])
  return (
   <Main open={open}>
   <Navbar/>
   <Section>
        <Name>NEWS</Name>
        <Button onClick={()=>setopen(true)}><NewspaperIcon/>Add News</Button>
    </Section>
   <Container>
    {news.map((item)=>(
      <NewsComp key={item._id} item={item}/>
    ))}
    </Container>
   <FormAll open={open} setopen={setopen}/>
   </Main>
  )
}

export default News