/**
 * Este componente es el encargado de mostrar la "tarjeta" de veredicto
 * sobre si un producto es apto o no para el consumo según la condición del usuario.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DiagnosisStatus } from '@/services/diagnosis.service';

interface ScanResultProps {
    product: {
        name: string;
        brands: string;
        ingredients: string;
    };
    diagnosis: {
        status: DiagnosisStatus;
        forbiddenIngredients: string[];
    };
    onClose: () => void;
}

export function ScanResult({ product, diagnosis, onClose }: ScanResultProps) {
    const { status, forbiddenIngredients } = diagnosis;

    // Tipamos explícitamente para evitar el error de TS
    const config: Record<DiagnosisStatus, { color: string; text: string }> = {
        safe: { color: '#4CAF50', text: 'PRODUCTO APTO' },
        danger: { color: '#F44336', text: 'NO RECOMENDADO' },
        uncertain: { color: '#FF9800', text: 'ATENCIÓN / DUDA' }
    };

    const current = config[status];

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

                    {status === 'safe' && (
                        <Text style={styles.safeText}>No se detectaron ingredientes prohibidos para tu perfil.</Text>
                    )}

                    {status === 'danger' && (
                        <View>
                            <Text style={styles.dangerText}>Se detectó:</Text>
                            {forbiddenIngredients.map((ing, i) => (
                                <Text key={i} style={styles.ingredientTag}>• {ing.toUpperCase()}</Text>
                            ))}
                        </View>
                    )}

                    {status === 'uncertain' && (
                        <View style={styles.uncertainBox}>
                            <Text style={styles.uncertainTitle}>⚠️ Información Incompleta</Text>
                            <Text style={styles.uncertainDesc}>
                                Los datos de este producto no son suficientes para un diagnóstico seguro. Por favor, verificá el sello TACC o la lista de ingredientes en el envase físico.
                            </Text>
                        </View>
                    )}

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Ingredientes en base de datos:</Text>
                    <Text style={styles.ingredientsRaw}>
                        {product.ingredients || 'Sin información de ingredientes registrada.'}
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
    uncertainBox: {
        backgroundColor: '#FFF3E0',
        padding: 15,
        borderRadius: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#E65100',
    },
    uncertainTitle: { color: '#E65100', fontWeight: 'bold', fontSize: 16 },
    uncertainDesc: { color: '#E65100', marginTop: 5, lineHeight: 20 },
    // ... resto de estilos ...
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 25, zIndex: 1000 },
    card: { backgroundColor: 'white', borderRadius: 24, borderWidth: 3, maxHeight: '85%', overflow: 'hidden' },
    header: { paddingVertical: 18, alignItems: 'center' },
    headerText: { color: 'white', fontWeight: '900', fontSize: 20 },
    content: { padding: 20 },
    brand: { fontSize: 13, color: '#888', textTransform: 'uppercase' },
    name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 15 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#555' },
    safeText: { color: '#2E7D32', fontSize: 15 },
    dangerText: { color: '#C62828', fontWeight: 'bold' },
    ingredientTag: { color: '#C62828', marginLeft: 10, fontWeight: '700' },
    ingredientsRaw: { fontSize: 13, color: '#999', fontStyle: 'italic' },
    button: { backgroundColor: '#1a1a1a', paddingVertical: 20, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold', letterSpacing: 2 }
});