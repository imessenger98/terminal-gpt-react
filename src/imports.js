//third-party imports
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

//file imports
import callOpenAi from "./common";
import Thinking from "./components/Thinking";
import SettingsModal from "./components/SettingsModal";
import MessageList from "./components/ListMessage";
import Terminal from "./components/Terminal";
import {
  submitForm
} from "./helpers";
//text
const errorMessage =
  "API key not found. The request will fail with a status code of 401. Please set the API key in the settings.";

export {
  React,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  Input,
  SettingOutlined,
  ReactMarkdown,
  callOpenAi,
  Thinking,
  SettingsModal,
  errorMessage,
  MessageList,
  Terminal,
  submitForm,
};
