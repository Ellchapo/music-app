import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { deleteSong } from "../redux/songSlice";
import { logout } from "../redux/userSlice";

interface SongListPageProps {
  onNavigate: (page: string, song?: any) => void;
}

const SongListPage: React.FC<SongListPageProps> = ({ onNavigate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs } = useSelector((state: RootState) => state.songs);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [userSongs, setUserSongs] = useState<typeof songs>([]);

  useEffect(() => {
    if (currentUser) {
      setUserSongs(songs.filter((s) => s.userId === currentUser.id));
    }
  }, [songs, currentUser]);

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this song?")) dispatch(deleteSong(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white/95 p-6 rounded-2xl shadow-2xl border-2 border-yellow-500 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {currentUser?.name}! 🎵</h1>
          <button
            onClick={() => {
              dispatch(logout());
              onNavigate("login");
            }}
            className="!bg-red-600 !border-none text-white px-6 py-2 rounded-lg font-semibold hover:!bg-red-700 transition-colors"
          >
            Logout
          </button>
        </header>

        <button
          onClick={() => onNavigate("add")}
          className="!bg-yellow-600 text-white !border-none px-6 py-3 rounded-lg font-semibold hover:!bg-yellow-700 transition-colors mb-6 shadow-lg"
        >
          + Add New Song
        </button>

        {userSongs.length === 0 ? (
          <div className="bg-white/95 p-12 rounded-2xl shadow-2xl border-2 border-yellow-500 text-center">
            <p className="text-gray-600 text-lg">No songs yet. Add your first song to get started!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userSongs.map((song) => (
              <div key={song.id} className="bg-white/95 p-6 rounded-2xl shadow-2xl border-2 border-yellow-500 hover:shadow-xl transition-shadow">
                <h2 className="font-bold text-xl text-gray-800 mb-2">{song.title}</h2>
                <p className="text-gray-600 mb-1">🎤 {song.singer}</p>
                <p className="text-gray-600 mb-1">💿 {song.album}</p>
                <p className="text-gray-600 mb-1">📅 {song.year}</p>
                <p className="text-gray-600 mb-1">⏱️ {song.duration}</p>
                <p className="text-gray-600 mb-4">🎸 {song.genre}</p>
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => onNavigate("edit", song)}
                    className="!bg-blue-500 hover:!bg-blue-600 !border-none text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(song.id)}
                    className="!bg-red-500 hover:!bg-red-600 !border-none text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongListPage;