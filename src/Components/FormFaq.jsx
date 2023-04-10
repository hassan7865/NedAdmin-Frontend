import React, { useState } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { mobile } from '../Responsive';
import { Req } from '../Url';
import LoaderForm from './LoaderForm';
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color:rgba(0,0,0,0.9);
    top: 0;
    display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
`
const Form = styled.form`
display: flex;
flex-direction: column;
gap: 20px;
`
const Wrapper = styled.div`
padding: 20px;

flex-direction: column;
height: 50%;
background-color: #333;
width: 50%;
${mobile({
    width:"80%",
    height:"45%"
})}
`
const Question = styled.input`
background-color: #222;
border: none;
outline: none;
height: 40px;
border-radius: 5px;
padding-left: 10px;
font-size: 15px;
color: white;

`
const Answer = styled.input`
background-color: #222;
border: none;
outline: none;
height: 40px;
padding-left: 10px;
font-size: 15px;
border-radius: 5px;
color: white;
`
const Head = styled.h1`
    color: white;
    font-weight: 500;
    margin-bottom:30px;
    font-size: 35px;
`
const Button = styled.button`
height: 30px;
background-color:#cc2929;
border: none;
font-size: 15px;
border-radius: 5px;
color: white;
opacity: ${props=>props.disabled ? "0.7":"1"};
`
const FormFaq = ({open,setopen}) => {
    const [question,setquestion] = useState("")
    const [load,setload] = useState(false)
    const [answer,setanswer] = useState("")
    const isValid=()=>{
        if(question!=="" && answer!==""){
            return true
        }
        else{
            return false
        }
    }
    const SumbitForm =async(e)=>{
        setload(true)
        e.preventDefault()
        await Req.post("/faq/createfaq",{question,answer})
        .then((res)=>{
            setload(false)
            if(res.status === 200){
                window.location.reload()
            }
        })
    }
  return (
    <>
    {open && <Container>
        <Wrapper>
            <ArrowBackIcon onClick={()=>setopen(false)} style={{color:"white",marginBottom:"5px"}}/>
            <Head>Add FAQ'S</Head>
            <Form onSubmit={SumbitForm}>
                <Question onChange={(e)=>setquestion(e.target.value)} placeholder='Question'></Question>
                <Answer onChange={(e)=>setanswer(e.target.value)} placeholder='Answers'></Answer>
                <Button disabled={!isValid()} type="submit">{load?<LoaderForm/>:<>POST</>}</Button>
            </Form>
        </Wrapper>
    </Container>}
    </>
  )
}

export default FormFaq