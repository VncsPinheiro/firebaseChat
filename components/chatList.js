//Importações básicas para o projeto
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'


export default function ChatList({users, currentUser}) { //Exporta uma função que renderiza os chats

    const router = useRouter(); //Cria uma const para armazenar e usar o Router
    
    return (
        <View className="flex-1">
            <FlatList
                data={users} 
                contentContainerStyle={{flex: 1, paddingVertical: 25}} //Estilização do conteúdo
                keyExtractor={item => Math.random()} //Cria uma chave aleatória e única para cada item
                showsVerticalScrollIndicator={false} //Esconde a barra de rolagem vertical
                renderItem={({item, index}) => //Oque deve ser mostrado para o usuário

                    <ChatItem 
                        noBorder={index + 1 == users.length} //Remove a borda do último item
                        router={router} //Passa o Router que será usado para navegação
                        currentUser={currentUser} //Usuário atual
                        item={item} //Dados atuais
                        index={index} //Índice dos dados
                    />
                }
            />
        </View>
    )
}
