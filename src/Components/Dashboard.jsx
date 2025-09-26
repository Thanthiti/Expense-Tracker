import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "../css/Dashbord.module.css";

function Dashboard({ expenses }) {
  const [selectedDate, setSelectedDate] = useState("");

  if (!expenses.length)
    return <p className={styles.noData}>No expenses found</p>;

  const today = new Date();
  const todayStr = today.toLocaleDateString();

  const dateToFilter = selectedDate
    ? new Date(selectedDate).toLocaleDateString()
    : todayStr;

  const filteredExpenses = expenses.filter(
    (exp) => new Date(exp.timestamp).toLocaleDateString() === dateToFilter
  );

  const summaryByCategory = filteredExpenses.reduce((acc, exp) => {
    if (!acc[exp.category]) acc[exp.category] = 0;
    acc[exp.category] += exp.amount;
    return acc;
  }, {});

  const chartData = Object.keys(summaryByCategory).map((cat) => ({
    category: cat,
    amount: summaryByCategory[cat],
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Dashboard - Expenses</h2>

      <div className={styles.filter}>
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>

      {chartData.length === 0 ? (
        <p className={styles.noData}>No expenses for this date.</p>
      ) : (
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} บาท`} />
              <Legend />
              <Bar dataKey="amount" fill="#1a73e8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <h3 className={styles.total}>
        Total: {filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)} บาท
      </h3>
    </div>
  );
}

export default Dashboard;
