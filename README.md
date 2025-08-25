# Decentralized Voting System

## Overview
This project is a **Decentralized Voting System** built as a major project to provide a secure, transparent, and tamper-proof voting mechanism using blockchain technology. The system leverages Ethereum smart contracts to ensure immutability and trust in the voting process, integrated with a full-stack application for a seamless user experience.

## Features
- **Secure Voting**: Votes are stored on the Ethereum blockchain, ensuring transparency and immutability.
- **User Authentication**: Integration with MetaMask for secure wallet-based authentication.
- **Decentralized Architecture**: Eliminates centralized control, reducing the risk of manipulation.
- **Real-Time Results**: Transparent vote counting with real-time updates.
- **User-Friendly Interface**: A full-stack web application for easy interaction with the blockchain.

## Tech Stack
- **Frontend**: 
  - React.js (for dynamic and responsive UI)
  - Web3.js (for Ethereum blockchain interaction)
  - MetaMask (for wallet integration and transaction signing)
- **Backend**: 
  - Node.js with Express.js (for API development)
  - MongoDB (for off-chain data storage, if applicable)
- **Blockchain**:
  - Ethereum (decentralized platform)
  - Solidity (for writing smart contracts)
  - Hardhat/Truffle (for smart contract development, testing, and deployment)
- **Tools & Libraries**:
  - Ethers.js (for interacting with Ethereum blockchain)
  - IPFS (optional, for decentralized storage of election metadata)
  - Ganache (for local blockchain testing)

## Prerequisites
To run this project locally, ensure you have the following installed:
- Node.js (v16 or higher)
- MetaMask browser extension
- Ethereum client (e.g., Ganache for local testing)
- Hardhat or Truffle for smart contract development
- MongoDB (if used for off-chain data)
- An Ethereum wallet with testnet ETH (e.g., Ropsten, Rinkeby, or Sepolia)

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/decentralized-voting-system.git
   cd decentralized-voting-system
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd ../backend
   npm install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` directory with the following:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   INFURA_URL=your_infura_project_url
   PRIVATE_KEY=your_wallet_private_key
   ```

5. **Compile and Deploy Smart Contracts**:
   ```bash
   cd ../contracts
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network <network_name>
   ```
   Update the frontend with the deployed contract address.

6. **Run the Application**:
   - Start the backend:
     ```bash
     cd ../backend
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ../frontend
     npm start
     ```

7. **Connect MetaMask**:
   - Open the application in your browser (e.g., `http://localhost:3000`).
   - Connect MetaMask to the same network used for deployment (e.g., Sepolia or localhost).

## Usage
1. **Register as a Voter**: Use the frontend interface to register with your MetaMask wallet.
2. **Create an Election**: Admins can create elections via the admin panel, specifying candidates and duration.
3. **Cast a Vote**: Authenticated users can vote for their preferred candidate using MetaMask to sign the transaction.
4. **View Results**: Real-time results are displayed on the frontend, fetched from the blockchain.

## Smart Contract Details
- **Voting.sol**: The main smart contract handles voter registration, vote casting, and result tallying.
- Key functions:
  - `registerVoter(address voter)`: Registers a voter.
  - `createElection(string memory name, string[] memory candidates)`: Creates a new election.
  - `vote(uint electionId, uint candidateId)`: Casts a vote.
  - `getResults(uint electionId)`: Retrieves election results.

## Project Structure
```
decentralized-voting-system/
├── frontend/               # React.js frontend
├── backend/                # Node.js/Express backend
├── contracts/              # Solidity smart contracts
├── scripts/                # Deployment scripts
├── test/                   # Smart contract tests
└── README.md               # Project documentation
```

## Testing
- **Smart Contract Tests**:
  ```bash
  cd contracts
  npx hardhat test
  ```
- **Frontend/Backend Tests**:
  Use Jest or Mocha (if implemented) to run unit tests:
  ```bash
  cd frontend
  npm test
  cd ../backend
  npm test
  ```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or issues, please open an issue on GitHub or contact the project maintainers.