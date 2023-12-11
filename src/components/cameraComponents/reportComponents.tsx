import React, { useState } from 'react';
import { View, TextInput, Switch, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'firebase/firestore';
import { createReport } from '../../Firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import StackNavigator from '../../navigators/stack.navigator';
import { useNavigation } from '@react-navigation/core';




const ReportForm = () => {
  const [reportName, setReportName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [cleaned, setCleaned] = useState(false);
  const [image, setImage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    const isDateSelected = event.type === 'set'; // Verificar si se seleccionó una fecha

    setShowDatePicker(false); // Ocultar el DatePicker en cualquier caso
  
    if (isDateSelected) {
      setDate(selectedDate || date); // Actualizar la fecha solo si se seleccionó una
    }
  };

  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requieren permisos para acceder a la galería.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requieren permisos para acceder a la cámara.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri:any) => {
    const storage = getStorage();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const ref = storageRef(storage, `images/${filename}`);
  
    const response = await fetch(uri);
    const blob = await response.blob();
  
    await uploadBytes(ref, blob);
    const downloadURL = await getDownloadURL(ref);
    return downloadURL;
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = '';

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await createReport(reportName, imageUrl, description, address, date, cleaned);
      alert('Reporte enviado con éxito');
    } catch (error) {
      alert('Error al enviar el reporte: ');
    }
  };

  return (
    <View>
      <TextInput placeholder="Nombre del reporte" value={reportName} onChangeText={setReportName} />
      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Dirección" value={address} onChangeText={setAddress} />

      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}
      <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />

      <Switch value={cleaned} onValueChange={setCleaned} />
      <Button title="Seleccionar de la Galería" onPress={pickImageFromGallery} />
      <Button title="Tomar Foto" onPress={takePhoto} />
      {image && <Text>Imagen seleccionada</Text>}

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

export default ReportForm;
