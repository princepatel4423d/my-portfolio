import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, GraduationCap, FolderOpen } from '@phosphor-icons/react';

const dashboardLinks = [
  {
    title: 'Blog',
    icon: <FileText size={28} />,
    path: '/blogs',
    description: 'Manage all blog posts, add new, and edit existing posts.',
  },
  {
    title: 'Experience',
    icon: <Briefcase size={28} />,
    path: '/experiences',
    description: 'Add and edit your professional experiences.',
  },
  {
    title: 'Academic',
    icon: <GraduationCap size={28} />,
    path: '/academics',
    description: 'Showcase academic background and achievements.',
  },
  {
    title: 'Project',
    icon: <FolderOpen size={28} />,
    path: '/projects',
    description: 'Manage all your portfolio projects.',
  },
];

const Dashboard = () => {
  return (
    <section className='min-h-screen'>
      <h1 className="text-3xl text-center font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardLinks.map((link) => (
          <Link
            key={link.title}
            to={link.path}
            className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-200 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              {link.icon}
              <h2 className="text-xl font-semibold">{link.title}</h2>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;