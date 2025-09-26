import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import Dashboard from "./components/Dashboard";

import style from "./css/App.module.css";

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  useEffect(()=>{
    const data = localStorage.getItem("expense")
    // localStorage.clear()
      if (data) {
        setExpenses(JSON.parse(data));
      }
  },[])

 const addExpense = (expense) => {
   const newExpenses = [...expenses, expense];
   setExpenses(newExpenses);
   localStorage.setItem("expenses", JSON.stringify(newExpenses));

   console.log("รายการทั้งหมด:", newExpenses); 
 };

  return (
    <>
      <h1>Expense Tracker</h1>

      <div className={style.parent}>
        <div className={style.box1}>
          <ExpenseForm addExpense={addExpense}></ExpenseForm> 
        </div>

        <div className={style.box2}>

          <ExpenseList
            expenses={expenses}
            ></ExpenseList>
            </div>

        <div className={style.box3}>
          <Dashboard expenses={expenses}></Dashboard>
            </div>
  
      </div>
    </>
  );
}

export default App;
