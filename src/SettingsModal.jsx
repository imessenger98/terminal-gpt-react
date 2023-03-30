import React from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function SettingsModal(props) {
  const { settingsModalOpen, setSettingsModalOpen } = props;
  const onFinish = (values) => {
    setSettingsModalOpen(false);
    message.success("Form submitted successfully");
  };

  const validateAccessToken = async (rule, value) => {
    if (!value) {
      throw new Error("Please enter an access token");
    }
    localStorage.setItem("token", value);
  };

  const validateUsername = async (rule, value) => {
    if (!value) {
      throw new Error("Please enter a username");
    }
    localStorage.setItem("username", value);
  };

  const initialValues = {
    accessToken:
      import.meta.env.VITE_SECRET_KEY || localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
  };

  return (
    <Modal
      title="Settings"
      centered
      open={settingsModalOpen}
      onOk={() => setSettingsModalOpen(false)}
      onCancel={() => setSettingsModalOpen(false)}
      footer={null}
    >
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          name="accessToken"
          label="Access Token"
          rules={[{ validator: validateAccessToken }]}
        >
          <Input placeholder="Enter access token" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ validator: validateUsername }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter username" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
