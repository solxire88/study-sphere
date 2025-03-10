import React from 'react';
import { Button } from '@heroui/button';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="heroui-container text-secondary flex flex-col items-center justify-center min-h-screen">
      <h1 className="heroui-heading text-4xl font-bold mb-4">403 - Not Authorized</h1>
      <p className="heroui-text text-lg mb-6">
        You do not have permission to access this page.
      </p>
      <Button variant="bordered" className='text-secondary' onPress={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
};

export default NotAuthorized;
