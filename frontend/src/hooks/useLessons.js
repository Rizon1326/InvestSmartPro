import { useState, useEffect, useCallback } from 'react';
import { getLessons, getLesson, completeLesson, getProgress } from '../api/client';

export function useLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getLessons();
      setLessons(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch lessons');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLessons(); }, [fetchLessons]);

  return { lessons, loading, error, refetch: fetchLessons };
}

export function useLesson(slug) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLesson = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getLesson(slug);
      setLesson(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch lesson');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchLesson(); }, [fetchLesson]);

  return { lesson, loading, error };
}

export function useCompleteLesson() {
  const [loading, setLoading] = useState(false);

  const complete = async (slug) => {
    setLoading(true);
    try {
      const res = await completeLesson(slug);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { complete, loading };
}

export function useLessonProgress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProgress();
      setProgress(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
}
