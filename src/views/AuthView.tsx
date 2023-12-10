import React from 'react'
import { StatusBar, View, StyleSheet } from 'react-native';
import { LoginComponent } from '../components/authComponents/LoginComponent';
import { SignInComponents } from '../components/authComponents/SignInComponent';

export const AuthView = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
            {/* <LoginComponent  SignInComponent /> */}
            <LoginComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});