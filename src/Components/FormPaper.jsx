import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { mobile } from '../Responsive';
import app from '../Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import UploadIcon from '../Utils/upload.png'
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
height: 80%;
background-color: #333;
width: 50%;
${mobile({
    width:"80%",
    height:"60%"
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
const NewsLink = styled.input`
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
opacity: ${props=>props.disabled ? "0.7":"1"};
`
const PictureCont = styled.div`
  height: 130px;
  width: 300px;
  background-color: #222;
  justify-content: center;
  display: flex;
  position: relative;
  border-radius: 5px;
  ${mobile({
  width: "270px"
})}
`
const Image = styled.img`
height: 100%;
display: flex;
justify-content: center;
object-fit: cover;
`
const Icon = styled.label`
position: absolute;
top: -20px;
cursor: pointer;
right: -10px;
background-color: #b6b6b6;
width: 50px;
height: 50px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;`
const InputImage = styled.input``
const FormPaper = ({open,setopen}) => {
    const [inputs, setinputs] = useState({})
    const [img, setimg] = useState()
    const [load,setload] = useState(false)
    const handleChange = (e) => {
        setinputs(prev => {
          return { ...prev, [e.target.name]: e.target.value }
        })
      }
      const UploadFile = (file) => {
        const fileName = new Date().getTime() + file?.name
        const storage = getStorage(app);
        const storageRef = ref(storage, `${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              default:
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setinputs(prev=>{
                return{...prev,"imgUrl":downloadURL}
              })
            });
          }
        )
      }
      useEffect(() => { img && UploadFile(img) }, [img])
      const SumbitForm = async(e)=>{
        e.preventDefault()
        setload(true)
        await Req.post("/pastpapers/createpaper",{...inputs})
        .then((res)=>{
          if(res.status === 200){
            setload(false)
            window.location.reload()
          }
        })
      }
      const isValid = () => {
        if (inputs.title && inputs.link && inputs.imgUrl) {
          return true
        } else {
          return false
        }
      }
  return (
    <>
    {open && <Container>
        <Wrapper>
            <ArrowBackIcon onClick={()=>setopen(false)} style={{color:"white",marginBottom:"5px"}}/>
            <Head>Add Past Papers</Head>
            <Form onSubmit={SumbitForm}>
            <PictureCont>
              <Image src={inputs.imgUrl ? inputs.imgUrl : UploadIcon}></Image>
              <InputImage onChange={(e) => setimg(e.target.files[0])} id='file' style={{ display: "none" }} type="file"></InputImage>
              <Icon htmlFor='file'><AddAPhotoOutlinedIcon /></Icon>
            </PictureCont>
                <Title onChange={handleChange} name='title' placeholder='Title'></Title>
                <NewsLink onChange={handleChange} name='link' placeholder='Link'></NewsLink>
                <Button type="submit" disabled={!isValid()}>{load?<LoaderForm/>:<>POST</>}</Button>
            </Form>
        </Wrapper>
    </Container>}
    </>
  )
}

export default FormPaper