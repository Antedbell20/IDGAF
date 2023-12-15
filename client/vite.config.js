import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    port: process.env.PORT || 3009,
  },
};
