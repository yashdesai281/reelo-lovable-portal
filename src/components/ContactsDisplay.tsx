
import React from 'react';
import { toast } from '@/hooks/use-toast';

interface ContactsDisplayProps {
  rawData: any[][];
  columnMapping: Record<string, number>;
}

const ContactsDisplay: React.FC<ContactsDisplayProps> = ({ rawData, columnMapping }) => {
  if (!rawData || !columnMapping) {
    return <div className="p-4 bg-muted rounded-md">No data to display</div>;
  }
  
  // Get first few rows for preview
  const previewRows = rawData.slice(1, Math.min(6, rawData.length));
  
  // Extract mapped columns
  const extractValue = (row: any[], columnIndex: number | undefined) => {
    if (columnIndex === undefined || columnIndex < 0 || columnIndex >= row.length) {
      return '-';
    }
    return row[columnIndex] || '-';
  };
  
  return (
    <div className="overflow-x-auto w-full border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Mobile</th>
            <th className="px-4 py-3 text-left font-medium">Email</th>
            <th className="px-4 py-3 text-left font-medium">Birthday</th>
            <th className="px-4 py-3 text-left font-medium">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {previewRows.map((row, index) => (
            <tr key={index} className="hover:bg-muted/20">
              <td className="px-4 py-3">
                {extractValue(row, columnMapping.name)}
              </td>
              <td className="px-4 py-3">
                {extractValue(row, columnMapping.mobile)}
              </td>
              <td className="px-4 py-3">
                {extractValue(row, columnMapping.email)}
              </td>
              <td className="px-4 py-3">
                {extractValue(row, columnMapping.birthday)}
              </td>
              <td className="px-4 py-3">
                {extractValue(row, columnMapping.points)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {previewRows.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">
          No preview data available
        </div>
      )}
      
      {previewRows.length > 0 && rawData.length > 6 && (
        <div className="p-2 text-center text-muted-foreground text-xs">
          Showing {previewRows.length} of {rawData.length - 1} rows
        </div>
      )}
    </div>
  );
};

export default ContactsDisplay;
