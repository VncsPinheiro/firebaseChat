//Imports básicos do projeto
import { Text, View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const MenuItem = ({text, action, value, icon})=>{ //Componente para o menu com 4 parâmetros
    return (
        
        <MenuOption onSelect={()=> action(value)}> {/*Opção que executa e passa o valor quando selecionada*/}
            
            <View className="px-4 py-1 flex-row justify-between items-center">{/*Organiza o texto e o ícone em row*/}
                
                <Text style={{fontSize: hp(1.7)}} className="font-semibold text-neutral-600">{/* Mostra o texto e faz a estilização*/}
                    {text}
                </Text>
                {icon}{/*Exibe o ícone*/}
            </View>
            
        </MenuOption>
    )
}