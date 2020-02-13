import React from "react";
import { WebView } from "react-native-webview";

export default function WebNews({ navigation }) {
  const newsURL = navigation.getParam("url");

  return (
    <WebView
      style={{ flex: 1, backgroundColor: "#FCDC00" }}
      source={{ uri: newsURL }}
    />
  );
}
