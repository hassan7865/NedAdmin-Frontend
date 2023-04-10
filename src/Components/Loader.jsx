import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #000038 100%);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  &:after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  }
  @keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
} 
`
const Loader = () => {
  return (
    <Container></Container>
  )
}

export default Loader