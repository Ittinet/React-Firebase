import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-Firebase/",
  server: {
    watch: {
      usePolling: true, // เปิดการใช้ polling สำหรับการตรวจสอบไฟล์
    },
  },
})
