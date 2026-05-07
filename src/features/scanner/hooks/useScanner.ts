import { useState, useCallback } from 'react';
import { useCameraPermissions } from 'expo-camera';

export const useScanner = () => {
    // 1. Manejo de permisos (viene de la librería de Expo)
    const [permission, requestPermission] = useCameraPermissions();
    
    // 2. Estado para evitar escaneos múltiples accidentales
    const [isScanning, setIsScanning] = useState(false);

    // 3. Función para resetear el escáner y permitir una nueva lectura
    const resumeScanning = useCallback(() => {
        setIsScanning(false);
    }, []);

    // 4. Función para bloquear el escáner (se usa cuando detecta algo)
    const pauseScanning = useCallback(() => {
        setIsScanning(true);
    }, []);

    return {
        permission,
        requestPermission,
        isScanning,
        resumeScanning,
        pauseScanning
    };
};