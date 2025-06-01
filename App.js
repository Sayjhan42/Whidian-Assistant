// Whidian Assistant - Full React Native App with Chat, Browser, Notes, Voice
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const [code, setCode] = React.useState('');
  const [authenticated, setAuthenticated] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('chat');
  const [userInput, setUserInput] = React.useState('');
  const [chatLog, setChatLog] = React.useState([
    { from: 'bot', text: 'Welcome to Whidian. How can I assist you today?' }
  ]);
  const [notes, setNotes] = React.useState('');

  const verifyCode = () => {
    if (code.trim() === 'ontu-fi-tunonofor') {
      setAuthenticated(true);
    } else {
      Alert.alert('Incorrect Code', 'Please enter the correct access code.');
    }
  };

  const handleSend = () => {
    if (userInput.trim() === '') return;
    const updatedChat = [...chatLog, { from: 'user', text: userInput }];
    setChatLog(updatedChat);
    setUserInput('');
    setTimeout(() => {
      const response = \`AI: I received your message: "\${updatedChat.at(-1).text}".\`;
      setChatLog([...updatedChat, { from: 'bot', text: response }]);
    }, 1000);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <View style={styles.tabContent}>
            <ScrollView style={styles.chatLog}>
              {chatLog.map((msg, idx) => (
                <Text
                  key={idx}
                  style={msg.from === 'user' ? styles.userText : styles.botText}
                >
                  {msg.text}
                </Text>
              ))}
            </ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Ask something..."
              onChangeText={setUserInput}
              value={userInput}
            />
            <Button title="Send" onPress={handleSend} />
          </View>
        );
      case 'browser':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.text}>[Browser View Placeholder]</Text>
          </View>
        );
      case 'notes':
        return (
          <View style={styles.tabContent}>
            <TextInput
              style={[styles.input, { height: 200 }]}
              placeholder="Write your notes..."
              multiline
              value={notes}
              onChangeText={setNotes}
            />
            <Button title="Save Notes" onPress={() => Alert.alert('Saved', 'Your notes have been saved locally.')} />
          </View>
        );
      case 'voice':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.text}>[Voice Assistant Placeholder - Coming Soon]</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!authenticated ? (
        <View style={styles.authBox}>
          <Text style={styles.title}>Enter Access Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter code..."
            secureTextEntry
            onChangeText={setCode}
            value={code}
          />
          <Button title="Unlock" onPress={verifyCode} />
        </View>
      ) : (
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Whidian Assistant</Text>
          <View style={styles.tabNav}>
            {['chat', 'browser', 'notes', 'voice'].map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                <Text style={[styles.tabItem, activeTab === tab && styles.activeTab]}>{tab.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderTab()}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  authBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  chatLog: {
    flex: 1,
    marginBottom: 10,
  },
  userText: {
    color: '#66f',
    marginBottom: 6,
  },
  botText: {
    color: '#0f0',
    marginBottom: 6,
  },
  tabNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabItem: {
    color: '#888',
    fontSize: 16,
  },
  activeTab: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  tabContent: {
    flex: 1,
  },
  text: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
});
