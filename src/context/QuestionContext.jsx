import { createContext, useEffect, useReducer, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getQuestions, addQuestion as addQuestionService, updateQuestion as updateQuestionService, deleteQuestion as deleteQuestionService } from '../services/questionService';
import toast from 'react-hot-toast';

export const QuestionContext = createContext();

const initialState = {
  questions: [],
  loading: true,
  filters: { topic: 'All', difficulty: 'All', status: 'All', search: '' }
};

const questionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS': return { ...state, questions: action.payload, loading: false };
    case 'ADD_QUESTION': return { ...state, questions: [...state.questions, action.payload] };
    case 'UPDATE_QUESTION': return { ...state, questions: state.questions.map(q => q.id === action.payload.id ? { ...q, ...action.payload } : q) };
    case 'DELETE_QUESTION': return { ...state, questions: state.questions.filter(q => q.id !== action.payload) };
    case 'SET_FILTERS': return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
};

export const QuestionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!currentUser) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await getQuestions(currentUser.uid);
        dispatch({ type: 'SET_QUESTIONS', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    fetchQuestions();
  }, [currentUser]);

  const addQuestion = async (data) => {
    try {
      const newQ = await addQuestionService(currentUser.uid, data);
      dispatch({ type: 'ADD_QUESTION', payload: newQ });
      toast.success('Question added');
    } catch (e) { /* Service handles toast */ }
  };

  const updateQuestion = async (id, data) => {
    try {
      await updateQuestionService(id, data);
      dispatch({ type: 'UPDATE_QUESTION', payload: { id, ...data } });
    } catch (e) {}
  };

  const deleteQuestion = async (id) => {
    try {
      await deleteQuestionService(id);
      dispatch({ type: 'DELETE_QUESTION', payload: id });
      toast.success('Question deleted');
    } catch (e) {}
  };

  const setFilters = (newFilters) => dispatch({ type: 'SET_FILTERS', payload: newFilters });

  return (
    <QuestionContext.Provider value={{ ...state, addQuestion, updateQuestion, deleteQuestion, setFilters }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (!context) throw new Error('useQuestions must be used within a QuestionProvider');
  return context;
};