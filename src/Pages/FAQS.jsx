import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import FAQComp from '../Components/FAQComp'
import styled from 'styled-components'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FormFaq from '../Components/FormFaq';
import { useDispatch, useSelector } from 'react-redux';
import { Req } from '../Url';
import { FaqSuccess } from '../Redux/FaqRedux';
const Container = styled.div`
 padding: 20px 30px 20px 30px;
`
const Section = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin: 20px;
`
const Name = styled.div`
font-size: 40px;
font-weight: 400;
`
const Button = styled.button`
width:120px;
height: 35px;
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
const FAQS = () => {
    const [open,setopen] = useState(false)
    const faq = useSelector((state)=>state.Faq.faq)
    const dispatch = useDispatch()
    useEffect(()=>{
      const getfaq = async()=>{
        await Req.get("/faq/getfaq")
        .then((res)=>{
          if(res.status === 200){
            dispatch(FaqSuccess(res.data))
          }
        })
      }
      getfaq()
    },[dispatch])
  return (
   <Main open={open}>
   <Navbar/>
   <Section>
         <Name>FAQ'S</Name>
         <Button onClick={()=>setopen(true)}><QuestionMarkIcon/>Add FAQ'S</Button>
     </Section>
   <Container>
    {faq && faq.map((items)=>(
    <FAQComp key={items._id} items={items}/>
    ))}
   </Container>
   <FormFaq open={open} setopen={setopen}/>
   </Main>
  )
}

export default FAQS