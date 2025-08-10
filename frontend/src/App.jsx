import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@/styles/index.css'
import Layout from '@/layout/Layout'
import Loader from '@/components/common/Loader'
import { Providers } from '@/Providers'

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/home/Home'))
const About = lazy(() => import('@/pages/about/About'))
const Blog = lazy(() => import('@/pages/blog/Blog'))
const BlogPost = lazy(() => import('@/pages/blog/_components/BlogPost'))
const Project = lazy(() => import('@/pages/project/Project'))
const CV = lazy(() => import('@/components/cv/CV'))

// others
import Contact from '@/pages/more/Contact';
import BucketList from '@/pages/more/BucketList';
import PrivacyPolicy from '@/layout/footer/pages/PrivacyPolicy';
import Terms from '@/layout/footer/pages/Terms';
import NotFound from '@/components/common/NotFound'

// Main App component
function App() {
  return (
      <Router>
        <Providers>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/post/:slug" element={<BlogPost />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/cv" element={<CV />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/bucketlist" element={<BucketList />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </Providers>
      </Router>
  )
}

export default App