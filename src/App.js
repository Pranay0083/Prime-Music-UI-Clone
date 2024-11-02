import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/authContext';
import { MusicProvider, useMusicPlayer } from './contexts/musicContext';
import ProtectedRoute from './components/features/ProtectedRoute';

const MusicPlayer = lazy(() => import('./components/layout/MusicPlayer'));
const Loading = lazy(() => import('./components/common/LoadingState'));
const LoggedInHome = lazy(() => import('./pages/Home/LoggedInHome'));
const LoggedOutHome = lazy(() => import('./pages/Home/LoggedOutHome'));
const Music = lazy(() => import('./pages/Music/Music'));
const AlbumDetails = lazy(() => import('./pages/Album/AlbumSingle'));
const Favourite = lazy(() => import('./pages/Favourites/Favourites'));
const ArtistDetails = lazy(() => import('./pages/Artist/Artist'));
const Search = lazy(() => import('./pages/Search/SearchView'));
const SearchResults = lazy(() => import('./pages/Search/SearchResults'));
const Mood = lazy(() => import('./pages/Mood/MoodSongs'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Playlist = lazy(() => import('./pages/Playlist/Playlist'));
const Subscription = lazy(() => import('./pages/Subscription/Subscription'));
const NotFound = lazy(() => import('./pages/Error/Notfound'));
const Signup = lazy(() => import('./pages/SignUp/Signup'));
const Signin = lazy(() => import('./pages/SignUp/Signin'));
const Header = lazy(() => import('./components/layout/Header/Header'));
const Footer = lazy(() => import('./components/layout/Footer'));

function Layout() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const { currentTrack, currentTrackInfo } = useMusicPlayer();

  const showHeader = ['/', '/music', '/album', '/favourite', '/search', '/mood', '/profile', '/playlist', '/artist']
    .includes(location.pathname)
    || location.pathname.startsWith('/album/')
    || location.pathname.startsWith('/artist/')
    || location.pathname.startsWith('/search/')
    || location.pathname.startsWith('/mood/')
    || location.pathname.startsWith('/playlist/');

  const showFooter = ['/signup', '/signin', '/subscription'].includes(location.pathname);

  const showMusicPlayer = isAuthenticated && currentTrack && !showFooter;

  return (
    <div className={`min-h-screen ${showMusicPlayer ? 'pb-24' : ''}`}>
      {showHeader && <Header />}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <LoggedInHome /> : <LoggedOutHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/music" element={<Music />} />
            <Route path="/album/:id" element={<AlbumDetails />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/artist/:id" element={<ArtistDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/results" element={<SearchResults />} />
            <Route path="/mood/:type" element={<Mood />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/playlist/:id" element={<Playlist />} />
          </Route>
          <Route path="/subscription" element={<Subscription />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {showFooter && <Footer />}
      {showMusicPlayer && (
        <Suspense fallback={null}>
          <MusicPlayer
            currentTrack={currentTrack}
            trackTitle={currentTrackInfo.title}
            artist={currentTrackInfo.artist}
            onPlayNext={currentTrackInfo.onPlayNext}
            onPlayPrevious={currentTrackInfo.onPlayPrevious}
          />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Layout />
          </Suspense>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;