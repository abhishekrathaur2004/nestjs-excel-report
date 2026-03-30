# NestJS backend (report API + MinIO uploads)

Small **NestJS 11** service: versioned HTTP API, **Swagger** at `/api`, Excel report generation, and **S3-compatible uploads** to **MinIO** (optional for local dev).

## Prerequisites

- **Node.js** >= 20
- **Docker** with **Compose** (optional, for MinIO). Scripts try `docker-compose` first, then `docker compose` — install [Docker Compose](https://docs.docker.com/compose/install/) if neither works.

## Install

Use **npm**, **Yarn**, or **pnpm**:

```bash
npm install
# or: yarn install
# or: pnpm install
```

## Run

**Development (watch):**

```bash
npm run start:dev
```

**Production build + run:**

```bash
npm run build
npm run start
```

**MinIO (local object storage)** — needed if `GET /v1/report/excel` should upload the generated file to S3:

```bash
npm run db:dev:up    # docker compose up -d
npm run db:dev:rm    # docker compose down
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3003` | HTTP port |
| `MINIO_ENDPOINT` | `http://127.0.0.1:9000` | S3 API URL (use `http://minio:9000` if the app runs inside the same Docker network as MinIO) |
| `MINIO_REGION` | `us-east-1` | AWS SDK region string (required by the client; any value is fine for MinIO) |
| `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` | `minioadmin` / `minioadmin` | Credentials (or use `MINIO_ACCESS_KEY` / `MINIO_SECRET_KEY`) |
| `MINIO_BUCKET` | `files` | Bucket name (create it in MinIO or via your compose init) |

Create a `.env` in this folder if you override defaults (`@nestjs/config` loads `.env` and `.env.local` from the **media-upload** module).

## API

- **Versioning:** URI prefix `v1` (see `main.ts`).
- **Swagger:** `http://127.0.0.1:<PORT>/api`
- **Example:** `GET /v1/report/excel` — builds an Excel file, uploads to MinIO when configured; JSON shape is `{ "url": { "bucket", "key", ... } }` (see `ReportController`).

## Project layout

```
src/
├── main.ts
├── app.module.ts
└── api/
    ├── report/           # Report controller + Excel generation
    └── media-upload/    # MinIO / S3 client + upload service
```

## Troubleshooting

- **Port in use:** set `PORT=3004` (or free port) and restart.
- **Upload errors:** ensure MinIO is up (`docker ps`), defaults match `.env`, and the bucket exists.
- **Docker:** `docker ps` should work; if not, start Docker Desktop (or your engine) before `npm run db:dev:up`.
