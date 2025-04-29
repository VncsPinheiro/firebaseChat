// Importa funções do React e do Firebase
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();// Cria o contexto de autenticação

export const AuthContextProvider = ({ children }) => {//Alimenta o contexto de autenticação

    const [user, setUser] = useState(null);    // Armazena o usuário logado
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);    //Verifica se o usuário está autenticado

    useEffect(() => {//Monitora mudanças no estado de autenticação

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) { //Usuário logado === true
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else { //Usuário logado === false
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return unsub; //Retorna a função para limpar o listener
    }, []);

    // Função para buscar e atualizar os dados adicionais do usuário no Firestore
    const updateUserData = async (userId) => { //Busca e atualiza dados extras do usuário no Firestore
        const docRef = doc(db, 'users', userId); //Documento do usuário
        const docSnap = await getDoc(docRef); //Busca o documento

        if (docSnap.exists()) { //Verifica sse o documento existe
            let data = docSnap.data();
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId });// Atualiza o usuário com os dados extras
        }
    }

    const login = async (email, password) => {//Logar o usuário

        try {
            const response = await signInWithEmailAndPassword(auth, email, password); //Tenta logar o usuário
            return { success: true };
        } catch (e) {
            let msg = e.message;
            // Tratamento de erros comuns
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/invalid-credential)')) msg = 'E-mail ou Senha errada';
            return { success: false, msg };
        }
    }

    const logout = async () => { //Logout do usuário
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    }

    const register = async (email, password, username, profileUrl) => { //Sign In de um usuário
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {//"Cria" o usuário no sistema
                username,
                profileUrl,
                userId: response?.user?.uid
            });

            return { success: true, data: response?.user };
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Esse e-mail já está em uso';
            return { success: false, msg };
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {//Hook para consumir o contexto de autenticação
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}