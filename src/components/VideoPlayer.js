import React, { useContext } from 'react'
import { Col, Row } from 'antd'
import { SocketContext } from '../SocketContext'
const VideoPlayer =({children}) =>{
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    console.log("call", call)
  return (
    <Row gutter={16} justify="center">
        {/* //own video */}
        {stream && <Col xs={24} md={12}>
            <div className='videoCard meCard'>
                <h2 className='padding16'>{name || 'Name'}</h2>
                <video playsInline  ref={myVideo} autoPlay className="" controls={callAccepted && !callEnded}/>
                {children}
            </div>
       
        </Col>}
        {/* //Other video */}
        {callAccepted && !callEnded && (<Col xs={24} md={12}>
            <div className='videoCard userCard'>
                <h2 className='padding16'>{call.name || 'Name'}</h2>
                <video playsInline  ref={userVideo} autoPlay className="" controls={callAccepted && !callEnded}/>
                {children}
            </div>
        </Col>)}
  </Row>
  )
}

export default VideoPlayer