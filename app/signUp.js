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
    };

    const validateForm = () => {
        //Verifica se todos os campos estão preenchidos
        if (!formData.email || !formData.password || !formData.username || !formData.profile) {
            Alert.alert('Sign Up', 'Por favor, insira um email válido');
            return false;
        }

        // Validação de formato de email usando expressão regular
        const emailRegex = /^[\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Sing Up', "Por favor, insira um email válido")
            return false;
        }

        //Verifica requisito mínimo de segurança para a senha
        if (formData.password.length < 6) {
            Alert.alert('Sign Up', 'A senha deve ter pelo menos 6 caracteres');
            return false;
        }
        return true;
    };
    //Funcção assioncrona para lidar com o processo de registro
    const handleRegister = async () => {
        //Sai da função se falhar
        if (!validateForm()) return;

        try {
            //Ativa indicador de carregamento
            setLoading(true);
            //Chama a função de registro do contexto de autenticação (Firebase)
            const response = await register (
                formData.email,
                formData.password,
                formData.username,
                formData.profile
            );

            //Verifica se o registro não foi bem-sucedido e exibe a mensagem de erro
            if (!response.success) {
                Alert.alert('Sign Up', response.msg);
            }
        } catch (error) {
            //Capturar e tratar erros inesperados
            Alert.alert('Error', 'Ocorreu um erro ao tentar registrar. Tente novamente.');
            console.error('Registration error:', error);
        } finally {
            //Garante que o indicador de carregamento será desativado mesmo se houver erro
            setLoading(false);
        }
    };

    //Função auxiliar para renderizar campos de entrada com configuração consistente
    //Reduz duplicação de código e mantém a interface uniforme
    const renderInput
}