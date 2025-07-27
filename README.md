# Study Sphere

A full-stack web application with a Django (backend) and React (frontend) architecture.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Frontend Setup (React)](#frontend-setup-react)
- [Git Workflow Guidelines](#git-workflow-guidelines)
- [Contributing](#contributing)
- [Common Issues](#common-issues)
- [License](#license)

## Project Overview

This project is a collaborative effort to build a modern web application using a Django backend and a React frontend. The project is designed to allow team members to work on different components independently while maintaining a smooth integration process.

## Project Structure

The repository is organized as follows:

```
├── backend/         # Django project for the backend API
├── frontend/        # React project for the client-side application
└── env/             # Virtual environment for Python dependencies (not committed)
```

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- (Optional) [Visual Studio Code](https://code.visualstudio.com/) or your favorite IDE

### Backend Setup (Django)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/solxire88/study-sphere.git
   cd study-sphere/backend
   ```

2. **Create and activate your virtual environment:**

   On macOS/Linux:

   ```bash
   python3 -m venv ../env
   source ../env/bin/activate
   ```

   On Windows:

   ```bash
   python -m venv ..\env
   ..\env\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser:**

   ```bash
   python manage.py createsuperuser
   ```

6. **Start the Django development server:**

   ```bash
   daphne asgi.backend:application
   ```

### Frontend Setup (React)

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React development server:**

   ```bash
   npm run dev
   ```

## Git Workflow Guidelines

To ensure smooth collaboration within the team, please adhere to the following git workflow:

1. **Branching Strategy:**

   - Use the `main` branch as the stable production branch.
   - Create a new branch for each feature or bug fix using the naming convention:  
     `feature/short-description` or `bugfix/short-description`

     Example:

     ```bash
     git checkout -b feature/{add-the-feature-you-want}
     ```

2. **Commit Messages:**

   - Write clear, concise commit messages that describe the changes.
   - Follow the commit message format:

     ```
     [Type] Short description

     Detailed explanation of changes.
     ```

     Where `[Type]` can be:

     - `feat`: new feature
     - `fix`: bug fix
     - `docs`: documentation changes
     - `style`: formatting, missing semi-colons, etc.
     - `refactor`: code changes that neither fixes a bug nor adds a feature

3. **Pushing Changes:**

   - Always pull from `main` before pushing your changes.
   - After committing locally, push your branch:
     ```bash
     git push origin feature/{add-the-feature-you-want}
     ```

4. **Pull Requests:**

   - Open a pull request on GitHub with a clear description of the changes.
   - Request code reviews from at least one team member before merging.
   - Ensure all tests pass and that your code follows our coding standards.

5. **Code Reviews:**
   - Provide constructive feedback during code reviews.
   - Discuss any changes or potential improvements before merging.

## Contributing

1. **Fork the repository** (if you do not have write access).
2. **Create your branch** from `main`.
3. **Commit your changes** and push to your branch.
4. **Submit a pull request** with a clear description of your changes.

Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on contributions and coding standards.

## Common Issues

- **Database Errors:**  
  If you encounter errors related to migrations or missing tables, try resetting the database (only recommended for development):

  ```bash
  rm db.sqlite3
  find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
  python manage.py makemigrations
  python manage.py migrate
  ```

- **Environment Activation:**  
  Ensure you have activated your virtual environment before running backend commands.

- **Port Conflicts:**  
  If the default ports (8000 for Django, 3000 for React) are in use, adjust the startup commands accordingly.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
