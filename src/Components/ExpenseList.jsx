import React, { useState } from "react";
import style from "../css/ExpenseList.module.css";

function ExpenseList({ expenses = [] }) {
  const [selectedDate, setSelectedDate] = useState(""); 

  if (!expenses.length) return <p>No expenses found</p>;

  const groupedByDate = expenses.reduce((acc, exp) => {
    const dateKey = new Date(exp.timestamp).toLocaleDateString(); 
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].unshift(exp); 
    return acc;
  }, {});


  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const filteredDates = selectedDate
    ? sortedDates.filter(
        (date) => date === new Date(selectedDate).toLocaleDateString()
      )
    : sortedDates;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Filter by date:{" "}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>

      {filteredDates.length === 0 && <p>No expenses</p>}

      {filteredDates.map((date) => (
        <div key={date} className={style.card}>
          <h3 style={{ marginBottom: 8 }}>{date}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {groupedByDate[date].map((exp) => (
              <li key={exp.id} className={style.li}>
                <div style={{ textAlign: "left" }}>
                  <strong>{exp.category}</strong>
                  <div>- {exp.amount} THB</div>
                  <div>

                  {exp.description
                    ? `- ${exp.description}`
                    : "- No description"}
                    </div>
                  <br />
                  <small>{new Date(exp.timestamp).toLocaleTimeString()}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
