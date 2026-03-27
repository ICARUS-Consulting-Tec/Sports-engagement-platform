import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

//Auth default value type

interface AuthContextType {
    signUpNewUser: (email: string, password: string) => Promise<any>;
    signInUser: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
    isAuthEnabled: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProps extends React.PropsWithChildren{
    children: ReactNode;
}

export const AuthContextProvider = ( {children} : AuthContextProps ) => {
    const [session, setSession ] = useState<Session | null>(null);

    const authUnavailableResponse = {
        success: false,
        error: "La autenticación no está configurada en este frontend.",
    };

    //Sign up
    const signUpNewUser = async (email : string, password : string) => {
        if (!supabase) {
            return authUnavailableResponse;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error("Error signing up: ", error);
            return {
                success: false, 
                error
            }
        }

        return {
            success: true,
            user: data.user
        };
    }

    //Sign in
    const signInUser = async (email: string, password: string) => {
        if (!supabase) {
            return authUnavailableResponse;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error("Error signing in: ", error);
                return {
                    success: false, 
                    error
                }
            }

            return {
                success: true,
                user: data.user
            };
        } catch(error) {
            console.error("An error ocurred", error);
            return {
                success: false,
                error: "Unexpected error signing in", 
            };
        }      
    };

    //Sign out
    async function signOut() {
        if (!supabase) {
            return authUnavailableResponse;
        }

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error signing out ", error );
        }
    }

    //Keep session updated
    useEffect(() => {
        if (!supabase) {
            setSession(null);
            return;
        }

        supabase.auth.getSession().then(({data: {session} }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider
            value={{signUpNewUser, signInUser, signOut, isAuthEnabled: isSupabaseConfigured}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const Auth = () => {
    const context =  useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    return context;
}
