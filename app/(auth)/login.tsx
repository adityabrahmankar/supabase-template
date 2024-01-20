import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native';
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PrimaryButton, Text, View } from '@/components/Themed';
import { router, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useSupabase } from '@/hooks/useSupabase';

const FormSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, "Please enter at least 8 characters.")
        .max(64, "Please enter fewer than 64 characters."),
});

export default function LoginScreen() {
    const { signInWithPassword } = useSupabase();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            //TODO: SUPABSE AUTH
        } catch (error: Error | any) {
            console.log(error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <KeyboardAvoidingView>
                <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <TextInput
                                style={styles.inputField}
                                value={value}
                                onChangeText={onChange}
                                onBlur={() => { trigger('email') }}
                                autoCapitalize='none'
                                autoComplete='email'
                                autoCorrect={false}
                                keyboardType='email-address'
                                placeholder='khandudon@gmail.com'
                            />
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <TextInput
                                style={styles.inputField}
                                value={value}
                                onChangeText={onChange}
                                onBlur={() => { trigger('password') }}
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry
                            />
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
            <PrimaryButton
                lightColor="rgba(255,255,255,0.1)"
                darkColor="#eee"
                onPress={() => { }}
            >
                <Text>Login</Text>
            </PrimaryButton>

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4a261'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputField: {
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        // color: "#fff",
    },
});
