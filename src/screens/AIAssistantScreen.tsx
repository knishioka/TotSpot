import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../constants/theme';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  suggestions?: Suggestion[];
}

interface Suggestion {
  id: string;
  venue: string;
  reason: string;
  features: string[];
  estimatedTime: string;
}

export const AIAssistantScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your TotSpot AI assistant. I can help you plan the perfect outing with your little ones. What are you looking for today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "Find a quiet cafe for nursing",
    "Rainy day activities for 2 year old",
    "Places with outdoor play areas",
    "Weekend brunch spots with high chairs",
  ];

  const generateMockResponse = (query: string): Message => {
    // Mock AI responses based on query
    const responses: { [key: string]: { content: string; suggestions?: Suggestion[] } } = {
      nursing: {
        content: "I found 3 perfect spots for nursing with quiet, comfortable spaces:",
        suggestions: [
          {
            id: '1',
            venue: 'The Missing Bean',
            reason: 'Private nursing room with comfortable seating',
            features: ['🤱 Dedicated nursing room', '🛋️ Comfortable armchair', '🔇 Quiet atmosphere'],
            estimatedTime: '5 min walk',
          },
          {
            id: '2',
            venue: 'Waterstones Cafe',
            reason: 'Quiet upper floor perfect for feeding',
            features: ['📚 Peaceful environment', '🪑 Cozy corners', '☕ Great coffee'],
            estimatedTime: '8 min walk',
          },
        ],
      },
      rainy: {
        content: "Here are some great indoor activities for your 2-year-old on a rainy day:",
        suggestions: [
          {
            id: '1',
            venue: 'The Story Museum',
            reason: 'Interactive story exhibitions perfect for toddlers',
            features: ['🎭 Interactive exhibits', '🧸 Toddler-friendly', '☔ All indoor'],
            estimatedTime: '10 min drive',
          },
          {
            id: '2',
            venue: 'Oxford Playhouse',
            reason: 'Regular toddler shows and workshops',
            features: ['🎬 Toddler shows', '🎨 Creative workshops', '🍼 Baby facilities'],
            estimatedTime: '15 min bus',
          },
        ],
      },
      default: {
        content: "Based on your needs, here are my top recommendations:",
        suggestions: [
          {
            id: '1',
            venue: 'G&Ds Ice Cream Cafe',
            reason: 'Family favorite with great facilities',
            features: ['🍦 Kids love it', '🪑 High chairs', '🌳 Garden seating'],
            estimatedTime: '7 min walk',
          },
          {
            id: '2',
            venue: 'University Parks Cafe',
            reason: 'Perfect for families with outdoor space',
            features: ['🏞️ Beautiful parks', '☕ Relaxed cafe', '🧸 Play areas nearby'],
            estimatedTime: '12 min walk',
          },
        ],
      },
    };

    // Simple keyword matching for demo
    let response = responses.default;
    if (query.toLowerCase().includes('nursing') || query.toLowerCase().includes('quiet')) {
      response = responses.nursing;
    } else if (query.toLowerCase().includes('rainy') || query.toLowerCase().includes('indoor')) {
      response = responses.rainy;
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      ...response,
    };
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateMockResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
    handleSend();
  };

  const handleSuggestionPress = (suggestion: Suggestion) => {
    // In real app, would navigate to venue details
    alert(`Opening ${suggestion.venue} details...`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <View style={styles.betaBadge}>
          <Text style={styles.betaText}>BETA</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              {message.type === 'assistant' && (
                <View style={styles.assistantIcon}>
                  <Ionicons name="sparkles" size={20} color={colors.primary} />
                </View>
              )}
              <View style={[
                styles.messageBubble,
                message.type === 'user' ? styles.userMessage : styles.assistantMessage
              ]}>
                <Text style={[
                  styles.messageText,
                  message.type === 'user' && styles.userMessageText
                ]}>
                  {message.content}
                </Text>
                
                {message.suggestions && (
                  <View style={styles.suggestionsContainer}>
                    {message.suggestions.map((suggestion) => (
                      <TouchableOpacity
                        key={suggestion.id}
                        style={styles.suggestionCard}
                        onPress={() => handleSuggestionPress(suggestion)}
                      >
                        <View style={styles.suggestionHeader}>
                          <Text style={styles.suggestionVenue}>{suggestion.venue}</Text>
                          <Text style={styles.suggestionTime}>{suggestion.estimatedTime}</Text>
                        </View>
                        <Text style={styles.suggestionReason}>{suggestion.reason}</Text>
                        <View style={styles.suggestionFeatures}>
                          {suggestion.features.map((feature, index) => (
                            <Text key={index} style={styles.featureText}>{feature}</Text>
                          ))}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
          
          {isTyping && (
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.typingText}>AI is thinking...</Text>
            </View>
          )}
        </ScrollView>

        {messages.length === 1 && (
          <View style={styles.quickPromptsContainer}>
            <Text style={styles.quickPromptsTitle}>Try asking:</Text>
            {quickPrompts.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickPrompt}
                onPress={() => handleQuickPrompt(prompt)}
              >
                <Text style={styles.quickPromptText}>{prompt}</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything about places for kids..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            multiline
            maxLength={200}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? 'white' : colors.text.secondary} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  betaBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  betaText: {
    ...typography.caption,
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  assistantIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  messageBubble: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 16,
  },
  assistantMessage: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.border,
  },
  userMessage: {
    backgroundColor: colors.primary,
    marginLeft: spacing.xl,
  },
  messageText: {
    ...typography.body,
    color: colors.text.primary,
  },
  userMessageText: {
    color: 'white',
  },
  suggestionsContainer: {
    marginTop: spacing.md,
  },
  suggestionCard: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  suggestionVenue: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  suggestionTime: {
    ...typography.caption,
    color: colors.primary,
  },
  suggestionReason: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  suggestionFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  featureText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  typingText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  quickPromptsContainer: {
    padding: spacing.lg,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quickPromptsTitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  quickPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  quickPromptText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.lg,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    maxHeight: 100,
    ...typography.body,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.background,
  },
});