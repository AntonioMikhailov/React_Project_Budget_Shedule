import React from "react";
import {   UNCATEGORIZED_BUDGET_ID,  useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
 
export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  // соберет все суммы чисел из категори Несортированные
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  // если нет категории такой то ничего не показываем
  if (amount === 0) return null;
  return (
    // gray  -  фон цвет -  
    <BudgetCard amount={amount} name="Без категории" gray {...props} />
  );
}
