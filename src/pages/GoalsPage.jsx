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
  const [newGoal, setNewGoal] = useState({
    text: '',
    targetCount: 10,
    topic: TOPICS[0],
    deadline: ''
  });

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

      setGoals(prev => [
        { id: docRef.id, ...newGoal, completed: false },
        ...prev
      ]);

      setNewGoal({ text: '', targetCount: 10, topic: TOPICS[0], deadline: '' });
      toast.success('Goal created successfully');

    } catch {
      toast.error('Failed to create goal');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const goalRef = doc(db, 'users', currentUser.uid, 'goals', id);
      await updateDoc(goalRef, { completed: !currentStatus });
    } catch {
      toast.error('Failed to update goal');
    }
  };

  const handleDelete = async (id) => {
    try {
      const goalRef = doc(db, 'users', currentUser.uid, 'goals', id);
      await deleteDoc(goalRef);
      toast.success('Goal removed');
    } catch {
      toast.error('Failed to delete goal');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 px-6">

      {/*  Title */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
        Weekly Objectives
      </h1>

      {/*  FORM */}
      <form
        onSubmit={handleAdd}
        className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg flex flex-wrap gap-5 items-end"
      >

        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm text-gray-400 mb-1">Goal Description</label>
          <input
            required
            type="text"
            value={newGoal.text}
            onChange={e => setNewGoal({ ...newGoal, text: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="e.g. Solve 10 Array Mediums"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Focus Topic</label>
          <select
            value={newGoal.topic}
            onChange={e => setNewGoal({ ...newGoal, topic: e.target.value })}
            className="bg-black/40 border border-white/10 text-gray-300 rounded-xl py-2 px-3 focus:ring-orange-500 outline-none"
          >
            {TOPICS.map(t => (
              <option key={t} value={t} className="bg-black text-white">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Target Date</label>
          <input
            required
            type="date"
            value={newGoal.deadline}
            onChange={e => setNewGoal({ ...newGoal, deadline: e.target.value })}
            className="bg-black/40 border border-white/10 text-gray-300 rounded-xl px-3 py-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <Button type="submit">Add Goal</Button>

      </form>

      {/*  GOALS LIST */}
      <div className="space-y-5">

        {goals.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No active goals. Set one above to stay focused!
          </p>
        ) : (
          goals.map(goal => (

            <div
              key={goal.id}
              className={`group relative flex items-center justify-between p-6 rounded-2xl border backdrop-blur-xl transition-all
              ${goal.completed
                ? 'bg-green-500/10 border-green-500/20 opacity-80'
                : 'bg-black/40 border-white/10 hover:shadow-orange-500/20 hover:-translate-y-1'
              }`}
            >

              {/*  Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

              <div className="relative z-10 flex items-center space-x-5">

                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleComplete(goal.id, goal.completed)}
                  className="h-6 w-6 accent-orange-500 cursor-pointer"
                />

                <div>
                  <h3 className={`text-lg font-semibold ${goal.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {goal.text}
                  </h3>

                  <div className="flex gap-3 mt-1 text-sm">
                    <span className="text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg">
                      {goal.topic}
                    </span>

                    <span className="text-gray-400">
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

              </div>

              <Button variant="danger" size="sm" onClick={() => handleDelete(goal.id)}>
                Delete
              </Button>

            </div>

          ))
        )}

      </div>
    </div>
  );
};

export default GoalsPage;