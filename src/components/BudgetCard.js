import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
export default function BudgetCard({ name,amount, max, gray,hideButtons, onAddExpensiveClick, onViewExpensiveClick,
}) {
 // если значение больше максимального будем делать фон карточки красным
  const classNames = []; // создаем сборку стилей  
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
    // если в параметре передадут gray  - то серым
  } else if (gray) {
    classNames.push("bg-light");
  }
  // регулируем шкалу отображения прогресса
  function getProgressBarVariant(amount, max) {
    const ratio = amount / max; // 0.2
    if (ratio < 0.5) return "primary"; // color
    if (ratio < 0.75) return "warning"; // желтый цвет
    // если больше 75% - красный
    return "danger";
  }
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
       <Card.Title
          className={
            "d-flex justify-content-between align-items-baseline fw-normal mb-3"
          }
        >
          <div className={"me-2"}>{name}</div>
          <div className={"d-flex  align-items-baseline"}>
            {" "}
            {currencyFormatter.format(amount)}
            {/* Если нет max параметра то не показываем - для Uncategorized */}
            {max && (
              <span className={"text-muted fs-6 ms-1"}>
                {" "}
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {/* Создаем прогресс бар из bootstrap - не показываем если нет max значения */}
        {max && ( <ProgressBar
            className={"rounded-pill"}
            variant={getProgressBarVariant(amount, max)}
            // это опции BS
            min={0} max={max} now={amount}
          />
        )}
        <Stack direction="horizontal" gap="2" className={"mt-4"}>
          {!hideButtons && (
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpensiveClick}
            >
              Добавить расходы
            </Button>
          )}
          {!hideButtons && (
            <Button onClick={onViewExpensiveClick} variant="outline-secondary">
              Смотреть расходы
            </Button>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
