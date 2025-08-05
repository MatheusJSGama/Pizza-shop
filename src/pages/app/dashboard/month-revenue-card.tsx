import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ["month-revenue", "metrics"],
    queryFn: getMonthRevenue,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total no (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </span>
            {monthRevenue.diffFromLastMonth >= 0 ? (
              <>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenue.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground">
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthRevenue.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </p>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
