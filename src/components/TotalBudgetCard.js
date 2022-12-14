import React from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  // соберет все суммы из категори Несортированные
 const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  // собираем Max все
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  // если нет Max такой то ничего не показываем
  if (max === 0) return null;
  return (
    // gray пропс  - это цвет фона
    // передаем hideButtons в BudgetCard- чтоы спрятать кнопки AddExpense / ViewExpense - они не нужны в этой карточке
    <BudgetCard amount={amount} max={max} name="Всего" gray hideButtons />
  );
}
