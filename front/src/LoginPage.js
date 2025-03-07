import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import myImage from './image/image1.jpg';
import logo from './image/yonko.png';
import christmasTree from './image/cha.png'; // Christmas tree image
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './App.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', form: '' });
  const [showChristmasTree, setShowChristmasTree] = useState(false);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    if (currentMonth === 11 && currentDate >= 24 && currentDate <= 31) {
      setShowChristmasTree(true);
    }
  }, []);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { username: '', password: '', form: '' };

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateInputs()) {
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5001/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role);
  
        if (response.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setErrors({ ...errors, form: 'Invalid username or password.' });
    }
  };
  

  return (
    <div className="d-flex min-vh-100">
      <div className="flex-grow-1" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <img src={myImage} alt="Background" style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      </div>

      <div className="d-flex justify-content-center align-items-center" style={{ flex: '0 0 40%', paddingLeft: '30px' }}>
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ width: '150px' }} />
            {showChristmasTree && (
              <div className="mt-3">
                <img src={christmasTree} alt="Christmas Tree" style={{ width: '40px', height: '60px', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          <form className="border p-4 rounded" style={{ width: '100%', boxShadow: '0 8px 8px 8px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit}>
            <h5>Login</h5>

            {errors.form && <div className="alert alert-danger text-center">{errors.form}</div>}

            <div className="mb-3">
              <input type="text" id="username" name="username" className={`form-control ${errors.username && 'is-invalid'}`} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            <div className="mb-3 position-relative">
              <div className="input-group">
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" className={`form-control ${errors.password && 'is-invalid'}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button type="submit" className="btn-orange w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
