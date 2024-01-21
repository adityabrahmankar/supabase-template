import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

import { useSupabase } from "@/hooks/useSupabase";
import { View, Text, PrimaryButton } from "@/components/Themed";
import { TextInput, StyleSheet } from "react-native";

const FormSchema = z
	.object({
		email: z.string().email("Please enter a valid email address."),
		password: z
			.string()
			.min(8, "Please enter at least 8 characters.")
			.max(64, "Please enter fewer than 64 characters.")
			.regex(
				/^(?=.*[a-z])/,
				"Your password must have at least one lowercase letter.",
			)
			.regex(
				/^(?=.*[A-Z])/,
				"Your password must have at least one uppercase letter.",
			)
			.regex(/^(?=.*[0-9])/, "Your password must have at least one number.")
			.regex(
				/^(?=.*[!@#$%^&*])/,
				"Your password must have at least one special character.",
			),
		confirmPassword: z.string().min(8, "Please enter at least 8 characters."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Your passwords do not match.",
		path: ["confirmPassword"],
	});

export default function SignUp() {
	const { signUp } = useSupabase();
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
			await signUp(data.email, data.password);
		} catch (error: Error | any) {
			console.log(error.message);
		}
	}

	return (
		<SafeAreaView style={styles.formConatiner}>
			<View style={styles.formConatiner}>
				<Text style={{
					textAlign: 'center',
					fontFamily: 'Geist-Bold',
					fontSize: 32
				}}>Sign Up</Text>
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
					<Controller
						control={control}
						name="confirmPassword"
						render={({ field: { onChange, value } }) => (
							<View style={{}}>
								<Text
									// errors={errors.confirmPassword}
									style={styles.label}
								>
									Confirm Password
								</Text>
								<TextInput
									style={styles.input}
									placeholder="Confirm password"
									value={value}
									onChangeText={onChange}
									onBlur={() => {
										trigger("confirmPassword");
									}}
									// error={errors.confirmPassword}
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
								/>
								{errors.confirmPassword && (
									<Text>{errors.confirmPassword?.message}</Text>
								)}
							</View>
						)}
					/>
				</View>
			</View>
			<View style={{ alignItems: 'center', gap: 32 }} >
				<PrimaryButton
					onPress={handleSubmit(onSubmit)}
				>
					<Text>Sign Up</Text>
				</PrimaryButton>
				<Text
					style={{}}
					onPress={() => {
						router.replace("/(auth)/sign-in");
					}}
				>
					Already have an account? <Text style={{}}>Sign in</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
}

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
		padding: 12,
		borderWidth: 1,
		borderRadius: 4,
		color: '#fff'
	},
})