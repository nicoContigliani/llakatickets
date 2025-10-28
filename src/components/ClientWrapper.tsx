'use client';

import { useEffect, useState } from 'react';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000000',
        color: 'white'
      }}>
        <div>Cargando...</div>
      </div>
    );
  }

  return <>{children}</>;
}