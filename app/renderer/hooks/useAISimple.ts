/**
 * Simple AI Hook - Knoux Clipboard AI
 * Connects to the new AI service for chat and text processing
 */

import { useState, useEffect, useCallback } from 'react';
import type { ElectronAPI } from '../types/electron';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
  processingTime?: number;
}

interface UseAISimpleReturn {
  // Chat state
  messages: ChatMessage[];
  isLoading: boolean;
  
  // Chat actions
  sendMessage: (message: string) => Promise<AIResponse>;
  clearChat: () => Promise<void>;
  
  // Text processing actions
  summarizeText: (text: string) => Promise<AIResponse>;
  rephraseText: (text: string) => Promise<AIResponse>;
  translateText: (text: string, targetLanguage?: string) => Promise<AIResponse>;
  analyzeText: (text: string) => Promise<AIResponse>;
  
  // AI status
  isAIReady: boolean;
  modelStatus: string;
}

export const useAISimple = (): UseAISimpleReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAIReady, setIsAIReady] = useState(false);
  const [modelStatus, setModelStatus] = useState('Loading...');

  // Load initial chat history and check AI status
  useEffect(() => {
    loadChatHistory();
    checkAIStatus();
  }, []);

  const loadChatHistory = useCallback(async () => {
    try {
      const response = await window.electron.ipcRenderer.invoke('ai:get-chat-history');
      if (response.success) {
        setMessages(response.data || []);
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  }, []);

  const checkAIStatus = useCallback(async () => {
    try {
      const response = await window.electron.ipcRenderer.invoke('ai:get-status');
      if (response.success) {
        setIsAIReady(response.data.isReady);
        setModelStatus(response.data.status);
      } else {
        setIsAIReady(false);
        setModelStatus('Error');
      }
    } catch (err) {
      console.error('Failed to check AI status:', err);
      setIsAIReady(false);
      setModelStatus('Offline');
    }
  }, []);

  const sendMessage = useCallback(async (message: string): Promise<AIResponse> => {
    if (!message.trim()) {
      return { success: false, error: 'Message cannot be empty' };
    }

    setIsLoading(true);
    
    try {
      // Add user message to UI immediately
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content: message,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Send to AI service
      const response = await window.electron.ipcRenderer.invoke('ai:chat', {
        message,
        timestamp: Date.now()
      });

      if (response.success) {
        // Add AI response to messages
        const aiMessage: ChatMessage = {
          id: `msg_${Date.now()}_assistant`,
          role: 'assistant',
          content: response.content || 'I apologize, but I could not generate a response.',
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        return {
          success: true,
          content: response.content,
          processingTime: response.processingTime
        };
      } else {
        throw new Error(response.error || 'AI service error');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      // Add error message to chat
      const errorMessageObj: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: `❌ Error: ${errorMessage}`,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessageObj]);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('ai:clear-chat-history');
      setMessages([]);
    } catch (err) {
      console.error('Failed to clear chat history:', err);
    }
  }, []);

  const summarizeText = useCallback(async (text: string): Promise<AIResponse> => {
    if (!text.trim()) {
      return { success: false, error: 'Text cannot be empty' };
    }

    setIsLoading(true);
    
    try {
      const response = await window.electron.ipcRenderer.invoke('ai:process-text', text, 'summarize');
      
      if (response.success) {
        return {
          success: true,
          content: response.result,
          processingTime: response.processingTime
        };
      } else {
        throw new Error(response.error || 'Summarization failed');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const rephraseText = useCallback(async (text: string): Promise<AIResponse> => {
    if (!text.trim()) {
      return { success: false, error: 'Text cannot be empty' };
    }

    setIsLoading(true);
    
    try {
      const response = await window.electron.ipcRenderer.invoke('ai:process-text', text, 'rephrase');
      
      if (response.success) {
        return {
          success: true,
          content: response.result,
          processingTime: response.processingTime
        };
      } else {
        throw new Error(response.error || 'Rephrasing failed');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const translateText = useCallback(async (text: string, targetLanguage: string = 'English'): Promise<AIResponse> => {
    if (!text.trim()) {
      return { success: false, error: 'Text cannot be empty' };
    }

    setIsLoading(true);
    
    try {
      const response = await window.electron.ipcRenderer.invoke('ai:process-text', text, 'translate', { targetLanguage });
      
      if (response.success) {
        return {
          success: true,
          content: response.result,
          processingTime: response.processingTime
        };
      } else {
        throw new Error(response.error || 'Translation failed');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeText = useCallback(async (text: string): Promise<AIResponse> => {
    if (!text.trim()) {
      return { success: false, error: 'Text cannot be empty' };
    }

    setIsLoading(true);
    
    try {
      const response = await window.electron.ipcRenderer.invoke('ai:process-text', text, 'analyze');
      
      if (response.success) {
        return {
          success: true,
          content: response.result,
          processingTime: response.processingTime
        };
      } else {
        throw new Error(response.error || 'Analysis failed');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // Chat state
    messages,
    isLoading,
    
    // Chat actions
    sendMessage,
    clearChat,
    
    // Text processing actions
    summarizeText,
    rephraseText,
    translateText,
    analyzeText,
    
    // AI status
    isAIReady,
    modelStatus,
  };
};

export default useAISimple;
