import React, { useState, useEffect, useContext } from 'react';
import { GraduationCap } from '@phosphor-icons/react';
import { AppContext } from '@/context/AppContext';

const Academic = () => {
  const { backendUrl } = useContext(AppContext);
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/academic/academics`);
        if (!res.ok) throw new Error('Failed to fetch education data');
        const data = await res.json();

        const formatted = data.map(item => ({
          institution: item.institution || '',
          degree: item.degree || '',
          period: item.startYear && item.endYear
            ? `${item.startYear} - ${item.endYear}`
            : item.startYear
            ? `${item.startYear} - Present`
            : '',
          location: item.location || '',
          grade: item.cgpa || '',
          details: item.notes && item.notes.length > 0 ? [item.notes] : [],
        }));

        setEducationData(formatted);
      } catch (err) {
        setError(err.message || 'Error loading education data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [backendUrl]);

  if (loading) return (
    <section className="py-14 text-center text-gray-600 dark:text-gray-400 font-medium">
      Loading education data...
    </section>
  );

  if (error) return (
    <section className="py-14 text-center text-red-600 dark:text-red-400 font-semibold">
      Error loading education data: {error}
    </section>
  );

  if (!educationData.length) return (
    <section className="py-14 text-center text-gray-600 dark:text-gray-400 font-medium">
      No education data found.
    </section>
  );

  return (
    <section className="py-14">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Title */}
        <div className="md:w-1/3 w-full">
          <h2 className="flex items-center gap-2 text-3xl font-medium">
            <GraduationCap size={32} /> Education
          </h2>
        </div>

        {/* Right Section: Cards */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="w-full shadow-xs border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-sm"
            >
              <div className="flex justify-between flex-wrap items-start mb-1">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <span className="text-base text-neutral-600 dark:text-neutral-400 italic">{edu.period}</span>
              </div>

              <p className="text-base text-neutral-700 dark:text-neutral-400 mb-1">
                {edu.institution} {edu.location ? `• ${edu.location}` : ''}
              </p>

              <p className="text-base mb-2 text-neutral-600 dark:text-neutral-400">
                {edu.grade}
              </p>

              <ul className="list-disc list-inside space-y-1 text-base text-neutral-700 dark:text-neutral-300">
                {edu.details.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Academic;
