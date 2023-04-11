import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { mobile } from '../Responsive';
import app from '../Firebase';
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
gap: 15px;
`
const Wrapper = styled.div`
padding: 20px;

flex-direction: column;
background-color: #333;
width: 50%;
${mobile({
  width: "80%",
})}
`
const Title = styled.input`
background-color: #222;
border: none;
outline: none;
height: 35px;
border-radius: 5px;
padding-left: 10px;
font-size: 15px;
color: white;

`
const NewsLink = styled.input`
background-color: #222;
border: none;
outline: none;
height: 35px;
padding-left: 10px;
font-size: 15px;
border-radius: 5px;
color: white;
`
const Desc = styled.textarea`
background-color: #222;
border: none;
border-radius: 5px;
outline: none;
padding: 10px;
font-size: 15px;
color: white;
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
justify-content: center;
`
const Head = styled.h1`
    color: white;
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 35px;
`
const Button = styled.button`
height: 30px;
background-color:#cc2929;
border: none;
font-size: 15px;
border-radius: 5px;
color: white;
opacity: ${props => props.disabled ? "0.7" : "1"};
`
const FileDoc = styled.span`
display: flex;
flex-direction: column;
gap: 10px;
color: white;
`
const InputImage = styled.input``
const Upload = styled.div`
display: flex;
align-items: center;
gap: 5px;
`
const Perc = styled.p`
color: #41f041;
`
const FormAll = ({ open, setopen }) => {
  const [inputs, setinputs] = useState({})
  const [load, setload] = useState(false)
  const [img, setimg] = useState()
  const [doc,setdoc] = useState()
  const [fileperc,setfileperc] = useState("")
  const handleChange = (e) => {
    setinputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const isValid = () => {
    if (inputs.title && inputs.desc && inputs.imgUrl) {
      return true
    } else {
      return false
    }
  }
  const UploadFile = (file, filetype) => {
    const fileName = new Date().getTime() + file?.name
    const storage = getStorage(app);
    const storageRef = ref(storage, `${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        filetype === "file" && setfileperc(progress)
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
          setinputs(prev => {
            return { ...prev, [filetype]: downloadURL }
          })
        });
      }
    )
  }
  useEffect(() => { img && UploadFile(img, "imgUrl") }, [img])
  useEffect(() => { doc && UploadFile(doc, "file") }, [doc])
  const SumbitForm = async (e) => {
    e.preventDefault()
    setload(true)
    await Req.post("/news/createnews", { ...inputs })
      .then((res) => {
        setload(false)
        if (res.status === 200) {
          window.location.reload()
        }
      })
  }
  return (
    <>
      {open && <Container>
        <Wrapper>
          <ArrowBackIcon onClick={() => setopen(false)} style={{ color: "white", marginBottom: "5px" }} />
          <Head>Create News</Head>
          <Form onSubmit={SumbitForm}>
            <PictureCont>
              <Image src={inputs.imgUrl ? inputs.imgUrl : UploadIcon}></Image>
              <InputImage onChange={(e) => setimg(e.target.files[0])} id='file' style={{ display: "none" }} type="file"></InputImage>
              <Icon htmlFor='file'><AddAPhotoOutlinedIcon /></Icon>
            </PictureCont>
            <FileDoc>
              <label>File:</label>
              <Upload>
              <InputImage  onChange={(e)=>setdoc(e.target.files[0])} type="file"></InputImage>
              <Perc>
                {fileperc>0&&`${fileperc}%`}
              </Perc>
              </Upload>
            </FileDoc>
            <Title name='title' onChange={handleChange} placeholder='Title'></Title>
            <NewsLink name='link' onChange={handleChange} placeholder='Link'></NewsLink>
            <Desc name='desc' onChange={handleChange} rows={5} placeholder='Description'></Desc>
            <Button disabled={!isValid()} type='submit'>{load ? <LoaderForm /> : <>POST</>}</Button>
          </Form>
        </Wrapper>
      </Container>}
    </>
  )
}

export default FormAll