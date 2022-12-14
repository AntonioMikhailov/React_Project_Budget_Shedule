import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { UNCATEGORIZED_BUDGET_ID,  useBudgets} from "../src/contexts/BudgetsContext";
function App() {
  
 const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
 const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
 const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
 const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  // импортируем Кастомный хук из BudgetContext  
  const { budgets, getBudgetExpenses } = useBudgets();
  function openAddExpenseModal(budgetId) {
      setShowAddExpenseModal(true);
    // устанавливаем ID  чтобы по клику на кнокпе Expense по умолчанию открывался текущее имя Расхода
    setAddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
      <Container className={"my-4"}>
        <Stack direction="horizontal" gap="2" className={"mb-4"}>
          <h2 className="me-auto">Планировщик бюджета </h2>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Добавить раздел
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Добавить расходы
          </Button>
        </Stack>
         <div
          style={{
            display: "grid",
            gridTemplate: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            // надо получить сумму всех уже созданных карточек бюджета
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              // вызываем карточку каждую и передаем данные из localStorage
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                // передаем обработчик по клику на AddExpense
                onAddExpensiveClick={() => openAddExpenseModal(budget.id)}
                // передаем обработчик для viewExpenses
                onViewExpensiveClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
          {/* вызываем модалку с Несортированными расходами + добавляем возможность открывать новый список AddExpense */}
          <UncategorizedBudgetCard
            onAddExpensiveClick={openAddExpenseModal}
            onViewExpensiveClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          {/* Вызываем Total  */}
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        // передаем defaultBudgetId id чтобы в Select появлялось текущее имя карточки 
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}
export default App;
