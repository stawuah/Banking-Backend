
# Banking-Backend

# My Banking App with Plaid API Integration

## Introduction

Welcome to My Banking App! This is a simple banking application that leverages the Plaid API for payment integration, account holding, checking account balance, and initiating payments. This README will guide you through the setup and usage of the application.

## Requirements

To run My Banking App, you need the following prerequisites:

1. Node.js (version 12 or later)
2. NPM (Node Package Manager)
3. Plaid API credentials (Client ID, Secret, and Public Key). You can obtain these from the Plaid developer dashboard (https://dashboard.plaid.com/).

## Installation

1. Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/my-banking-app.git
```

## Set up environment variables:

Create a new file named .env in the root of the project directory.
Add the following environment variables to the .env file:
```dotenv```

Copy code :

```PLAID_CLIENT_ID=your_plaid_client_id```
```PLAID_SECRET=your_plaid_secret```
```PLAID_PUBLIC_KEY=your_plaid_public_key```

2. Replace your_plaid_client_id, your_plaid_secret, and your_plaid_public_key with your actual Plaid API credentials.

## Usage

  * Once you have installed the application and set up the environment variables, you can now run My Banking App:

Start the application:

```npm start```
Access the app:

Open your web browser and navigate to ```http://localhost:3000```to access My Banking App.

### Acknowledgments

My Banking App was made possible by the excellent Plaid API. Special thanks to the Plaid team for their fantastic work.
