import  { useState } from "react";
import { useSelector } from "react-redux";
import SongListPage from "./pages/SongListPage";
import SongFormPage from "./pages/SongFormPage";
import { RootState } from "./redux/store";
import { Song } from "./redux/songSlice";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  // possible pages: "login" | "songs" | "add" | "edit"
  const [currentPage, setCurrentPage] = useState<string>(
    currentUser ? "songs" : "login"
  );

  // holds song being edited
  const [editSong, setEditSong] = useState<Song | null>(null);

  // navigation handler shared across pages
  const handleNavigate = (page: string, song?: Song) => {
    if (song) setEditSong(song);
    else setEditSong(null);
    setCurrentPage(page);
  };

  // routing logic
  switch (currentPage) {
    case "login":
      return <LoginPage onNavigate={handleNavigate} />;
    case "songs":
      return <SongListPage onNavigate={handleNavigate} />;
    case "add":
      return <SongFormPage onNavigate={handleNavigate} />;
    case "edit":
      return <SongFormPage onNavigate={handleNavigate} editSong={editSong!} />;
    default:
      return <LoginPage onNavigate={handleNavigate} />;
  }
};

export default App;
