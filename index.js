// Punto de entrada principal para Hostinger Node.js
try {
  require('./server/index.js');
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

