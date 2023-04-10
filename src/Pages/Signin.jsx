import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'
import { useDispatch } from 'react-redux'
import { Req } from '../Url'
import { LoginFailure, LoginStart, LoginSuccess } from '../Redux/LoginRedux'
import Loader from '../Components/Loader'

const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 height: 100vh;
 ${mobile({
    height:"80vh"
 })}
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 300px;
gap: 20px;
padding: 20px;
`
const Logo = styled.img`
height: 100px;

`
const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
`
const Input  =styled.input`
height: 40px;
padding-left: 10px;
margin: 5px;
border: 1px solid gray;
outline: none;
font-size: 13px;
`
const Button = styled.button`
height: 50px;
margin-top: 20px;
color: white;
background-color: #e92f2f;
border: none;
border-radius: 5px;
font-size: 15px;
opacity:${props=>props.disabled ? "0.7":"1"};
`
const Message = styled.p`
  color: red;
  margin-left: 10px;
`
const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Signin = () => {
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const [error,seterror] = useState("")
  const [load,setload] = useState(false)
    const dispatch = useDispatch()
    const Sumbit = async(e)=>{
      e.preventDefault()
      dispatch(LoginStart())
      setload(true)
      await Req.post("/auth/signin",{username,password})
      .then((res)=>{
        if(res.status === 200){
          setload(false)
          dispatch(LoginSuccess(res.data))
        }
      }).catch((err)=>{
        setload(false)
        dispatch(LoginFailure())
        if(err.response.data === "username"){
          seterror("username")
        }
        else if(err.response.data === "password"){
          seterror("password")
        }
      })
    }
    const isValid = ()=>{
      if(username!=="" && password!==""){
        return true
      }
      else{
        return false
      }
    }
  return (
    <>
    {load ? <Loading><Loader/></Loading>:<Container>
        <Wrapper>
            <Logo src='https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/NEDUET_logo.svg/200px-NEDUET_logo.svg.png'></Logo>
            <Form onSubmit={Sumbit}>
                <Input onChange={(e)=>setusername(e.target.value)} placeholder='Admin Name'></Input>
                {error === "username" && <Message>Invalid Username</Message>}
                <Input onChange={(e)=>setpassword(e.target.value)}  placeholder="Password"></Input>
                {error === "password" && <Message>Invalid Password</Message>}
               <Button disabled={!isValid()}   type='submit'>Signin</Button>
            </Form>
        </Wrapper>
    </Container>}
    </>
  )
}

export default Signin