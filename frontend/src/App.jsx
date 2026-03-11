import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { BusinessIdeas } from './pages/BusinessIdeas';
import { CreateIdea } from './pages/CreateIdea';
import { IdeaDetail } from './pages/IdeaDetail';
import { Learning } from './pages/Learning';
import { LessonDetail } from './pages/LessonDetail';
import { Chat } from './pages/Chat';
import { Categories } from './pages/Categories';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#0f172a',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ideas" element={<BusinessIdeas />} />
          <Route path="/ideas/new" element={<CreateIdea />} />
          <Route path="/ideas/:id" element={<IdeaDetail />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:slug" element={<LessonDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
