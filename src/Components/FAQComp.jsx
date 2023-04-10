import React from 'react'
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { Req } from '../Url';
import Swal from 'sweetalert2'
import { FaqDelete } from '../Redux/FaqRedux';
const Container = styled.div`
position: relative;
margin-bottom: 50px;
`
const Wrapper = styled.div`
width: 100%;
`
const Question = styled.div`
  padding: 20px;
  background-color: #f3b8b8;
`
const Answer = styled.div`
padding: 20px;
background-color: #adffad;
`
const Icon = styled.div` 
 width: 40px;
 height: 40px;
 border-radius: 50%;
 background-color: #e92f2f;
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 top: -20px;
 right: -10px;
cursor: pointer;
 color: white;
`
const FAQComp = ({items}) => {
  const dispatch = useDispatch()
  const handleDelete=async(id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(FaqDelete(id))
       
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        Req.delete(`/faq/deletefaq/${id}`)
      }
    })
  }
  return (
   <Container>
    <Wrapper>
        <Question>{items.question}</Question>
        <Answer>{items.answer}</Answer>
    </Wrapper>
    <Icon onClick={()=>handleDelete(items._id)}><DeleteIcon/></Icon>
   </Container>
  )
}

export default FAQComp