import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface SubmissionsTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const SubmissionsTable = ({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No submissions yet',
}: SubmissionsTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const formatCsvValue = (value: unknown, key: string): string => {
    if (value == null) return '';
    if (key === 'created_at' || (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value))) {
      try {
        return format(new Date(value as string), 'yyyy-MM-dd HH:mm:ss');
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const escapeCsvField = (field: string): string => {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const handleExportCsv = () => {
    const header = columns.map((col) => escapeCsvField(col.label)).join(',');
    const rows = data.map((row) =>
      columns
        .map((col) => escapeCsvField(formatCsvValue(row[col.key], col.key)))
        .join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `submissions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={handleExportCsv}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={(row.id as string) || rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : column.key === 'created_at'
                    ? format(new Date(String(row[column.key])), 'PPp')
                    : String(row[column.key] ?? '-')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default SubmissionsTable;
