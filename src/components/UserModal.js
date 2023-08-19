import React, { useContext, useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { SocketContext } from '../SocketContext';
const UserModal = () => {
  const { setName, name } = useContext(SocketContext);
  const [enteredName, setEnteredName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
    .validateFields()
    .then((values) => {
      form.resetFields();
      setName(enteredName)
      setIsModalOpen(false);
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
    });
    
  };

  const setUserHandler=(e)=>{
    sessionStorage.setItem("myMeetUser", e.target.value)
   
    setEnteredName(e.target.value)
  }
  return (
    <form>
      <Modal open={isModalOpen} onOk={handleOk} okText="Enter"  closable={false} cancelButtonProps={{ style: { display: 'none' } }}>
              
              <Form form={form} layout="vertical">
              <Form.Item
                label="Username"
                name="Username"
                rules={[
                  { required: true, message: "Please input the Username!" }
                ]}
              >
               <Input
                placeholder="Name"
                value={name}
                onChange={setUserHandler}
                size="large"
              />
              </Form.Item>
            </Form>
      </Modal>
    </form>
  );
};
export default UserModal;