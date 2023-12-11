import React, { useState } from 'react';
import { View, TextInput, Switch, Button, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'firebase/firestore';
import { createReport } from '../Firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImage = async (uri:any) => {
  if (!uri) return null;

  const storage = getStorage();
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const storageRef = ref(storage, `images/${filename}`);

  const response = await fetch(uri);
  const blob = await response.blob();

  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
};




const ReportFormView = () => {
  const [reportName, setReportName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [cleaned, setCleaned] = useState(false);
  const [image, setImage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const imageUrl = await uploadImage(image);
  
      const reportData = {
        reportName,
        description,
        address,
        date: date.toISOString(),
        cleaned,
        imageUrl,
      };
  
      if (imageUrl != null) {
        await createReport(reportName, imageUrl, description, address, date, cleaned);

      }
      alert('Reporte enviado con éxito');
  
      // Limpiar formulario
      setReportName('');
      setDescription('');
      setAddress('');
      setDate(new Date());
      setCleaned(false);
      setImage('');
    } catch (error) {
      alert('Error al enviar el reporte: ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePick = async (type:any) => {
    let result;
    if (type === 'camera') {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraPermission.granted) return;
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!galleryPermission.granted) return;
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const removeImage = () => {
    setImage('');
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del reporte"
          value={reportName}
          onChangeText={setReportName}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Limpio:</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={cleaned ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setCleaned}
          value={cleaned}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleImagePick('gallery')}>
        <Text style={styles.buttonText}>Seleccionar de Galería</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleImagePick('camera')}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.deleteButton} onPress={removeImage}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePicker: {
    width: '100%',
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff3b30',
    borderRadius: 15,
    padding: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReportFormView;