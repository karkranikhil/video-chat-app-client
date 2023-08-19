import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import { SocketContext } from '../SocketContext';
const CallModel = () => {
    const { answerCall, call } = useContext(SocketContext);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    answerCall()
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal open={isModalOpen} className="modalstyle" onOk={handleOk} okText="Answer"  closable={false} cancelButtonProps={{ style: { display: 'none' } }}>
             <h2>{call.name}</h2>
            <p level={4}>is calling....</p> 
      </Modal>
    </div>
  );
};
export default CallModel;