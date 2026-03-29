import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet, Text, TextInput, View, FlatList, 
  TouchableOpacity, KeyboardAvoidingView, Platform, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  user: string;
  message: string;
}

const ChatApp = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('Usuario'); 
  const [messageInput, setMessageInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://juanchat-dsaaepfuaqfue7a4.spaincentral-01.azurewebsites.net/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          connection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages(prev => [...prev, { user, message }]);
          });
        })
        .catch(e => console.log('Error de conexión: ', e));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (messageInput.trim() === '' || !connection) return;

    try {
      await connection.invoke("SendMessage", userInput, messageInput);
      setMessageInput('');
    } catch (e) {
      console.error("Error enviando:", e);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMyMessage = item.user === userInput;

    return (
      <View style={[
        styles.messageWrapper, 
        isMyMessage ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }
      ]}>
        <View style={[
          styles.bubble, 
          isMyMessage ? styles.myBubble : styles.otherBubble
        ]}>
          {!isMyMessage && <Text style={styles.senderName}>{item.user}</Text>}
          <Text style={isMyMessage ? styles.myText : styles.otherText}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SignalR Chat</Text>
        <TextInput
          style={styles.nameInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Tu nombre"
        />
      </View>

      {/* Lista de Mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input de Mensaje */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={messageInput}
            onChangeText={setMessageInput}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  nameInput: { color: '#666', fontSize: 14, textAlign: 'right', minWidth: 100 },
  
  listContent: { padding: 15, paddingBottom: 20 },
  
  messageWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  bubble: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '85%',
  },
  myBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 2,
  },
  myText: { color: '#fff', fontSize: 16 },
  otherText: { color: '#333', fontSize: 16 },

  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 10,
    maxHeight: 100,
    color: '#000'
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendText: { color: '#fff', fontWeight: 'bold' }
});

export default ChatApp;