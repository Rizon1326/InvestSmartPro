import { useState, useCallback } from 'react';
import { sendChatMessage, startNewChat, getChatHistory } from '../api/client';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startSession = useCallback(async () => {
    try {
      const res = await startNewChat();
      setSessionId(res.data.session_id);
      setMessages([]);
      return res.data.session_id;
    } catch (err) {
      setError('Failed to start conversation');
    }
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text, created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      let currentSession = sessionId;
      if (!currentSession) {
        const res = await startNewChat();
        currentSession = res.data.session_id;
        setSessionId(currentSession);
      }

      const res = await sendChatMessage({ message: text, session_id: currentSession });
      const assistantMsg = { role: 'assistant', content: res.data.message, created_at: new Date().toISOString() };
      setMessages((prev) => [...prev, assistantMsg]);

      if (!sessionId) {
        setSessionId(res.data.session_id);
      }
    } catch (err) {
      setError('Failed to send message');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = useCallback(async (sid) => {
    if (!sid) return;
    try {
      const res = await getChatHistory(sid);
      setMessages(res.data.messages || []);
      setSessionId(sid);
    } catch (err) {
      setError('Failed to load history');
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  }, []);

  return { messages, sessionId, loading, error, sendMessage, startSession, loadHistory, resetChat };
}
