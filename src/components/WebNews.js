import React from "react";
import { WebView } from "react-native-webview";

export default function WebNews({ navigation }) {
  const newsURL = navigation.getParam("url");

  return <WebView source={{ uri: newsURL }} style={{ flex: 1 }} />;
}
