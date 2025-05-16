import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Mapa() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#e0f0ff', '#ffffff']} style={styles.container}>
      <Text style={styles.title}>🗺️ Mapa do Pátio</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,       // Use a coordenada do pátio real aqui
          longitude: -46.633308,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
          title="Moto ABC1234"
          description="Zona B - Fila 2"
        />
      </MapView>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar para Home</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: 400,
    borderRadius: 14,
  },
  voltar: {
    marginTop: 20,
    fontFamily: 'Inter_400Regular',
    color: '#007AFF',
  },
});
