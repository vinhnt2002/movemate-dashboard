import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IFee } from "../../../types/fee-type";

export const nameColumn = {
  accessorKey: "name",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Phí dịch vụ" />
  ),
  cell: ({ row }: { row: Row<IFee> }) => {
    return (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default nameColumn;
