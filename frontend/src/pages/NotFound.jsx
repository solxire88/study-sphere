import React from 'react';
import { Button } from '@heroui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="heroui-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="heroui-heading text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="heroui-text text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
