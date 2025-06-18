import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './Auth/AuthContext';

import FrontPage from './FrontPage/FrontPage';
import Project from './Project/Project';
import Education from './Education/Education';
import Skill from './Skill/Skill';
import Certificate from './Certificate/Certificate';
import Contact from './Contact/Contact';
import Login from './Auth/Login';
import AdminCertificate from './Admin/AdminCertificate';
import AdminFrontPage from './Admin/AdminFrontPage';
import AdminSkill from './Admin/AdminSkill';
import AdminProject from './Admin/AdminProject';
import AdminEducation from './Admin/AdminEducation';

function AnimatedRouteWrapper() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route
            path="/"
            element={
                <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                >
                <FrontPage />
                </motion.div>
            }
            />
            <Route
            path="/project"
            element={
                <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 1, ease: "anticipate" }}
                >
                <Project />
                </motion.div>
            }
            />
            <Route
            path="/about"
            element={
                <motion.div
                initial={{ y: '-100vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100vh', opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                >
                <Education />
                <Skill />
                <Certificate />
                </motion.div>
            }
            />
            <Route
            path="/contact"
            element={
                <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 1 }}
                >
                <Contact />
                </motion.div>
            }
            />
            <Route path='/login' 
            element={
                <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 1 }}
                >
                <Login/>
                </motion.div>}
            />
            <Route path='/dashboard' element={isAuthenticated ? (<AdminCertificate />) : (<Navigate to={"/login"} />)}/>
            <Route path='/admin/certificate' element={isAuthenticated ? (<AdminCertificate />) : (<Navigate to={"/dashboard"} />)}/>
            <Route path='/admin/page' element={isAuthenticated ? (<AdminFrontPage />) : (<Navigate to={"/dashboard"} />)}/>
            <Route path='/admin/skill' element={isAuthenticated ? (<AdminSkill />) : (<Navigate to={"/dashboard"} />)}/>
            <Route path='/admin/project' element={isAuthenticated ? (<AdminProject />) : (<Navigate to={"/dashboard"} />)}/>
            <Route path='/admin/education' element={isAuthenticated ? (<AdminEducation />) : (<Navigate to={"/dashboard"} />)}/>
            <Route path='/logout' element={isAuthenticated ? (<Navigate to={"/dashboard"} />) : (<Navigate to={"/login"} />)}/>
            
          
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRouteWrapper;
