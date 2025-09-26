import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import ExpenseForm from "./Components/ExpenseForm";


import style from "./css/App.module.css";

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);


  useEffect(()=>{
    const data = localStorage.getItem("expense")
      if (data) {
        setExpenses(JSON.parse(data));
      }
  },[])

 const addExpense = (expense) => {
   const newExpenses = [...expenses, expense];
   setExpenses(newExpenses);
   localStorage.setItem("expenses", JSON.stringify(newExpenses));

   console.log("รายการทั้งหมด", newExpenses); 
 };

  return (
    <>
      <h1>📒 รายจ่ายของฉัน</h1>

      <div className={style.parent}>
        <div className={style.box1}>
          <ExpenseForm addExpense={addExpense}></ExpenseForm> 
        </div>

        <div className={style.box2}>กล่อง 2 (Dashboard)</div>
        <div className={style.box3}>
          
        </div>
      </div>
    </>
  );
}

export default App;
