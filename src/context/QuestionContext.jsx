import { createContext, useEffect, useReducer, useContext, useCallback, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  getQuestions,
  addQuestion as addQuestionService,
  updateQuestion as updateQuestionService,
  deleteQuestion as deleteQuestionService
} from '../services/questionService';
import toast from 'react-hot-toast';

export const QuestionContext = createContext();

const initialState = {
  questions: [],
  loading: true,
  filters: { topic: 'All', difficulty: 'All', status: 'All', search: '' }
};

const questionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, loading: false };

    case 'ADD_QUESTION':
      return { ...state, questions: [action.payload, ...state.questions] };

    case 'UPDATE_QUESTION':
      return {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload.id ? { ...q, ...action.payload } : q
        )
      };

    case 'DELETE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.payload)
      };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export const QuestionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const { currentUser } = useAuth();

  //  Fetch questions
  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      if (!currentUser) {
        dispatch({ type: 'SET_QUESTIONS', payload: [] });
        return;
      }

      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const data = await getQuestions(currentUser.uid);

        if (isMounted) {
          dispatch({ type: 'SET_QUESTIONS', payload: data || [] });
        }
      } catch {
        if (isMounted) {
          dispatch({ type: 'SET_LOADING', payload: false });
          toast.error('Failed to load questions');
        }
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  //  Add
  const addQuestion = useCallback(async (data) => {
    if (!currentUser) return;

    try {
      const newQ = await addQuestionService(currentUser.uid, data);
      if (!newQ) return;

      dispatch({ type: 'ADD_QUESTION', payload: newQ });
      toast.success('Question added');
    } catch {
      toast.error('Failed to add question');
    }
  }, [currentUser]);

  //  Update
  const updateQuestion = useCallback(async (id, data) => {
    if (!currentUser) return;

    try {
      await updateQuestionService(id, { ...data, uid: currentUser.uid });

      dispatch({ type: 'UPDATE_QUESTION', payload: { id, ...data } });
    } catch {
      toast.error('Failed to update question');
    }
  }, [currentUser]);

  //  Delete
  const deleteQuestion = useCallback(async (id) => {
    if (!currentUser) return;

    try {
      await deleteQuestionService(currentUser.uid, id);

      dispatch({ type: 'DELETE_QUESTION', payload: id });
      toast.success('Question deleted');
    } catch {
      toast.error('Failed to delete question');
    }
  }, [currentUser]);

  const setFilters = useCallback((newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  }, []);

  //  Memoized context (important)
  const value = useMemo(() => ({
    ...state,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    setFilters
  }), [state, addQuestion, updateQuestion, deleteQuestion, setFilters]);

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (!context) throw new Error('useQuestions must be used within a QuestionProvider');
  return context;
};