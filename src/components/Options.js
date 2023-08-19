import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import { Input, Button, Row, Col } from 'antd';
import { PhoneOutlined, PhoneFilled } from '@ant-design/icons';

const Options = () => {
  const { callAccepted, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <Row gutter={[16, 16]} style={{ padding: '16px' }}>
      {!callAccepted && (
        <Col xs={24} md={18}>
          <Input
            placeholder="ID to call"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            size="large"
          />
        </Col>
      )}
      
        {callAccepted && !callEnded ? (
          <Col xs={24} md={24}><Button
            type="danger"
            icon={<PhoneOutlined />}
            size="large"
            style={{ margin: 'auto' }}
            onClick={leaveCall}
          >
            Hang Up
          </Button></Col>
        ) : (
          <Col xs={24} md={6}><Button
            type="primary"
            icon={<PhoneFilled />}
            size="large"
            style={{ background: "#0d903b", border: "none" }}
            onClick={() => callUser(idToCall)}
            block
          >
            Call
          </Button> </Col>
        )}
     
    </Row>
  );
};

export default Options;
