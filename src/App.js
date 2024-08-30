import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

//pages
import Dashboard from './pages/Dashboard';
import DashboardStudent from './pages/DashboardStudent';
import Layout from './pages/Layout';
import About from './pages/About';
import Profile from './pages/Profile';
import Examination from './pages/Examination';
import Settings from './pages/Settings';

import PageNotFound from './pages/PageNotFound';
import Students from './pages/Students';
import LayoutGuest from './pages/LayoutGuest';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';

//store
import store from './redux/store';

//references
import { AuthProvider, useAuth } from './contextapi/AuthContext';
import { UthilsProvider } from './contextapi/UtilsAuth';
import { StudentsProvider } from './contextapi/studentsContext';
import { Provider } from 'react-redux';
import { Home } from './pages/Home';
import { useState } from 'react';
import LayoutStudent from './pages/LayoutStudent';

function App() {
  let loggedIn = localStorage.getItem('userRole');

  const Redirect = () => {
    // localStorage.setItem('userRole', '');
    return <Navigate to="/" />
  }
  const renderRoute = (role) => {
    if (loggedIn === 'admin') {
      //localStorage.setItem('userRole', 'admin');
      return <Dashboard />
    }else if(loggedIn === 'student'){
      //localStorage.setItem('userRole', 'student');
      return <DashboardStudent />
    }else if(loggedIn.length === 0){
      return <Navigate to="/"/>
    }

  }

  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <UthilsProvider>
            <StudentsProvider>
              <Routes>
                <Route path="/" element={<LayoutGuest />}>
                  <Route path="/" element={<Home />} />
                  <Route path='about' element={<About />}></Route>
                </Route>
                <Route path="/student" element={<LayoutStudent />}>
                  <Route path='dashboard' element={<DashboardStudent/>}></Route>
                  <Route path='exams' element={<Examination />}></Route>
                </Route>
                <Route path="/admin" element={<Layout />}>
                  <Route path='dashboard' element={<Dashboard/>}></Route>
                  <Route path='exams' element={<Examination />}></Route>
                  <Route path="students" element={<Students />}>
                    <Route path="add" element={<AddStudent />} />
                    <Route path='update/:id' element={<UpdateStudent />} />
                  </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </StudentsProvider>
          </UthilsProvider>
        </AuthProvider>
      </Provider>
    </div>
  );
}

function AdminUser({ children }) {
  const { userRole } = useAuth();
  if (userRole === 'admin') {
    return <>{children}</>
  } else {
    return <NotAdmin />
  }
}

function NotAdmin() {
  const navigate = useNavigate();
  const redirect = () => {
    setTimeout(() => {
      navigate('/dashboard')
    }, 5000)
  }
  return (
    <>
      <p>You don't have access to this page</p>
      {redirect()}
    </>
  )
}
export default App;

