<div align="center">
    <img src="https://files.catbox.moe/84rr7h.png">
</div>

<div align="center">
  Agentic DAO Voting System
</div><br>

![Static Badge](https://img.shields.io/badge/Powered%20By-Gaia-white?style=for-the-badge&labelColor=gray&color=black)
![Static Badge](https://img.shields.io/badge/Tooling%20By-CDP%20Agent%20Kit-white?style=for-the-badge&labelColor=gray&color=blue)
![Static Badge](https://img.shields.io/badge/Wallet%20By-Privy-black?style=for-the-badge&color=%239093d3)
![Made-With-ETHERS](https://img.shields.io/badge/MADE%20WITH-Ethers-000000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=ethereum)
![Made-With-Javascript](https://img.shields.io/badge/MADE%20WITH-Javascript-ffd000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=javascript)
![Made-With-NodeJS](https://img.shields.io/badge/MADE%20WITH-NodeJS-32a852.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=nodejs)
![Made-With-Express](https://img.shields.io/badge/MADE%20WITH-Express-000000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=express)
![Static Badge](https://img.shields.io/badge/Built%20With-pnpm-ffd000?style=for-the-badge&logo=pnpm&logoColor=%23F69220&color=%23F69220)

> Minerva is an Agentic DAO voting system to automatically cast votes in DAO governance proposals based on an user's character profile.


# 🚀 Getting Started

## Prerequisites:

```bash
node >= 22 🟢
pnpm >= 9.14.1 📦
```

## 🤖 Gaianet node
First we need to start a gaia node for inference.
### Requirements
- CUDA enabled GPU (Make sure CUDA toolkit is installed)
- Minimum 16GB VRAM, Recommended 24GB (for our config)
- 12 GB of storage for models only
### Steps to run
1. Install node
```bash
curl -sSfL 'https://github.com/MinervaGov/minerva_main/raw/refs/heads/main/gaia/install.sh' | bash
```
> This will create a gaianet folder in your $HOME directory
2. Follow on screen instruction at the end to finalize installation.
```bash
cd $HOME/gaianet
```
3. Download knowledge base
```bash
wget https://chibi.palbro.tech/api/file/64713428-0580-45c6-817f-5543a455a5cb/download -O comb.tar.gz
```
4. Edit the config.json file with [this](https://github.com/MinervaGov/minerva_main/blob/main/gaia/config.json)

5. Initialize node
```bash
gaianet init
```
6. Start the node
```bash
gaianet start
```
The gaianet domain link in the output will be the gaianet api url.

## ⚙️ Backend
### Pre-requisite
Make sure you have a redis-stack-server running on port 6379 before running the server.
Redis instructions [here](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)

### Steps
1. Clone the repository
```bash
git clone https://github.com/MinervaGov/minerva_main.git
cd minerva_main
```
2. Open the backend directory
```bash
cd server
```
3. Install dependencies
```bash
pnpm install
```
4. Copy `.env.example` file to `.env` and fill in the required details
```bash
cp .env.example .env
```
> All the necessary details regarding services used are in the env file

5. Sync database functions and schema with Convex Cloud
```bash
npx convex dev
```
6. Start the server
```bash
pnpm run start
```

## 🎨 Frontend
1. Open the frontend directory
```bash
cd client
```
2. Install the dependencies
```bash
pnpm install
```
3. Copy the `.env.example` file to `.env.local` and fill in the details
```bash
cp .env.example .env.local
```
4. Start the development server
```bash
pnpm run dev
```

# Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

# License

Distributed under the MIT License. See LICENSE for more information.
