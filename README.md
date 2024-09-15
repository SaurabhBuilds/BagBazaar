# BagBazaar

**BagBazaar** is a comprehensive e-commerce web application designed for the buying and selling of bags. It provides a robust platform where sellers can manage their products and users can browse, select, and purchase items. The application uses JWT (JSON Web Token) for secure user authentication, ensuring that only authorized users can access and utilize the web app.

## Features

- **User Authentication**: Users can register and log in to receive a JWT token, which is required for accessing the web app.
- **Product Management**: Sellers can create, update, and manage product listings.
- **Product Browsing**: Users can browse a diverse range of products and view detailed information about each item.
- **Shopping Cart**: Users can add products to their shopping cart and proceed to checkout.
- **Secure Access**: Only authenticated users with a valid JWT token can interact with the application.

## Tech Stack

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript (EJS)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Tailwind CSS with custom embedded styles

## Installation

To get started with BagBazaar, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/bagbazaar.git
   ```

2. **Install Dependencies**:

   Navigate to the project directory and install the required npm packages:

   ```bash
   cd bagbazaar
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and include the following environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Application**:

   Launch the application using:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

- **For Users**:
  - Register and log in to receive a JWT token.
  - Browse and search for bags.
  - Add items to your cart and proceed to checkout.

- **For Sellers**:
  - Log in to manage your products.
  - Add new products, update existing ones, or remove them as needed.

## Folder Structure

The project directory is organized as follows:

```
bagbazaar/
├── models/            # Contains MongoDB schemas and models (e.g., User, Product)
├── routes/            # Express route handlers for different functionalities (e.g., Authentication, Product Management)
├── views/             # EJS templates for rendering frontend pages
├── public/            # Static assets (CSS, JavaScript files, images)
├── config/            # Configuration files (e.g., Database connection settings)
└── server.js          # Main server entry point
```

## Future Enhancements

- Integration of a payment gateway to facilitate transactions.
- Implementation of a product review and rating system.
- Development of an advanced analytics dashboard for sellers.

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.
