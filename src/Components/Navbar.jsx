import React from 'react'
import styled from 'styled-components'
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { mobile } from '../Responsive'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LoginStart } from '../Redux/LoginRedux';
import { NewsEmpty } from '../Redux/NewsRedux';
import { FaqEmpty } from '../Redux/FaqRedux';
import { PaperEmpty } from '../Redux/PaperRedux';
import { TestEmpty } from '../Redux/TestRedux';
const Container = styled.div`
color: white;
background-color: #000038;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
height: 100%;
justify-content: space-between;
padding: 20px;
${mobile({
  padding: "15px"
})}
`
const Left = styled.div`
display: flex;
align-items: center;
flex: 1;
gap: 5px;
${mobile({
  fontSize: "12px",
  gap: "5px"
})}
`
const Center = styled.div`
font-size: 20px;
text-align: center;
flex: 2;
letter-spacing: 5px;
${mobile({
  fontSize: "10px",
  letterSpacing: "2px"
})}
`
const Right = styled.div`
flex:1;
display: flex;
justify-content: flex-end;
`
const Routes = styled.div``
const Navbar = () => {
  const dispatch = useDispatch()
  const handleClick = ()=>{
    dispatch(LoginStart())
    dispatch(NewsEmpty())
    dispatch(FaqEmpty())
    dispatch(PaperEmpty())
    dispatch(TestEmpty())
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Routes><ListAltIcon /></Routes>Merit
        </Left>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}> <Center>
          NED ADMISSION CELL ADMIN
        </Center></Link>
        <Right>
        <Link to="/signin" style={{color:"inherit"}}><Routes><LogoutIcon onClick={handleClick}/></Routes></Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar