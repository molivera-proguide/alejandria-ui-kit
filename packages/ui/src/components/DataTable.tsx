import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface DataTableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

export interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[];
  rows: Array<Record<string, ReactNode>>;
  caption?: string;
  rowKey?: string;
}

export function DataTable({ columns, rows, caption, rowKey = "id", className, ...props }: DataTableProps) {
  return (
    <div className={cn("ds-table-wrap", className)} {...props}>
      <table className="ds-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} data-align={column.align ?? "left"}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={String(row[rowKey] ?? index)}>
              {columns.map((column) => (
                <td key={column.key} data-align={column.align ?? "left"}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
