import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, updateSong, Song } from "../redux/songSlice";
import { RootState, AppDispatch } from "../redux/store";

interface SongFormPageProps {
  onNavigate: (page: string) => void;
  editSong?: Song;
}

const SongFormPage: React.FC<SongFormPageProps> = ({ onNavigate, editSong }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<Omit<Song, "id" | "addedDate" | "userId">>({
    title: editSong?.title || "",
    singer: editSong?.singer || "",
    album: editSong?.album || "",
    year: editSong?.year || "",
    duration: editSong?.duration || "",
    genre: editSong?.genre || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editSong) {
      dispatch(updateSong({ id: editSong.id, data: formData }));
      alert("Song updated!");
    } else if (currentUser) {
      dispatch(addSong({ ...formData, userId: currentUser.id }));
      alert("Song added!");
    }
    onNavigate("songs");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white/95 p-8 rounded-2xl backdrop-blur-lg shadow-2xl w-full max-w-2xl border-2 border-yellow-500">
        <h1 className="text-gray-800 text-3xl font-bold mb-6 text-center">
          {editSong ? "Edit Song" : "Add New Song"}
        </h1>
        
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 capitalize">
              {key === "duration" ? "Duration (mm:ss)" : key}
            </label>
            <input
              type="text"
              placeholder={`Enter ${key}`}
              value={value}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
        ))}
        
        <div className="flex gap-4 mt-6">
          <button 
            type="submit" 
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex-1"
          >
            {editSong ? "Update Song" : "Add Song"}
          </button>
          
          <button 
            type="button"
            onClick={() => onNavigate("songs")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongFormPage;