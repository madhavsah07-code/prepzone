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
      const docRef = await addDoc(
        collection(db, `users/${currentUser.uid}/goals`),
        { ...newGoal, completed: false }
      );

      // 🔥 instantly update UI with real ID
      setGoals(prev => [
        { id: docRef.id, ...newGoal, completed: false },
        ...prev
      ]);

      setNewGoal({ text: '', targetCount: 10, topic: TOPICS[0], deadline: '' });
      toast.success('Goal created successfully');

    } catch (e) {
      toast.error('Failed to create goal');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      // Using the safer, explicit path segment format for Firebase v9
      const goalRef = doc(db, 'users', currentUser.uid, 'goals', id);
      await updateDoc(goalRef, { completed: !currentStatus });
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error('Failed to update goal');
    }
  };

  const handleDelete = async (id) => {
    try {
      // Using the safer, explicit path segment format
      const goalRef = doc(db, 'users', currentUser.uid, 'goals', id);
      await deleteDoc(goalRef);
      toast.success('Goal removed');
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error('Failed to delete goal');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 px-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Weekly Objectives</h1>

      <form onSubmit={handleAdd} className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-lg flex flex-wrap gap-5 items-end hover:shadow-xl transition">
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-600 mb-1">Goal Description</label>
          <input required type="text" value={newGoal.text} onChange={e => setNewGoal({ ...newGoal, text: e.target.value })} className="w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Solve 10 Array Mediums" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Focus Topic</label>
          <select value={newGoal.topic} onChange={e => setNewGoal({ ...newGoal, topic: e.target.value })} className="w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Target Date</label>
          <input required type="date" value={newGoal.deadline} onChange={e => setNewGoal({ ...newGoal, deadline: e.target.value })} className="w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <Button type="submit" className="py-2.5">Add Goal</Button>
      </form>

      <div className="space-y-5">
        {goals.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">No active goals. Set one above to stay focused!</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className={`group relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 backdrop-blur-lg ${goal.completed ? 'bg-green-100/70 border-green-200 opacity-80' : 'bg-white/80 border-white/40 shadow-md hover:shadow-2xl hover:-translate-y-1'}`}>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative z-10 flex items-center space-x-5">
                <input type="checkbox" checked={goal.completed} onChange={() => toggleComplete(goal.id, goal.completed)} className="h-6 w-6 text-blue-600 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer" />
                <div>
                  <h3 className={`text-lg font-semibold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{goal.text}</h3>
                  <div className="flex gap-3 mt-1 text-sm font-medium">
                    <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-lg shadow-sm">Topic: {goal.topic}</span>
                    <span className="text-gray-600">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
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