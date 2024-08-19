"use client";

import React, { useContext, useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { handleRegister, error, loading } = useContext(AuthContext);
  const router = useRouter();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = () => {
    handleRegister(email, password);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Register</h2>
      {error && <Alert message={error} type="error" showIcon />}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already have an account? <a onClick={() => router.push('/auth/login')}>Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;
