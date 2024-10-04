import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const authContext = useContext(AuthContext); // รับ AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ตรวจสอบว่า authContext ไม่ใช่ undefined
  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }

  const { setUser } = authContext; // ดึง setUser ออกจาก authContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      setUser(response.data.token); // ตั้งค่า token ที่ได้รับจากการเข้าสู่ระบบ
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
