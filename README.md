# Documentação

## - chatList.js

Boas práticas:
- ChatList é um componente isolado responsável por uma ação específica
- Uso de FlatList ao invés de um ScrollView com loop interno
- Uso de props para reutilização do componente
- Navegação centralizada com useRouter


Opções de escalabilidade: 
- Trocar o Math.random() por algo melhor como alguma propriedade única do usuário
- Uso de Typescript
- Otimização de performance com initialNumToRender e windowSize para FlatList

## - chatRoomHeader.js

Boas práticas:
- Uso de TouchableOpacity com Entypo para botão de voltar
- Uso de estilização correta para alinhar elementos do layout
- Uso do Stack.Screen para o cabeçalho

Opções de escalabilidade:
- Validar o user para evitar algo indefinido
- Uso de Typescript
- Uma imagem padrão caso a do usuário esteja faltando

## - context.js

Boas práticas:
- Centralização de autenticação (sem prop drilling)
- Separação de Funções
- Desestruturação de Objetos
- Tratamento de Erros com Try Catch

Opções para escalabilidade: 
- Separar as funções do usuário de funções relacionadas ao Firestore
- Usar useReducer ao invés de useState e useEffect
- Usar Typescript para tipar o código

## - customMenuItems.js

Boas práticas:
- Uso do react-native-responsive-screen para garantir responsividade da tela
- Funções como props em action
- Uso de flexbox para alinhar horizontalmente textos e ícones
  
Opções para escalabilidade: 
- Usar Typescript
- Permitir estilos externos por props