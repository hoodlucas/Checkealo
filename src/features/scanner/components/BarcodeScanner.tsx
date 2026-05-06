import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraView } from 'expo-camera';

interface Props {
    onCodeScanned: (data: string) => void;
    isPaused: boolean;
    }

    export const BarcodeScanner = ({ onCodeScanned, isPaused }: Props) => {
    return (
        <View style={styles.container}>
        <CameraView
            // Ocupa todo
            style={StyleSheet.absoluteFillObject}
            // Solo escanea si NO está pausado
            onBarcodeScanned={isPaused ? undefined : ({ data }) => onCodeScanned(data)}
            barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8"], // Formatos de Argentina
            }}
        />
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        borderRadius: 20, // Para que quede estético
    },
});