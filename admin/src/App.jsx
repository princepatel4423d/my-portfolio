import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Providers from './Providers';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from '@/layout/Layout';
import Login from '@/auth/Login';
// import Signup from '@/auth/Signup';
import ResetPassword from '@/auth/ResetPassword';
// Dashboard
import Dashboard from '@/pages/Dashboard';

// Admin Pages
import BlogList from '@/pages/blog/BlogList';
import AddBlog from '@/pages/blog/AddBlog';
import EditBlog from '@/pages/blog/EditBlog';
import AddExperience from '@/pages/experience/AddExperience';
import ExperienceList from '@/pages/experience/ExperienceList';
import EditExperience from '@/pages/experience/EditExperience';
import AddAcademic from '@/pages/academic/AddAcademic';
import AcademicList from '@/pages/academic/AcademicList';
import EditAcademic from '@/pages/academic/EditAcademic';
import ProjectList from '@/pages/projects/ProjectList';
import AddProject from '@/pages/projects/AddProject';
import EditProject from '@/pages/projects/EditProject';

function App() {
  return (
    <Router>
      <Providers>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Protected routes inside layout */}
          <Route path="/" element={<Layout />}>
            {/* Wrap each in <ProtectedRoute> */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="blogs"
              element={
                <ProtectedRoute>
                  <BlogList />
                </ProtectedRoute>
              }
            />
            <Route
              path="blogs/add"
              element={
                <ProtectedRoute>
                  <AddBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="blogs/edit/:slug"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="experiences/add"
              element={
                <ProtectedRoute>
                  <AddExperience />
                </ProtectedRoute>
              }
            />
            <Route
              path="experiences"
              element={
                <ProtectedRoute>
                  <ExperienceList />
                </ProtectedRoute>
              }
            />
            <Route
              path="experiences/edit/:id"
              element={
                <ProtectedRoute>
                  <EditExperience />
                </ProtectedRoute>
              }
            />
            <Route
              path="academics"
              element={
                <ProtectedRoute>
                  <AcademicList />
                </ProtectedRoute>
              }
            />
            <Route
              path="academics/add"
              element={
                <ProtectedRoute>
                  <AddAcademic />
                </ProtectedRoute>
              }
            />
            <Route
              path="academics/edit/:id"
              element={
                <ProtectedRoute>
                  <EditAcademic />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects"
              element={
                <ProtectedRoute>
                  <ProjectList />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects/add"
              element={
                <ProtectedRoute>
                  <AddProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProject />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Providers>
    </Router>
  );
}

export default App;