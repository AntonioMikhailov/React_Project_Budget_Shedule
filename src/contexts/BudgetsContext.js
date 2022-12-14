import React, { useContext } from "react";
 import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
// создаем контекст для передачи во все компоненты
const BudgetsContext = React.createContext();
export const UNCATEGORIZED_BUDGET_ID = "Без категории";
export function useBudgets() {
   return useContext(BudgetsContext);
}
 
// обернем все App в index.js - чтобы можно было через Context получить в любом компоненте
export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []); //будет храниться массив из id name max
 const [expenses, setExpenses] = useLocalStorage("expenses", []); //  массив - id budgetId amount description
  function getBudgetExpenses(budgetId) {
    // будет возвращать текущий id
    return expenses.filter((expense) => {
      return expense.budgetId === budgetId;
    });
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      // добавляем к текущей стоимости description, amount, budgetId
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      // проверяем что нет такого имени name ранее 
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets; // если найдет совпадение - вернет предыдущий
      }
      // добавляем к текущему бюджету id + имя  + значение
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  // удаляем по Id
  function deleteBudget({ id }) {
    //Добавляем удаление всей Карточки Бюджет -точнее перемещаем в Uncategorized 
    setExpenses(prevExpenses => {
      return prevExpenses.map((expense)=> {
        // если не равен текущему - ничего не делаем
        if(expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
      })
    })
     // при удалении эта карточка будет перемещаться в раздел Uncategorized и туда будет добавляться сумма и названия статей расходов - т.е. не совсем удаляется а будет храниться в Uncategorized
    setBudgets((prevBudgets) => {
      // вернет id которые не равны текущему - т.е. все кроме текущего вернет а текущий удалит из  массива
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  // удаляем по такому же принипу что и выше в deleteBudget
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetsContext.Provider
      value={{ budgets, expenses,getBudgetExpenses, addExpense, addBudget, deleteBudget, deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
