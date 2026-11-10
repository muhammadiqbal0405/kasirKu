# Menggunakan Node.js versi 22
FROM node:22-alpine

# Menentukan direktori kerja
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependency di dalam Docker
RUN npm install

# Menyalin seluruh source code React
COPY . .

# Membuka port Vite
EXPOSE 5173

# Menjalankan React
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]