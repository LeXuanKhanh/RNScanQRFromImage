import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  launchImageLibrary,
  type ImageLibraryOptions,
} from "react-native-image-picker";
import { useState, useCallback } from "react";
import { scanFromPath } from "react-native-qr-code-image-scan";

export default function App() {
  const [qrCodes, setQrCodes] = useState<string[]>([]);

  const onPress = useCallback(async () => {
    const option: ImageLibraryOptions = {
      mediaType: "photo",
    };
    const result = await launchImageLibrary(option);
    const uri = result?.assets?.[0]?.uri;
    if (!uri) {
      return;
    }

    const codes = await scanFromPath(uri);
    setQrCodes(codes);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text>Result: {qrCodes}</Text>
        <Button onPress={onPress} title="Open Picker" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
