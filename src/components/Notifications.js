import React, { useContext } from 'react';
import { Button, Typography } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { SocketContext } from '../SocketContext';
const { Title } = Typography;
const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Title level={4}>{call.name} is calling:</Title>
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            size="large"
            onClick={answerCall}
          >
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
