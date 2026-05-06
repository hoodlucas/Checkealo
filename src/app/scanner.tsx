import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { CameraView } from 'expo-camera';

// Hooks y Servicios
import { useScanner } from '@/features/scanner/hooks/useScanner';
import { FoodService } from '@/services/food.service';
import { DiagnosisService, HealthCondition } from '@/services/diagnosis.service';

// Componentes de UI
import { ScanResult } from '@/components/ui/ScanResult';

export default function ScannerPage() {
    const { permission, requestPermission, isScanning, resumeScanning, pauseScanning } = useScanner();
    
    // Estado para manejar la visibilidad y datos del resultado
    const [scanResult, setScanResult] = useState<{ product: any; diagnosis: any } | null>(null);

    /**
     * Maneja la captura del código de barras
     * 1. Pausa la cámara
     * 2. Busca el producto en la API
     * 3. Diagnostica según la condición de salud
     * 4. Muestra el componente ScanResult
     */
    const handleScan = async (data: string) => {
        pauseScanning(); 

        try {
        const product = await FoodService.getProductByEan(data);

        if (!product) {
            Alert.alert(
            "No encontrado",
            "El producto no está en nuestra base de datos mundial.",
            [{ text: "Reintentar", onPress: resumeScanning }]
            );
            return;
        }

        // IMPORTANTE: Cambié 'celiaco' por 'celiac' para que coincida con el service
        const userCondition: HealthCondition = 'celiaco'; 
        const diagnosis = DiagnosisService.checkProduct(product.name, product.ingredients, userCondition);

        // Guardamos el resultado para mostrar el componente
        setScanResult({ product, diagnosis });

        } catch (error) {
        console.error("Error en el escaneo:", error);
        Alert.alert(
            "Error de conexión", 
            "No pudimos verificar el producto.",
            [{ text: "Cerrar", onPress: resumeScanning }]
        );
        }
    };

    // Función para cerrar el resultado y volver a habilitar la cámara
    const handleClose = () => {
        setScanResult(null);
        resumeScanning();
    };

    if (!permission) return <View style={styles.center}><Text>Cargando...</Text></View>;

    if (!permission.granted) {
        return (
        <SafeAreaView style={styles.center}>
            <Text style={styles.title}>Necesitamos permiso de cámara</Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Habilitar Cámara</Text>
            </TouchableOpacity>
        </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Lector de Barras' }} />
        
        <View style={styles.cameraContainer}>
            <CameraView
            style={StyleSheet.absoluteFillObject}
            onBarcodeScanned={isScanning ? undefined : ({ data }) => handleScan(data)}
            barcodeScannerSettings={{
                barcodeTypes: ["ean13", "ean8"],
            }}
            />
            
            {/* Overlay informativo mientras la cámara está activa */}
            {!scanResult && (
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>Encuadre el código de barras</Text>
            </View>
            )}
        </View>

        {/* Renderizado condicional del componente de resultado prolijo */}
        {scanResult && (
            <ScanResult 
            product={scanResult.product}
            diagnosis={scanResult.diagnosis}
            onClose={handleClose}
            />
        )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cameraContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    title: { fontSize: 18, marginBottom: 20, color: '#fff' },
    permissionButton: { 
        backgroundColor: '#007AFF', 
        paddingVertical: 12, 
        paddingHorizontal: 25, 
        borderRadius: 10 
    },
    overlay: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    overlayText: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
    }
});