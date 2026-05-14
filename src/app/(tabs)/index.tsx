import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Screen from '@/components/ui/Screen';
import { Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';

// Definimos la estructura de los datos del historial
interface ScanHistoryItem {
  id: string;
  product_name: string;
  brand: string;
  result: string;
  scanned_at: string;
  user_id: string;
  barcode: string;
}


export default function Home() {

  const { session } = useAuth();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;

  const router = useRouter();
  const isFocused = useIsFocused();
  
  // Tipamos el estado
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isFocused && userId) {
      fetchHistory();
    }
  }, [isFocused, userId]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .eq('user_id', userId)
        .order('scanned_at', { ascending: false })
        .limit(15);

      if (error) throw error;
      setHistory((data as ScanHistoryItem[]) || []);
    } catch (error) {
      console.error("Error cargando historial:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tipamos el renderItem
  const renderHistoryItem = ({ item }: { item: ScanHistoryItem }) => (
    <View style={styles.historyItem}>
      <View style={styles.itemLeft}>
        <View style={styles.placeholderIcon}>
          <Text style={{ fontSize: 18 }}>{item.result === 'Apto' ? '✅' : '❌'}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.product_name || 'Producto desconocido'}
          </Text>
          <Text style={styles.brandName} numberOfLines={1}>
            {item.brand || 'Marca desconocida'}
          </Text>
        </View>
      </View>
      <Text style={styles.timeText}>
        {new Date(item.scanned_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>☀️ Bienvenido {userEmail?.split('@')[0]}</Text>
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={() => router.push('/scanner')}
        >
          <Text style={styles.mainTitle}>Consultar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historial de comidas</Text>
        
        {loading ? (
          <ActivityIndicator color="#007AFF" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={renderHistoryItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay escaneos recientes.</Text>
            }
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    marginTop: 50,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    color: '#444',
    fontWeight: '500' as const,
  },
  mainTitle: {
    fontSize: 54,
    fontWeight: 'bold' as const,
    color: '#1A2B4C',
    letterSpacing: -1,
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#EBF2FF',
    marginHorizontal: 15,
    borderRadius: 25,
    padding: 20,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: '#1A2B4C',
    marginBottom: 20,
    textAlign: 'center' as const,
  },
  historyItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 0.85,
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  productName: {
    fontWeight: 'bold' as const,
    fontSize: 14,
    color: '#1A2B4C',
  },
  brandName: {
    fontSize: 12,
    color: '#666',
  },
  timeText: {
    fontSize: 10,
    color: '#888',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center' as const,
    marginTop: 40,
    color: '#999',
  }
});
