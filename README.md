# 🧠 ZK-Werewolf Backend

This project provides a fast and modular backend for handling zero-knowledge proof workflows using [Noir](https://noir-lang.org/), [Barretenberg](https://github.com/AztecProtocol/barretenberg), and [Elysia](https://elysiajs.com/) — built with [Bun](https://bun.sh/).

It supports:

- 🌀 Executing Noir circuits
- 🧾 Proving and verifying ZK proofs
- 📦 Thread-safe circuit handling

## 🔧 Requirements

Make sure the following tools are installed:

- **Bun** — for running the TypeScript backend
- **Docker** + `docker-compose` — if using the container setup

## 📁 Project Structure

```bash
.
├── circuits/                  # Compiled Noir circuit JSONs
│   └── <circuit_name>/        # One subfolder per circuit
├── src/
│   ├── index.ts               # Entrypoint
│   ├── routes/                # Elysia routes (execute, prove, verify)
│   ├── zk/                    # Implements circuit calls using Noir and Barretenberg (bb)
│   ├── utils/                 # Helpers
│   └── tests/                 # Tests
├── Dockerfile
├── docker-compose.yml
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Run the backend

```bash
bun start
```

By default, the server runs at http://localhost:3000
with the Swagger UI available at http://localhost:3000/swagger.

You can pass a custom port as a CLI argument:

```bash
bun start 8080
```

## ✅ Available Scripts

| Command      | Description                                |
| ------------ | ------------------------------------------ |
| `bun start`  | Start backend server                       |
| `bun lint`   | Lint source files using ESLint             |
| `bun format` | Format code using Prettier                 |
| `bun test`   | Run tests using Bun’s built-in test runner |

## 📦 API Routes

The backend provides endpoints under `/routes` to:

- `/execute` — generate witness from circuit inputs
- `/prove` — create a ZK proof using compiled circuit + witness
- `/verify` — verify a proof against a verification key

## 🛠️ Circuits Used

The `circuits/` folder contains precompiled Noir circuits used by this project:

- `aggregate_public_keys`
- `decrypt_one_layer`
- `gen_elgamal_key_pair`
- `shuffle4`
- `verify_card_message`
