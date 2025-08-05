import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrderAmount } = useQuery({
    queryKey: ["month-orders-canceld", "metrics"],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthCanceledOrderAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrderAmount.amount.toLocaleString("pt-BR")}
            </span>
            {monthCanceledOrderAmount.diffFromLastMonth <= 0 ? (
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthCanceledOrderAmount.diffFromLastMonth}%
                </span>{" "}
                em relação a ontem
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 dark:text-rose-400">
                  +{monthCanceledOrderAmount.diffFromLastMonth}%
                </span>{" "}
                em relação a ontem
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
