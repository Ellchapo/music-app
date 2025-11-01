import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Song {
  id: string;
  title: string;
  singer: string;
  album: string;
  year: string;
  duration: string;
  genre: string;
  userId: string;
  addedDate: string;
}

export interface SongState {
  songs: Song[];
}

const initialState: SongState = {
  songs: JSON.parse(localStorage.getItem("musicSongs") || "[]"),
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSong: (state, action: PayloadAction<Omit<Song, "id" | "addedDate">>) => {
      const newSong: Song = {
        ...action.payload,
        id: Date.now().toString(),
        addedDate: new Date().toISOString(),
      };
      state.songs.push(newSong);
      localStorage.setItem("musicSongs", JSON.stringify(state.songs));
    },
    updateSong: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Song> }>
    ) => {
      const { id, data } = action.payload;
      state.songs = state.songs.map((s) => (s.id === id ? { ...s, ...data } : s));
      localStorage.setItem("musicSongs", JSON.stringify(state.songs));
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((s) => s.id !== action.payload);
      localStorage.setItem("musicSongs", JSON.stringify(state.songs));
    },
  },
});

export const { addSong, updateSong, deleteSong } = songSlice.actions;
export default songSlice.reducer;
