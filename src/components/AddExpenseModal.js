import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID, 
  useBudgets,
} from "../contexts/BudgetsContext";
export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  // здесь деструктуризация - addExpense, budgets получаем из BudgetsContext
  const { addExpense, budgets } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Статья Расходов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Сумма</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={1}
            />
          </Form.Group>
          {/*  Form.Select для выбора категорий */}
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Категория</Form.Label>
            <Form.Select
              // defaultBudgetId - получаем из параметра ф.
              defaultValue={defaultBudgetId}
              ref={budgetIdRef}
            >
             <option id={UNCATEGORIZED_BUDGET_ID}>Без категории</option>
              {budgets.map((budget, i) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
           <div className={"d-flex justify-context-end"}>
            <Button variant="primary" type="submit">
              Добавить
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
