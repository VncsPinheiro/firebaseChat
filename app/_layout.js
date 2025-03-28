//importa componentes essenciais do React Native para estruturação da interface do usuário
import { View, Text } from 'react-native'
//importa React e o hook useEffect para gerenciar efeitos colaterais no ciclo de vida do componente
import React, { useEffect} from 'react'
//importa Slot para renderizar o conteudo da rota atual, useRouter para navegação e useSegments para monitorar segmentos de rota
import { Slot, useRouter, useSegments } from 'expo-router';
//importa o arquivo de estilo global (CSS) para estilizar o aplicativo
import "../global.css";
//importa o contexto de autenticação e o provider para gerenciar o estado de autenticação no aplicativo
import { AuthContextProvider, useAuth } from '../context/authContext';
//importa MenuProvider para fornecer suporte a menus pop-up em todo o aplicativo
import { MenuProvider } from 'react-native-popup-menu';

//componente principal que gerencia a navegação e autenticação do usuário
const MainLayout = () => {
    //obtem o estado de autenticação do usuário a partir do contexto  de autenticação
    const { isAuthenticated } = useAuth();
    //obtem os segmentos de rota atuais
    const segments = useSegments();
    //hook para navegação entre rotas
    const router = useRouter();

    //useEffect que é executado sempre que o estado de autenticação muda
    useEffect(() => {
        //verifica se o estado de autenticação está indefinido 
        if (typeof isAuthenticated == 'undefined') return;

        //verifica se o usuário está em uma rota dentro da aplicação (app)
        const inApp = segments[0] == '(app)';

        //se o usuário está autenticado e não está em uma rota dentro da aplicação, rediriona para a rota 'home'
        if (isAuthenticated && !inApp) {
            router.replace('home');
        }
        //se usuario não está autenticado, redireciona para a rota de login (signIn)
        else if (isAuthenticated == false) {
            router.replace('signIn');
        }
    }, [isAuthenticated]) //hook é executado novamente se 'isAuthenticated' mudar

    //retorna o Slot, que renderiza a rota ativa com base no roteamento do Expo Router
    return <Slot />
}

//componente raiz que envolve o aplicativo com provedores de contexto
export default function RootLayout() {
    return(
        //MenuProvider oferece suporte a menus pop-up em todo o aplicativo
        <MenuProvider>
            {/*AuthContextProvider oferece o contexto de autenticação para todo o aplicativo */}
            <AuthContextProvider>
                {/*MainLayout gerencia a navegação baseada na autenticação*/}
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}