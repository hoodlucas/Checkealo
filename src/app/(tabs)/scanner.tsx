import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { CameraView } from 'expo-camera';
import { useAuth } from '@/hooks/useAuth';
// NUEVO: Importar supabase para guardar en la BD
import { supabase } from '@/lib/supabase'; 

// Hooks y Servicios
import { useScanner } from '@/features/scanner/hooks/useScanner';
import { FoodService } from '@/services/food.service';
import { ConditionsService } from '@/services/conditions'; 
import DiagnosisService from "@/services/diagnosis.service";

// Componentes de UI
import { ScanResult } from '@/components/ui/ScanResult';



export default function ScannerPage() {
    const { permission, requestPermission, isScanning, resumeScanning, pauseScanning } = useScanner();
    
    const { session } = useAuth();
    const userId = session?.user?.id;
    
    const [userConditions, setUserConditions] = useState<any[]>([]);
    const [scanResult, setScanResult] = useState<{ product: any; diagnosis: any } | null>(null);

    useEffect(() => {
        if (!userId) return;

        const safeUserId = userId;

        async function loadConditions() {
            try {
                const conditions = await ConditionsService.getUserActiveConditions(safeUserId);
                setUserConditions(conditions);
            } catch (error) {
                console.error("Error cargando condiciones:", error);
            }
        }

        loadConditions();
    }, [userId]);


    // NUEVO: Función para insertar en la tabla 'scan_history'
    const saveToHistory = async (
        barcode: string,
        product: any,
        diagnosis: any
        ) => {
        try {
            const { error } = await supabase
            .from('scan_history')
            .insert([
                {
                user_id: userId,
                barcode: barcode,
                product_name:
                    product.product_name || "Producto desconocido",
                brand:
                    product.brands || "Marca desconocida",
                result:
                    diagnosis.isSafe ? "Apto" : "No Apto",
                scanned_at: new Date().toISOString(),
                },
            ]);

            if (error) throw error;

        } catch (error) {
            console.error(
            "Error al guardar en el historial:",
            error
            );
        }
        };

    const handleScan = async (data: string) => {
        pauseScanning(); 

        try {
            const product = await FoodService.getProductByEan(data);

            if (!product) {
                Alert.alert(
                    "No encontrado",
                    "El producto no está en nuestra base de datos.",
                    [{ text: "Reintentar", onPress: resumeScanning }]
                );
                return;
            }

            const diagnosis = DiagnosisService.checkProduct(product, userConditions);

            // NUEVO: Llamamos a la función de guardado
            await saveToHistory(data, product, diagnosis);

            setScanResult({ product, diagnosis });

        } catch (error) {
            console.error("Error en el escaneo:", error);
            Alert.alert(
                "Error", 
                "Hubo un problema al procesar el producto.",
                [{ text: "Cerrar", onPress: resumeScanning }]
            );
        }
    };

    // ... resto del componente (handleClose, renders, styles) se mantiene igual
    const handleClose = () => {
        setScanResult(null);
        resumeScanning();
    };

    if (!permission) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'white' }}>Cargando permisos...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
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
                
                {!scanResult && (
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>Encuadre el código de barras</Text>
                    </View>
                )}
            </View>

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

// ... (los estilos se mantienen igual)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cameraContainer: { flex: 1, overflow: 'hidden' },
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