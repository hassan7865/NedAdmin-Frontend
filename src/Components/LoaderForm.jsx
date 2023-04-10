import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
width: 23px;
    height: 23px;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`
const LoaderForm = () => {
  return (
    <Container>

    </Container>
  )
}

export default LoaderForm