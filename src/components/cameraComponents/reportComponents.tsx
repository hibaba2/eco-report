import React, { useState } from 'react';
import { View, TextInput, Switch, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'firebase/firestore';


const ReportForm = () => {
  const [reportName, setReportName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [cleaned, setCleaned] = useState(false);
  const [image, setImage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
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

  const handleSubmit = async () => {
    // Lógica para enviar datos a Firebase
    const reportData = {
      reportName,
      description,
      address,
      date: date.toString(),
      cleaned,
      imageUrl: image,
    };

    try {
      //await db.collection('reports').add(reportData);
      alert('Reporte enviado con éxito');
    } catch (error) {
      alert('Error al enviar el reporte');
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
      <Button title="Adjuntar Imagen" onPress={pickImage} />
      {image && <Text>Imagen seleccionada</Text>}

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

export default ReportForm;
