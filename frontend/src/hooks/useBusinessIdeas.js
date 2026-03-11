import { useState, useEffect, useCallback } from 'react';
import {
  getBusinessIdeas,
  getBusinessIdea,
  createBusinessIdea,
  deleteBusinessIdea,
  simulateBusinessIdea,
  getBusinessScenarios,
  getBusinessHistory,
} from '../api/client';

export function useBusinessIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBusinessIdeas();
      setIdeas(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch business ideas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchIdeas(); }, [fetchIdeas]);

  return { ideas, loading, error, refetch: fetchIdeas };
}

export function useBusinessIdea(id) {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIdea = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getBusinessIdea(id);
      setIdea(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch business idea');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchIdea(); }, [fetchIdea]);

  return { idea, loading, error, refetch: fetchIdea };
}

export function useCreateIdea() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createBusinessIdea(data);
      return res.data;
    } catch (err) {
      setError(err.response?.data || 'Failed to create business idea');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}

export function useDeleteIdea() {
  const [loading, setLoading] = useState(false);

  const remove = async (id) => {
    setLoading(true);
    try {
      await deleteBusinessIdea(id);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
}

export function useSimulation(id) {
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runSimulation = async (scenarioName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await simulateBusinessIdea(id, { scenario_name: scenarioName || 'Custom Simulation' });
      setSimulation(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Simulation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { simulation, runSimulation, loading, error };
}

export function useScenarios(id) {
  const [scenarios, setScenarios] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScenarios = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getBusinessScenarios(id);
      setScenarios(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate scenarios');
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { scenarios, fetchScenarios, loading, error };
}

export function useSimulationHistory(id) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getBusinessHistory(id);
      setHistory(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
}
