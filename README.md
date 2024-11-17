# URL Shortie

URL Shortie is a URL shortening web-app built with Next.js and MongoDB. Users can shorten URLs, track usage, and manage them via a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- Shorten long URLs
- Track the number of clicks on each shortened URL
- View and manage your list of shortened URLs


## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
make sure you have installed these before you start:
- Node.js
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/h3li0p4us3-moharami/urlshortie.git
   cd urlshortie
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your MongoDB connection string:

   ```plaintext
   MONGODB_URI=mongodb_connection_uri
   ```

   Replace `mongodb_connection_uri` with your actual MongoDB connection string.

### Running the Project

1. **Start the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

2. **Open your browser:**

   Visit `http://localhost:3000` to see the application in action.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **MongoDB**: A NoSQL database for storing URL data.
- **React**: A JavaScript library for building user interfaces.

## Customization

To make this project your own, you can:

- Customize the UI by editing the page.tsx file in the `app/` directory.
- Modify the API routes in the `app/api` directory to add more features or change existing ones.
- Update the styles in the `styles` directory to match your branding.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.