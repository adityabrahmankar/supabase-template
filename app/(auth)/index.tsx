import { View, Text, PrimaryButton } from "@/components/Themed";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView
			style={styles.container}
		>
			<View style={{ display: "flex", gap: 16, backgroundColor: '#192728' }}>
				<Text style={{
					fontSize: 32,
					fontWeight: '600',
					fontFamily: 'Geist-Bold',
					textAlign: 'center',
					color: '#aa7661'
				}}>Expo Template</Text>
				<Text style={{
					textAlign: 'center',
				}}>
					A simple template for developing Expo applications with Supabase as
					the backend.
				</Text>
			</View>
			<View style={styles.buttonBox}>
				<PrimaryButton
					style={{}}
					onPress={() => {
						router.push("/(auth)/sign-up");
					}}
				>
					<Text>Sign Up</Text>
				</PrimaryButton>
				<PrimaryButton
					style={{}}
					onPress={() => {
						router.push("/(auth)/sign-in");
					}}
				>
					<Text>Sign In</Text>
				</PrimaryButton>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-evenly',
		padding: 20,
		gap: 16,
		backgroundColor: '#192728'
	},
	buttonBox: {
		display: "flex",
		flexDirection: 'row',
		gap: 20,
		justifyContent: 'space-between',
		backgroundColor: '#192728'
	}
})