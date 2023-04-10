import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { NewsDelete } from '../Redux/NewsRedux'
import { Req } from '../Url'
import Swal from 'sweetalert2'
const Container = styled.div`
margin: 50px;
${mobile({
    margin:"30px"
})}
`
const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  ${mobile({
    flexDirection:"column",
    gap:"20px"
  })}
`
const Left = styled.div`
 flex: 1;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
`
const Right = styled.div`
 flex: 2;
`
const Head = styled.h1`
margin-bottom: 20px;
color:#333;
${mobile({
    fontSize:"20px",
    marginBottom:"10px"
})}
`
const Desc = styled.p`
 letter-spacing: 1px;
 ${mobile({
    fontSize:"12px"
 })}
`
const Button = styled.button`

width: 50%;
height: 30px;
color: white;
background-color: #e92f2f;
border: none;
border-radius: 5px;
font-size: 15px;
`
const Lower = styled.div`
margin-top: 20px;
display: flex;
justify-content: space-between;
`
const Date = styled.p`
color: #333;
font-size: 13px;
`
const NewsComp = ({item}) => {
  const dispatch = useDispatch()
  const DeleteNews = async(id)=>{
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
        dispatch(NewsDelete(id))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        Req.delete(`/news/deletenews/${id}`)
      }
    })
  }
  return (
   <Container>
    <Wrapper>
        <Left>
            <Image src={item.imgUrl}></Image>
        </Left>
        <Right>
            <Head>{item.title}</Head>
            <Desc>{item.desc}</Desc>
            <Lower><Button onClick={()=>DeleteNews(item._id)}>Delete</Button><Date>{moment(item.createdAt).fromNow()}</Date></Lower>
        </Right>
    </Wrapper>
   </Container>
  )
}

export default NewsComp