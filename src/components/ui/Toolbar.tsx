import React from 'react';
import { Search, Filter } from 'lucide-react';

export interface ToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  filters: string[];
  action?: React.ReactNode;
  searchPlaceholder?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
  filters,
  action,
  searchPlaceholder = 'Search records...',
}) => {
  return (
    <div className="toolbar">
      <div className="searchbox">
        <Search size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="toolbar-right">
        <div className="filterbox">
          <Filter size={16} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {filters.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {action}
      </div>
    </div>
  );
};

export default Toolbar;
