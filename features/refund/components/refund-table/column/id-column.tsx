import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IRefund } from "../../../types/refund-type";

export const idColumn = {
  accessorKey: "id",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Mã Yêu Cầu" />
  ),
  cell: ({ row }: { row: Row<IRefund> }) => (
    <div className="w-[80px]">{row.getValue("id")}</div>
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default idColumn;
