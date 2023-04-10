import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { Req } from '../Url'
import { NewsFailure, NewsSuccess } from '../Redux/NewsRedux'
import { FaqFailure, FaqSuccess } from '../Redux/FaqRedux'
import { TestFailure, TestSuccess } from '../Redux/TestRedux'
import { PaperFailure, PaperSuccess } from '../Redux/PaperRedux'
import Loader from './Loader'

const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
height: 100%;
${mobile({
  flexDirection:"column",
  padding:"10px",
  gap:"20px"
})}
`
const Upper = styled.div`
display: flex;
gap: 40px;
padding: 20px;
${mobile({
  flexDirection:"column",
  padding:"0",
  gap:"20px",
  width:"90%"
})}
`
const News = styled.div`
height: 100%;
align-items: center;
justify-content: space-evenly;
padding: 10px;
gap: 20px;
width: 550px;
display: flex;
border-radius: 10px;
box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-webkit-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-moz-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
${mobile({
  width:"95%"
})}
`
const Test = styled.div`
height: 100%;
border-radius: 10px;
align-items: center;
justify-content: space-evenly;
width: 550px;
gap: 20px;
display: flex;
padding: 10px;
box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-webkit-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-moz-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
${mobile({
  width:"95%"
})}

`
const Middle = styled.div`
display: flex;
gap: 40px;
padding: 20px;
${mobile({
  flexDirection:"column",
  padding:"0",
  gap:"20px",
  width:"90%"
})}
`
const PastPaper = styled.div`
height: 100%;
border-radius: 10px;
align-items: center;
justify-content: space-evenly;
width: 550px;
gap: 20px;
padding: 10px;
display: flex;
box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-webkit-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-moz-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
${mobile({
  width:"95%"
})}
`
const Faqs = styled.div`
height: 100%;
align-items: center;
justify-content: space-evenly;
justify-content: space-evenly;
gap: 20px;
display: flex;
border-radius: 10px;
width: 550px;
padding: 10px;
box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-webkit-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
-moz-box-shadow: 3px 5px 21px 2px rgba(0,0,0,0.48);
${mobile({
  width:"95%"
})}
`
const Image = styled.img`
height: 200px;
${mobile({
  height:"100px"
})}
`
const Info = styled.div`
`
const Head = styled.h1`
font-size: 80px;
font-weight: 500;
color: #222;
${mobile({
  fontSize:"30px"
})}
`
const Detail = styled.div`
font-size: 20px;
margin-bottom: 10px;
color: #333;
${mobile({
  fontSize:"12px",
  marginBottom:"5px"
})}
`
const Goto = styled.div`
${mobile({
  fontSize:"12px"
})}
`
const Loading = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const MiddleWare = () => {
  const dispatch = useDispatch()
  const [news,setnews] = useState()
  const [paper,setpaper] = useState()
  const [faq,setfaq] = useState()
  const [test,settest] = useState()
  const tobj = test && test[0]
  const length = tobj && (tobj.mock.length)+(tobj.chemistry.length)+(tobj.physics.length)+(tobj.math.length)
  const load = ()=>{
    if(news && paper && faq && test){
      return true
    }
    else{
      return false
    }
  }
  useEffect(()=>{
    const getnews = async()=>{
      await Req.get("/news/getnews")
      .then((res)=>{
        if(res.status === 200){
          setnews(res.data)
          dispatch(NewsSuccess(res.data))  
        }
      }).catch(()=>{
        dispatch(NewsFailure())
      })
    }
    getnews()
  },[dispatch])
  useEffect(()=>{
    const getfaq = async()=>{
      await Req.get("/faq/getfaq")
      .then((res)=>{
        if(res.status === 200){
          setfaq(res.data)
          dispatch(FaqSuccess(res.data))
        }
      }).catch(()=>{
        dispatch(FaqFailure())
      })
    }
    getfaq()
  },[dispatch])
  useEffect(()=>{
    const gettest = async()=>{
      await Req.get("/test/gettest")
      .then((res)=>{
        if(res.status === 200){
          settest(res.data)
          dispatch(TestSuccess(res.data))
        }
      }).catch(()=>{
        dispatch(TestFailure())
      })
    }
    gettest()
  },[dispatch])
  useEffect(()=>{
    const getpaper = async()=>{
      await Req.get("/pastpapers/getpaper")
      .then((res)=>{
        if(res.status === 200){
          setpaper(res.data)
          dispatch(PaperSuccess(res.data))
        }
      }).catch(()=>{
        dispatch(PaperFailure())
      })
    }
    getpaper()
  },[dispatch])
  return (
    <>
   {!load() ? <Loading><Loader/></Loading>:<Container>
    <Upper>
      <News>
        <Image src='https://cdn-icons-png.flaticon.com/512/430/430102.png'></Image>
        <Info>
          <Head>{`${news?.length} News`}</Head>
          <Detail>has been posted yet</Detail>
          <Link to="/news"><Goto>Click here to view news</Goto></Link>
        </Info>
      </News>
      <Test>
      <Image src='https://cdn-icons-png.flaticon.com/512/1205/1205526.png'></Image>
        <Info>
          <Head>{`${length} Test`}</Head>
          <Detail>has been posted yet</Detail>
          <Link to="/test"><Goto>Click here to view news</Goto></Link>
        </Info>
      </Test>
    </Upper>
    <Middle>
      <PastPaper>
      <Image src='https://cdn-icons-png.flaticon.com/512/806/806177.png'></Image>
        <Info>
          <Head>{`${paper?.length} Paper`}</Head>
          <Detail>has been posted yet</Detail>
          <Link to="/pastpapers"><Goto>Click here to view news</Goto></Link>
        </Info>
      </PastPaper>
      <Faqs>
      <Image src='https://cdn-icons-png.flaticon.com/512/9095/9095896.png'></Image>
        <Info>
          <Head>{`${faq?.length} FAQ'S`}</Head>
          <Detail>has been posted yet</Detail>
          <Link to="/faq"><Goto>Click here to view news</Goto></Link>
        </Info>
      </Faqs>
    </Middle>
   </Container>}
   </>
  )
}

export default MiddleWare