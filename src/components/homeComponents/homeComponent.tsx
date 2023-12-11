// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getReports } from '../../Firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';



const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const imageHeight = screenWidth / numColumns; // Asegúrate de que esto no sea demasiado pequeño

export type StackParamList = {
    Home: undefined;
    DetailComponent: { report: ReportInterface };
  };

const HomeScreen = () => {
  const [reports, setReports] = useState<ReportInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();


  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
  
      const fetchReports = async () => {
        setLoading(true);
        try {
          const data = await getReports();
          if (isActive) {
            setReports(data);
          }
        } catch (error) {
          console.error('Error fetching reports:', error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };
  
      fetchReports();
  
      return () => {
        isActive = false;
      };
    }, [])
  );
  

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handlePressReport = (report: ReportInterface) => {
    navigation.navigate('DetailComponent', { report });
  };

  const renderItem = ({ item }:{item:ReportInterface}) => (
    console.log(item),
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.shimmerContainer}>
        {Array.from({ length: 2 }, (_, index) => (
          <ShimmerPlaceholder 
            key={index} 
            style={styles.shimmerPlaceholder} 
          />
        ))}
      </View>
    );
  }
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {reports.map((item) => (
        <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => handlePressReport(item)}>
          <Image source={{ uri: item.photo }} style={styles.image} />
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: '#f0f0f0', // Fondo claro para el contenedor principal
    },
    itemContainer: {
      backgroundColor: '#ffffff', // Fondo blanco para cada tarjeta
      borderRadius: 10, // Bordes redondeados
      margin: 5,
      overflow: 'hidden', // Asegura que la imagen no se salga de los bordes redondeados
      shadowColor: '#000', // Sombra para dar un efecto elevado
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5, // Elevación para Android
      height: screenWidth / numColumns - 10, // Altura modificada para el espaciado
      width: screenWidth / numColumns - 10, // Ancho modificado para el espaciado
    },
    image: {
      width: '100%',
      height: '70%', // Tamaño de imagen ajustado
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5, // Espaciado alrededor del texto
      fontSize: 16, // Tamaño de fuente aumentado para mejor legibilidad
    },
    shimmerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 20,
      },
      shimmerPlaceholder: {
        width: screenWidth / numColumns - 20,
        height: screenWidth / numColumns - 20,
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#ececec', // Color de fondo para el placeholder
      },
  });

export default HomeScreen;