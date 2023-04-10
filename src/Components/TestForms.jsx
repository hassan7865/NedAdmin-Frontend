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
height: 60%;
background-color: #333;
width: 50%;
${mobile({
    width:"80%",
    height:"55%"
})}
`
const Title = styled.input`
background-color: #222;
border: none;
outline: none;
height: 40px;
border-radius: 5px;
padding-left: 10px;
font-size: 15px;
color: white;

`
const Link = styled.input`
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
opacity: ${props=>props.disabled ? "0.7" : "1"};
`
const Select = styled.select`
background-color: #222;
border: none;
outline: none;
height: 40px;
padding: 10px;
font-size: 15px;
border-radius: 5px;
color: white;
`
const Options = styled.option``
const TestForms = ({open,setopen}) => {
    const [inputs,setinputs] = useState({})
    const [choice,setchoice] = useState("")
    const [load,setload] = useState(false)
    const handleChange = (e)=>{
        setinputs(
            prev=>{
                return{...prev,[e.target.name]:e.target.value}
            }
        )
    }
    const isValid=()=>{
        if(inputs.title && inputs.link && choice !=="test"){
            return true
        }else{
            return false
        }
    }
    const SubmitForm =async(e)=>{
        e.preventDefault()
        setload(true)
        await Req.put(`/test/createtest/${choice}`,{...inputs})
        .then((res)=>{
            if(res.status === 200){
                setload(false)
                window.location.reload()
            }
        })
    }
  return (
    <>
    {open && <Container>
        <Wrapper>
            <ArrowBackIcon onClick={()=>setopen(false)} style={{color:"white",marginBottom:"5px"}}/>
            <Head>Add Test</Head>
            <Form onSubmit={SubmitForm}>
                <Title name='title' onChange={handleChange} placeholder='Title'></Title>
                <Link name='link' onChange={handleChange} placeholder='Link'></Link>
                <Select onChange={(e)=>setchoice(e.target.value)}>
                    <Options value="test">Test</Options>
                    <Options value="mock">Mock</Options>
                    <Options value="chemistry">Chemistry</Options>
                    <Options value="physics">Physics</Options>
                    <Options value="math">Maths</Options>
                </Select>
                <Button disabled={!isValid()} type="submit">{load?<LoaderForm/>:<>POST</>}</Button>
            </Form>
        </Wrapper>
    </Container>}
    </>
  )
}

export default TestForms