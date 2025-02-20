# Expense Tracker

This is a web-based expense tracking application built using React and Recharts for data visualization. It helps users track their spending and view expense trends through pie and bar charts.

## Features
- 📊 **Pie Chart & Bar Chart:** Visualize expenses by category.
- 💰 **Total Spending Summary:** Displays total amount spent.
- 📝 **Latest Expenses:** Shows the most recent budget entries.
- ➕ **Add Expenses:** Easily add new expenses.
- 🔄 **Dynamic Data Fetching:** Fetches data from an Express.js API.

## Technologies Used
- React.js ⚛️
- Tailwind CSS 🎨
- Recharts 📊
- Axios 🌐
- Express.js (Backend API) 🛠️
- MongoDB (Database) 🗄️

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (running locally or via cloud service)

### Installation
```sh
# Clone the repository
git clone https://github.com/Shresth-12/Expense-Tracker.git

# Navigate to the backend directory
cd backend

# Install dependencies
npm install  # or yarn install
```

### Running the Backend
```sh
node index.js  # or yarn start
```
The backend will run on `http://localhost:3000`.

### Running the Frontend
```sh
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install  # or yarn install

# Start the frontend
npm run dev  # or yarn start
```
The frontend will run on `http://localhost:5173`.

## Project Structure
```
/src
  ├── components
  │   ├── Card.jsx
  │   ├── Chart.jsx
  │   ├── NavBar.jsx
  │   ├── PieChart.jsx
  │   ├── ExpenseCard.jsx
  ├── pages
  │   ├── Home.jsx
  │   ├── Add.jsx
  │   ├── Expenses.jsx
  ├── assets
  ├── App.jsx
```

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/expense/add` | POST | Add a new expense |
| `/api/v1/expense/get-expenses` | GET | Retrieve all expenses |
| `/api/v1/expense/edit/:id` | PUT | Edit an existing expense |
| `/api/v1/expense/delete/:id` | DELETE | Delete an expense |
| `/api/v1/expense/amount` | GET | Fetch total expense amount |
| `/api/v1/expense/monthly-expenses` | GET | Get total expenses per month |

## Contributing
Feel free to submit pull requests or open issues to improve the project! 🚀

## License
MIT License © 2025 Your Name

