
# Health Information System Server

This is the backend server for the Health Information System project. It provides a RESTful API for managing clients, health programs, and enrollments using FastAPI and SQLAlchemy.

## Features

- FastAPI-based REST API
- SQLAlchemy ORM for database access
- Modular architecture (API, models, schemas, CRUD)
- Automatic database initialization on startup
- API documentation available at `/docs`

## Project Structure

```
server/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   ├── api/
│   │   └── v1/
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   ├── crud/
│   ├── models/
│   └── schemas/
├── healthinfo.db
├── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11+
- [pip](https://pip.pypa.io/)
- (Recommended) [virtualenv](https://virtualenv.pypa.io/)

### Setup

1. **Create and activate a virtual environment:**
    ```sh
    python -m venv env
    source env/bin/activate
    ```

2. **Install dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

3. **Run the server:**
    ```sh
    uvicorn app.main:app --reload
    ```

4. **Access the API docs:**
    - Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.

## API Endpoints

- `GET /` — Root endpoint with welcome message and status
- `GET /docs` — Interactive API documentation (Swagger UI)
- Additional endpoints for clients, programs, and enrollments are available under `/api/v1/`

## Database

- Uses SQLite by default (`healthinfo.db`)
- Tables are automatically created on startup

## Development

- Code is organized by feature: API routes, models, schemas, and CRUD logic.
- Logging is configured for debugging and monitoring.

## License

This project is licensed under the MIT License.

```
