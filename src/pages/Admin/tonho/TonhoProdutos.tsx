import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, stockItems, formatCurrency } from "@/data/mock-data";
import { Package } from "lucide-react";
import { stockStatusBadge } from "@/components/StatusBadge";

export default function TonhoProdutos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Produtos — Tonho</h1>
        <p className="text-muted-foreground">Catálogo de produtos</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const stock = stockItems.find((s) => s.id === product.stockItemId);
          return (
            <Card key={product.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <Package className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{formatCurrency(product.price)}</span>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                </div>
                {stock && (
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-xs text-muted-foreground">Estoque: {stock.quantity} un.</span>
                    {stockStatusBadge(stock.status)}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
