//Importações básicas para o projeto
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router' 
import { Entypo, Ionicons } from '@expo/vector-icons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import { Image } from 'expo-image'; 

export default function ChatRoomHeader({user, router}) { //Define o cabeçalho personalizado da tela de chat
  return (

    <Stack.Screen
        options={{
            title: '', //Deixa o título como vazio
            headerShadowVisible: false, //Remove a sombra
            headerLeft: ()=>( //Define esquerda como a margem inicial

                <View className="flex-row items-center gap-4">

                    <TouchableOpacity onPress={()=> router.back()}>{/* Botão para retornar */}
                        <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-3">{/* Mostra o nome e imagem do usuário */}

                        <Image 
                            source={user?.profileUrl}
                            style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
                        />

                        <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                            {user?.username}
                        </Text>

                    </View>
                </View>
            ),
            headerRight: ()=>( // Define a direita como a margem principal
                <View className="flex-row items-center gap-8">{/* Ícones para chamadas de vídeo e voz */}

                    <Ionicons name="call" size={hp(2.8)} color={'#737373'} />
                    <Ionicons name="videocam" size={hp(2.8)} color={'#737373'} />

                </View>
            )
        }}
    />
  )
}