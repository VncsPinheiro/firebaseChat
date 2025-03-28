//Importa componentes do React Native para estruturar a interface e interatividade
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
 
//Import React, hooks de estados e referência para gerenciar os inputs e estado de carregamento
import React, { useState } from 'react';
 
//Importa funções  para criar layouts responsivos com base no tamanho da tela
import { widthPercentageToDP as wp, heightPercentage as hp } from 'react-native-responsive-screen';
 
//Importa o componente StatusBar para controlar a barra de status
import { StatusBar } from 'expo-status-bar';
 
//Importa ícones do pacote expo, como o ícone de email e etc.
import { Feather, Octicons } from '@expo/vector-icons';
 
//Importa o hook de navegação do expo-router para navegaçãoentre telas
import { useRouter } from 'expo-router';
 
//Importa componentes personalizados, como o carregamento (loading) e o gerenciamento de teclado customizado
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
 
//Importa o contexto de autenticação para gerenciar o login
import { useAuth } from '../context/authContext';

export deafult function SignUp() {
    const router = userROuter(); //hook do expo-router para navegação
    const { register } = useAuth(); //hook de autenticação do contexto global
    const [loading, setLoading] = useState(false) //Estado para exibir carregamento durante a requisição

    //Estado para armazenar os dados do formulário

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        profile: ''
    })

    //Função para atualizar o estado do formulário dinamicamnete
    const handChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }
}