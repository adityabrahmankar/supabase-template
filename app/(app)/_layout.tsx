import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useSupabase } from '@/hooks/useSupabase';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3, }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { signOut } = useSupabase()

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // headerShown: useClientOnlyValue(false, true),
          tabBarLabelStyle: { fontSize: 14, fontFamily: 'Geist-SemiBold', paddingBottom: 8 },
          headerTitleAlign: 'center',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'perplexity',
            headerTitle: () => <Text style={{ fontSize: 24, fontFamily: 'Geist-SemiBold' }}>perplexity</Text>,
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
            tabBarLabel: 'Home',
            headerRight: () => (
              <Pressable onPress={signOut}>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ),
            headerLeft: () => (
              <FontAwesome
                name='user'
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginLeft: 15 }}
              />
            )
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          }}
        />
      </Tabs>
  );
}
