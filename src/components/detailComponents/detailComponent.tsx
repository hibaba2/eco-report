import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailComponent = ({ route }:{route:any}) => {
  const { report } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: report.photo }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{report.name}</Text>
        <Text style={styles.description}>{report.description}</Text>
        <Text style={styles.detail}>Fecha: {new Date(report.date).toLocaleDateString()}</Text>
        <Text style={styles.detail}>Ubicación: {report.location}</Text>
        <Text style={styles.detail}>Estado: {report.checked ? 'Verificado' : 'Pendiente'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetailComponent;
