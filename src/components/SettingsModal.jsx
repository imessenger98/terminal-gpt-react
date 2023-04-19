import React from "react";
import { Form, Modal, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../styles/App.css";

export default function SettingsModal(props) {
  const { settingsModalOpen, setSettingsModalOpen, setUsername, username } =
    props;

  const onFinish = () => {
    setSettingsModalOpen(false);
    window.location.reload();
  };

  const validateAccessToken = async (rule, value) => {
    if (!value) {
      throw new Error("Please enter an API key");
    }
    localStorage.setItem("token", value);
  };

  const validateUsername = async (rule, value) => {
    const regex = /^[A-Za-z0-9]+$/;
    if (!value) {
      throw new Error("Please enter a prompt.");
    } else if (!regex.test(value)) {
      throw new Error(
        "Only capital letters, small letters, and numbers are allowed."
      );
    } else {
      localStorage.setItem("username", value);
      setUsername(value);
    }
  };

  const initialValues = {
    accessToken:
      import.meta.env.VITE_SECRET_KEY || localStorage.getItem("token") || null,
    username: username || localStorage.getItem("username") || null,
  };

  const closeButton = () => {
    setSettingsModalOpen(false);
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
          label="API key"
          rules={[{ validator: validateAccessToken }]}
        >
          <Input placeholder="Enter API key" />
        </Form.Item>
        <span className="description">
          To get your OpenAPI key, please visit:{" "}
          <a
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
          >
            openAi
          </a>
        </span>
        <Form.Item
          name="username"
          label="Prompt"
          rules={[{ validator: validateUsername }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter Prompt for the terminal" />
        </Form.Item>

        <Form.Item>
          <Button onClick={closeButton} className="cancelButton">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
