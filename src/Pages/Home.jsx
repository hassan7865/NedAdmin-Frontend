import React from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import MiddleWare from '../Components/MiddleWare'

const Container = styled.div``
const Home = () => {
  return (
    <Container>
        <Navbar/>
        <MiddleWare/>
    </Container>
  )
}

export default Home