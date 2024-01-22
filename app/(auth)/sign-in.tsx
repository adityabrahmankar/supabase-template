import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";
import { useColorScheme } from '@/components/useColorScheme';

import { PrimaryButton, Text, View } from "@/components/Themed";
import { useSupabase } from "@/hooks/useSupabase";

const FormSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
	password: z
		.string()
		.min(8, "Please enter at least 8 characters.")
		.max(64, "Please enter fewer than 64 characters."),
});

export default function SignIn() {
	const { signInWithPassword } = useSupabase();
	const router = useRouter();
	const colorScheme = useColorScheme();

	const styles = StyleSheet.create({
		formConatiner: {
			display: 'flex',
			flexDirection: 'column',
			gap: 16,
			justifyContent: 'space-between',
			height: 'auto'
		},
		inputContainer: {
			padding: 12,
			display: 'flex',
			gap: 32,
		},
		label: {
			marginVertical: 8
		},
		input: {
			padding:12,
			borderWidth: 1,
			borderColor: '#fff',
			borderRadius: 4,
			color: colorScheme === 'dark' ? '#fff' : undefined,
		}
	})

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
			await signInWithPassword(data.email, data.password);
		} catch (error: Error | any) {
			console.log(error.message);
			Alert.alert('Error Signing In', error.message)
		}
	}

	return (
		<SafeAreaView style={styles.formConatiner}>
			<View style={styles.formConatiner}>
				<Text style={{
					textAlign: 'center',
					fontFamily: 'Geist-Bold',
					fontSize: 32
				}}>Sign in</Text>
				<Text style={{
					textAlign: 'center'
				}}>
					to continue to Expo Supabase Starter
				</Text>
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<View style={{}}>
								<Text
									// errors={errors.email}
									style={styles.label}
								>Email</Text>
								<TextInput
									style={styles.input}
									placeholder="Email"
									value={value}
									onChangeText={onChange}
									onBlur={() => {
										trigger("email");
									}}
									// error={errors.email}
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect={false}
									keyboardType="email-address"
								/>
								{errors.email && (
									<Text>{errors.email?.message}</Text>
								)}
							</View>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<View style={{}}>
								<Text
									// errors={errors.password}
									style={styles.label}
								>Password</Text>
								<TextInput
									style={styles.input}
									placeholder="Password"
									value={value}
									onChangeText={onChange}
									onBlur={() => {
										trigger("password");
									}}
									// error={errors.password}
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
								/>
								{errors.password && (
									<Text>{errors.password?.message}</Text>
								)}
							</View>
						)}
					/>
				</View>
			</View>
			<View style={{ alignItems: 'center', gap: 32 }}>
				<PrimaryButton
					onPress={handleSubmit(onSubmit)}
				>
					<Text>Sign In</Text>
				</PrimaryButton>
				<Text
					style={{}}
					onPress={() => {
						router.replace("/(auth)/sign-up");
					}}
				>
					Don't have an account? <Text style={{}}>Sign up</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
}


