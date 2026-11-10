
# Menggunakan PHP 8.4 CLI
FROM php:8.4-cli

# Menginstal dependency sistem
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && rm -rf /var/lib/apt/lists/*

# Menginstal ekstensi PHP untuk MySQL dan ZIP
RUN docker-php-ext-install pdo_mysql zip

# Mengambil Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Menentukan folder kerja Laravel
WORKDIR /var/www/html

# Membuka port Laravel
EXPOSE 8000

# Menginstal dependency dan menjalankan Laravel
CMD ["sh", "-c", "composer install --no-interaction && php artisan serve --host=0.0.0.0 --port=8000"]
