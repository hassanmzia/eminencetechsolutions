# Eminence Tech Solutions

**Pioneering AI Innovation for Enterprise Transformation**

A professional-grade, full-stack web application for Eminence Tech Solutions - an AI consulting company specializing in Agentic AI, Multi-Agent Systems, Generative AI, DevSecOps, Cloud Architecture, and Cybersecurity.

## Architecture

```
                    ┌─────────────┐
                    │   Nginx     │ :80
                    │  (Reverse   │
                    │   Proxy)    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │                         │
     ┌────────▼────────┐     ┌─────────▼────────┐
     │  React/TS       │     │  Django REST API  │
     │  Frontend       │     │  Backend          │
     │  :3000          │     │  :8000            │
     └─────────────────┘     └────────┬──────────┘
                                      │
                        ┌─────────────┼──────────────┐
                        │             │              │
               ┌────────▼──┐  ┌──────▼─────┐  ┌─────▼──────┐
               │ PostgreSQL │  │   Redis    │  │   Celery   │
               │   :5432    │  │   :6379    │  │   Worker   │
               └────────────┘  └────────────┘  └────────────┘
```

## Tech Stack

### Backend
- **Django 5.1** + Django REST Framework
- **PostgreSQL 16** - Primary database
- **Redis 7** - Caching, session store, Celery broker
- **Celery** - Async task processing
- **Multi-Agent AI System** - Router, Sales, Technical, Support, Research agents
- **MCP** (Model Context Protocol) - AI tool integration standard
- **A2A** (Agent-to-Agent) - Inter-agent communication protocol
- **RAG** Architecture - Knowledge-grounded AI responses

### Frontend
- **React 18** + **TypeScript**
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Axios** - API communication

### Infrastructure
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy, load balancing
- **Gunicorn** - WSGI HTTP server

## Features

### Public Website
- Professional landing page with animated sections
- Comprehensive services catalog (10 service areas)
- Case studies with measurable results
- Team profiles and company information
- Blog/insights section
- AI-powered chat widget (multi-agent system)

### Interactive Portals
- **Consulting Inquiry Portal** - Detailed project submission forms with service types, budget ranges, urgency levels
- **Career Portal** - Job listings with expandable details and resume upload
- **Contact System** - Multi-type inquiry forms
- **Newsletter Subscription** - Email list management

### AI Engine
- Multi-agent system with intelligent routing
- MCP endpoint for tool integration
- A2A agent card for inter-agent discovery
- Conversation session management
- Knowledge-grounded responses

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/hassanmzia/eminencetechsolutions.git
cd eminencetechsolutions

# Copy environment file
cp .env.example .env

# Build and start all services
docker compose up --build -d

# Access the application
open http://localhost
```

### Port Mapping (Avoids Conflicts)

| Service    | Internal Port | External Port |
|------------|--------------|---------------|
| Nginx      | 443          | 443 (TLS)     |
| Frontend   | 3000         | (internal)    |
| Backend    | 8000         | (internal)    |
| PostgreSQL | 5432         | 25433         |
| Redis      | 6379         | 26380         |

TLS is terminated on the nginx service. Drop your ZeroSSL `fullchain.pem` and
`privkey.pem` into `./nginx/certs/` before bringing the stack up — see
`nginx/certs/README.md` for instructions. Only HTTPS on port 443 is exposed;
port 80 is not bound on the host.

### Django Admin

Access the admin panel at `http://localhost/admin/`

Create a superuser:
```bash
docker compose exec backend python manage.py createsuperuser
```

### API Endpoints

| Endpoint                    | Description                    |
|-----------------------------|--------------------------------|
| `GET /api/health/`          | Health check                   |
| `GET /api/services/`        | List all services              |
| `GET /api/case-studies/`    | List case studies              |
| `GET /api/team/`            | List team members              |
| `GET /api/testimonials/`    | List testimonials              |
| `GET /api/blog/`            | List blog posts                |
| `GET /api/metrics/`         | Company metrics                |
| `GET /api/careers/jobs/`    | List job postings              |
| `POST /api/careers/applications/` | Submit job application   |
| `POST /api/consulting/inquiries/` | Submit consulting inquiry|
| `POST /api/contact/messages/`     | Submit contact message   |
| `POST /api/contact/newsletter/`   | Subscribe to newsletter  |
| `POST /api/ai/chat/`              | AI chat endpoint         |
| `GET /api/ai/agents/`             | Agent system info        |
| `GET /api/ai/mcp/`                | MCP capabilities         |
| `GET /api/ai/a2a/agent-card/`     | A2A agent card           |

## Development

### Backend Development
```bash
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py seed_data
```

### Frontend Development
The React app is built and served via Nginx in production mode within Docker.

For local development:
```bash
cd frontend
npm install
npm start  # Runs on port 3000
```

## Company Information

**Eminence Tech Solutions**
44330 Mercure Circle, Sterling, VA
https://www.eminencetechsolutions.com

Expert consulting in:
- Agentic AI Systems
- Generative AI Solutions
- Multi-Agent AI Systems (MCP, A2A)
- AI Transformation & Strategy
- DevSecOps & MLOps
- Cloud & Kubernetes (AWS, Azure, GCP)
- Cybersecurity & Compliance (ATO, FedRAMP)
- AI Governance & Ethics
- Data Engineering & Analytics
- Training & Education
