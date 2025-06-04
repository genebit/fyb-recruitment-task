FROM php:8.1-cli

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip libaio1 libaio-dev build-essential libsodium-dev libpng-dev libjpeg-dev libzip-dev libfreetype6-dev supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js and NPM using NVM version manager
ENV NODE_VERSION=22.10.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy Laravel app files
COPY --chown=www-data:www-data . .

# Run composer install
RUN composer install --no-interaction --optimize-autoloader

# Install node modules
RUN npm install

COPY .env.example .env

# Setup Database (SQLite)
RUN mkdir -p database \
    && touch database/database.sqlite

# Install frontend dependencies and build assets
RUN npm run build

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Start PHP built-in server
CMD ["bash", "-c", "php artisan key:generate --force && php artisan jwt:secret --force && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"]
