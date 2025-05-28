import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Pedido: 123123213mop1k2 </DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-medium text-muted-foreground">
                    Matheus Gama
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-medium text-muted-foreground">
                    (11)99696-7813
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-medium text-muted-foreground">
                    matheus@gmail.com
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Realizado há</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-medium text-muted-foreground">
                    há 3 minutos
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Qtd.</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell>Pizza peperoni família</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right">R$69,90</TableCell>
                    <TableCell className="text-right">R$139,80</TableCell>
                </TableRow>
            </TableBody>

            <TableBody>
                <TableRow>
                    <TableCell>Pizza mussarela família</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right">R$59,90</TableCell>
                    <TableCell className="text-right">R$119,80</TableCell>
                </TableRow>
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total do pedido</TableCell>
                    <TableCell className="text-right font-medium">R$259,60</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
