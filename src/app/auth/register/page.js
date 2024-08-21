"use client";

import React, { useContext, useState } from 'react';
import { Form, Input, Button, Alert, Card, Typography, Row, Col } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

const RegisterPage = () => {
  const { handleRegister, error, loading } = useContext(AuthContext);
  const router = useRouter();
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = () => {
    handleRegister(name, username, email, password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card
        style={{ maxWidth: '600px', width: '100%', marginTop: '30px',padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        bordered={false}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>Register</Title>
        {error && <Alert message={error} type="error" showIcon />}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              {/* Name */}
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Username */}
              <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {/* Email */}
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Password */}
              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Paragraph style={{ textAlign: 'center' }}>
          Already have an account? <a onClick={() => router.push('/auth/login')}>Login</a>
        </Paragraph>
      </Card>
    </div>
  );
};

export default RegisterPage;
