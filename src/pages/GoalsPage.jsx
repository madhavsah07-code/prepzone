import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Button from '../components/ui/Button';
import { TOPICS } from '../constants/topics';
import toast from 'react-hot-toast';

export const GoalsPage = () => {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ text: '', targetCount: 10, topic: TOPICS[0], deadline: '' });

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, `users/${currentUser.uid}/goals`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGoals(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, [currentUser]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `users/${currentUser.uid}/goals`), { ...newGoal, completed: false });
      setNewGoal({ text: '', targetCount: 10, topic: TOPICS[0], deadline: '' });
      toast.success('Goal created successfully');
    } catch (e) { 
      toast.error('Failed to create goal'); 
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/goals`, id), { completed: !currentStatus });
  };

  const handleDelete = async (id) => {
     await deleteDoc(doc(db, `users/${currentUser.uid}/goals`, id));
     toast.success('Goal removed');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Weekly Objectives</h1>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-5 items-end">
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Description</label>
          <input required type="text" value={newGoal.text} onChange={e => setNewGoal({...newGoal, text: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. Solve 10 Array Mediums" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Focus Topic</label>
          <select value={newGoal.topic} onChange={e => setNewGoal({...newGoal, topic: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
            {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
          <input required type="date" value={newGoal.deadline} onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <Button type="submit" className="py-2.5">Add Goal</Button>
      </form>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No active goals. Set one above to stay focused!</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className={`flex items-center justify-between p-5 rounded-xl border transition-colors ${goal.completed ? 'bg-green-50 border-green-200 opacity-75' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="flex items-center space-x-5">
                <input type="checkbox" checked={goal.completed} onChange={() => toggleComplete(goal.id, goal.completed)} className="h-6 w-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                <div>
                  <h3 className={`text-lg font-bold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{goal.text}</h3>
                  <div className="flex gap-3 mt-1 text-sm font-medium">
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Topic: {goal.topic}</span>
                    <span className="text-gray-500">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDelete(goal.id)}>Delete</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalsPage;