import React from 'react'
import styled from 'styled-components'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { mobile } from '../Responsive';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { ChemistryTestDelete, MathTestDelete, MockTestDelete, PhysicsTestDelete } from '../Redux/TestRedux';
import { Req } from '../Url';
const Container = styled.div`
padding: 15px;
${mobile({
    padding:"0",
    marginBottom:"20px"
})}
`
const Left = styled.div`
display: flex;
align-items: center;
gap: 5px;
`
const Right = styled.div`
display: flex;
align-items: center;

gap: 15px;
`
const Wrapper = styled.div`
width:100%;
height: 80px;
box-shadow: 1px 8px 33px -5px rgba(0,0,0,0.75);
-webkit-box-shadow: 1px 8px 33px -5px rgba(0,0,0,0.75);
display: flex;
align-items: center;
padding: 0 10px 0 10px;
border-radius: 10px;
justify-content: space-between;
${mobile({
  padding:"5px"
})}
`
const Transfer = styled.a`
display: flex;
align-items: center;
`
const TestComp = ({item,type}) => {
  const dispatch = useDispatch()
  const handleDelete =async(id,type)=>{
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
        if (type === "mock"){
          dispatch(MockTestDelete(id))
        }
        else if(type === "chemistry"){
          dispatch(ChemistryTestDelete(id))
        }
        else if(type === "physics"){
          dispatch(PhysicsTestDelete(id))
        }
        else if(type === "math"){
          dispatch(MathTestDelete(id))
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        Req.put(`/test/deletetest/${type}/${id}`)
      }
    })
  }
  return (
    <>
    <Container>
        <Wrapper>
        <Left><ReceiptLongOutlinedIcon/>{item.title}</Left>
        <Right>
            <Transfer href={item.link}><VisibilityOutlinedIcon style={{color:"green"}}/></Transfer><DeleteOutlineOutlinedIcon onClick={()=>handleDelete(item._id,type)} style={{color:"red"}}/>
        </Right>
        </Wrapper>
    </Container>
    </>
  )
}

export default TestComp