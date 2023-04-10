import React from 'react'
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { PaperDelete } from '../Redux/PaperRedux';
import { Req } from '../Url';
const Container = styled.div`
height: 300px;
width: 250px;
position: relative;
border: 1px solid rgba(0,0,0,0.5);
`
const Wrapper = styled.div`
height: 100%;
display: flex;
flex-direction: column;
padding: 20px;
gap: 20px;
align-items: center;
`
const Image = styled.img`
height:200px;
width: 100%;
object-fit: cover;
`
const Head = styled.p`
text-align: center;
color: #333;
font-size: 20px;
`
const Icon = styled.div`
position: absolute;
top: -20px;
right: -15px;
width: 40px;
height: 40px;
background-color: #cc2929;
border-radius: 50%;
color: white;
display: flex;
align-items: center;
justify-content: center;
`
const Past = ({items}) => {
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
        dispatch(PaperDelete(id))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        Req.delete(`/pastpapers/deletepaper/${id}`)
      }
    })
  }
  return (
   <Container>
    <Wrapper>
      <Image src={items.imgUrl}></Image>
      <Head>{items.title}</Head>
      <Icon onClick={()=>handleDelete(items._id)}><DeleteIcon/></Icon>
    </Wrapper>
   </Container>
  )
}

export default Past