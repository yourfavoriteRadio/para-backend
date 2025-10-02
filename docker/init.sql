-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    quantity INT NOT NULL DEFAULT 1,
    price NUMERIC(10,2) NOT NULL
);

-- Seed with some data
INSERT INTO users (name, email) VALUES
('Alice Example', 'alice@example.com'),
('Bob Example', 'bob@example.com');

INSERT INTO products (name, description, price) VALUES
('Laptop', '15 inch laptop with 16GB RAM', 1200.00),
('Phone', 'Smartphone with OLED display', 800.00),
('Headphones', 'Noise cancelling headphones', 200.00);

INSERT INTO orders (user_id, total) VALUES
(1, 2000.00),
(2, 800.00);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 1200.00),
(1, 3, 4, 200.00),
(2, 2, 1, 800.00);
