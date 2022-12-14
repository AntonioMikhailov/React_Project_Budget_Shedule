import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";
//  применяем стили react-bootstrap
export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  // здесь деструктуризация - addBudget получаем из BudgetsContext
  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    // данные из input запишутся в localStorage который в BudgetContext
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    // закрываем после ввода
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Новый раздел</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Наименование</Form.Label>
            <Form.Control
              ref={nameRef}
              type="text"
              required
              placeholder={"Еда, Одежда, Автомобиль, Учеба ..."}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Максимальная сумма</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={1}
            />
          </Form.Group>
          <div className={"d-flex justify-context-end"}>
            <Button variant="primary" type="submit">
              Добавить раздел
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
