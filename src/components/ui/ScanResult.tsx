import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface ScanResultProps {
    product: {
        name: string;
        brands: string;
        ingredients: string;
    };
    diagnosis: {
        status: 'safe' | 'danger' | 'uncertain'; // Ahora recibimos el status
        warnings: string[];
    };
    onClose: () => void;
}

export function ScanResult({ product, diagnosis, onClose }: ScanResultProps) {
    const { status, warnings } = diagnosis;

    // Configuración unificada de colores y textos
    const configs = {
        safe: { 
            color: '#4CAF50', 
            text: 'PRODUCTO APTO', 
            subtext: 'No se detectaron riesgos para tu perfil.' 
        },
        danger: { 
            color: '#F44336', 
            text: 'NO RECOMENDADO', 
            subtext: 'Se detectaron las siguientes alertas:' 
        },
        uncertain: { 
            color: '#FF9800', 
            text: 'ATENCIÓN / DUDA', 
            subtext: 'Información insuficiente para un diagnóstico:' 
        }
    };

    const current = configs[status];

    return (
        <View style={styles.overlay}>
            <View style={[styles.card, { borderColor: current.color }]}>
                <View style={[styles.header, { backgroundColor: current.color }]}>
                    <Text style={styles.headerText}>{current.text}</Text>
                </View>

                <ScrollView style={styles.content}>
                    <Text style={styles.brand}>{product.brands || 'Marca no disponible'}</Text>
                    <Text style={styles.name}>{product.name}</Text>
                    
                    <View style={styles.divider} />

                    <Text style={[styles.subtext, { color: current.color }]}>
                        {current.subtext}
                    </Text>

                    {warnings.length > 0 && (
                        <View style={[styles.warningContainer, { backgroundColor: status === 'uncertain' ? '#FFF3E0' : '#FFEBEE' }]}>
                            {warnings.map((msg, i) => (
                                <View key={i} style={styles.warningItem}>
                                    <Text style={[styles.warningBullet, { color: current.color }]}>•</Text>
                                    <Text style={styles.warningText}>{msg}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {status === 'uncertain' && (
                        <Text style={styles.manualCheck}>
                            Por favor, verificá manualmente el envase para confirmar que sea apto.
                        </Text>
                    )}

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Datos analizados:</Text>
                    <Text style={styles.ingredientsRaw}>
                        {product.ingredients || 'Sin lista de ingredientes en base de datos.'}
                    </Text>
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>ESCANEAR OTRO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 25, zIndex: 1000 },
    card: { backgroundColor: 'white', borderRadius: 24, borderWidth: 3, maxHeight: '85%', overflow: 'hidden' },
    header: { paddingVertical: 18, alignItems: 'center' },
    headerText: { color: 'white', fontWeight: '900', fontSize: 20 },
    content: { padding: 20 },
    brand: { fontSize: 12, color: '#888', textTransform: 'uppercase' },
    name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 15 },
    subtext: { fontSize: 16, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
    warningContainer: { padding: 12, borderRadius: 10 },
    warningItem: { flexDirection: 'row', marginBottom: 6 },
    warningBullet: { fontWeight: 'bold', marginRight: 8 },
    warningText: { flex: 1, fontSize: 14, color: '#333' },
    manualCheck: { marginTop: 10, fontSize: 13, fontStyle: 'italic', color: '#666', textAlign: 'center' },
    sectionTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 8, color: '#555' },
    ingredientsRaw: { fontSize: 12, color: '#999', fontStyle: 'italic' },
    button: { backgroundColor: '#1a1a1a', paddingVertical: 20, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold', letterSpacing: 2 }
});