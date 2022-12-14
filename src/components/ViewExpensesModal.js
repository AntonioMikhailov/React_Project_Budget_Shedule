import React from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import {   UNCATEGORIZED_BUDGET_ID,  useBudgets} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";
export default function ViewExpensesModal({ budgetId, handleClose }) {
  //  деструктуризация - получаем функции из BudgetsContext
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();
  const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "Без категории", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);
  // для содержимого ViewExpenses
  const expenses = getBudgetExpenses(budgetId);
  return (
    // покажем если budgetId не null
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
          <div>Расходы - {budget?.name}</div>
            {/* Удаляем но кроме Uncategorized -она всегда останется  */}
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Удалить раздел
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Stack direction="vertical" gap="3">
          {expenses.map((expense) => {
            return (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className={"me-auto fs-4"}>{expense.description}</div>
                <div className={"fs-5"}>
                  {currencyFormatter.format(expense.amount)}
                </div>
               <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >&times;</Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
