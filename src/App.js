import React, { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import CallModel from './components/CallModel';
import UserModal from './components/UserModal';
import Fireworks from './components/Fireworks';
import { SocketContext } from './SocketContext';

const App = () => {
  const { name, me, callAccepted, call } = useContext(SocketContext);

  return (
    <div>
      <Fireworks />
      {name ? (
        <div className='wrapper'>
          <Row gutter={[16, 16]} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'baseline' }}>
            <Col>
              <h1 className='username'>Welcome, {name}</h1>
            </Col>
            <Col >
              {me && (
                <CopyToClipboard text={me}>
                  <Button type="outline" className="myIDButton" icon={<CopyOutlined />} size="large">My Id</Button>
                </CopyToClipboard>
              )}
            </Col>
          </Row>
          <VideoPlayer>
            <Options />
            {call.isReceivingCall && !callAccepted && <CallModel />}
          </VideoPlayer>
        </div>
      ) : (
        <UserModal />
      )}
    </div>
  );
};

export default App;
