"use client";

import React, { useContext, useState } from 'react';
import { Form, Input, Button, Alert, Card, Typography } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title } = Typography;

const LoginPage = () => {
  const { handleLogin, error, loading } = useContext(AuthContext);
  const router = useRouter();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = () => {
    handleLogin(email, password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card
        style={{ maxWidth: '400px', width: '100%', marginTop: '30px', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        bordered={false}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <p style={{ textAlign: 'center' }}>
          Don't have an account? <Link className='text-blue-700 hover:text-blue-900 hover:underline' href='/auth/register'>Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
