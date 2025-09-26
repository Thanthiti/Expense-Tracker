import { useState } from "react";
import "../css/ExpenseForm.module.css";

function ExpenseForm({ addExpense }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const categories = ["อาหาร", "เดินทาง", "ช็อปปิ้ง", "บันเทิง", "อื่น ๆ"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category) return;
    const now = new Date();
    const timestamp = now.getTime();
    const date = new Date(timestamp);

    const newExpense = {
      ...form,
      id: crypto.randomUUID(),
      amount: parseInt(form.amount),
      timestamp: date,
    };

    console.log("submit:", newExpense);

    addExpense(newExpense);

    setForm({ amount: "", category: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="amount"
        placeholder="amount"
        value={form.amount}
        onChange={handleChange}
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">-- select --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        name="description"
        placeholder="description"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Save</button>
    </form>
  );
}

export default ExpenseForm;
