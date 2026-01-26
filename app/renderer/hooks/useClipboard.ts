/**
 * Clipboard Management Hook
 * Provides clipboard operations with caching, polling, and real-time updates
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { logger } from "../../shared/logger";
import type { ClipboardItem, ClipboardFilter } from "../../shared/types";

interface UseClipboardOptions {
  autoPoll?: boolean;
  pollInterval?: number;
  limit?: number;
}

interface UseClipboardReturn {
  // State
  items: ClipboardItem[];
  selectedItem: ClipboardItem | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;

  // Actions
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  selectItem: (item: ClipboardItem) => void;
  clearSelection: () => void;
  copyToClipboard: (content: string, format?: string) => Promise<boolean>;
  deleteItem: (id: string) => Promise<boolean>;
  clearAll: () => Promise<boolean>;
  search: (query: string, filter?: ClipboardFilter) => Promise<void>;

  // Utilities
  exportSelection: (format: "json" | "csv" | "txt") => Promise<string>;
  importItems: (data: string, format: "json" | "csv") => Promise<number>;
}

export const useClipboard = (
  options: UseClipboardOptions = {},
): UseClipboardReturn => {
  const { autoPoll = true, pollInterval = 2000, limit = 50 } = options;

  const logger = logger.child({ module: "useClipboard" });

  // State
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClipboardItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentFilter, setCurrentFilter] = useState<ClipboardFilter>({});

  // Refs
  const pollIntervalRef = useRef<NodeJS.Timeout>();
  const isMountedRef = useRef(true);

  // Initialize
  useEffect(() => {
    isMountedRef.current = true;

    if (autoPoll) {
      startPolling();
    }

    refresh();

    return () => {
      isMountedRef.current = false;
      stopPolling();
    };
  }, []);

  // Polling management
  const startPolling = useCallback(() => {
    stopPolling();

    pollIntervalRef.current = setInterval(async () => {
      if (document.hidden) return; // Don't poll when tab is hidden

      try {
        const response = await window.knoux.getCurrentClipboard();
        if (response.success && response.data) {
          // Check if this is a new item
          const lastItem = items[0];
          if (!lastItem || lastItem.id !== response.data.id) {
            refresh();
          }
        }
      } catch (error) {
        logger.debug("Polling error:", error);
      }
    }, pollInterval);
  }, [pollInterval, items]);

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = undefined;
    }
  }, []);

  // Fetch clipboard history
  const fetchClipboardHistory = useCallback(
    async (
      fetchOffset: number = 0,
      filter?: ClipboardFilter,
    ): Promise<{ items: ClipboardItem[]; total: number }> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await window.knoux.getClipboardHistory({
          limit,
          offset: fetchOffset,
          filter: filter || currentFilter,
        });

        if (!response.success) {
          throw new Error(
            response.error || "Failed to fetch clipboard history",
          );
        }

        return {
          items: response.data || [],
          total: response.total || 0,
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        logger.error("Failed to fetch clipboard history:", error);
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [limit, currentFilter],
  );

  // Refresh clipboard history
  const refresh = useCallback(async () => {
    try {
      const { items: newItems, total } = await fetchClipboardHistory(0);

      if (!isMountedRef.current) return;

      setItems(newItems);
      setTotalCount(total);
      setOffset(limit);
      setSelectedItem(null);

      logger.info("Clipboard refreshed", { count: newItems.length, total });
    } catch (error) {
      // Error already handled in fetchClipboardHistory
    }
  }, [fetchClipboardHistory]);

  // Load more items
  const loadMore = useCallback(async () => {
    if (isLoading || items.length >= totalCount) return;

    try {
      setIsLoading(true);
      const { items: newItems } = await fetchClipboardHistory(offset);

      if (!isMountedRef.current) return;

      setItems((prev) => [...prev, ...newItems]);
      setOffset((prev) => prev + limit);

      logger.debug("Loaded more clipboard items", { count: newItems.length });
    } catch (error) {
      // Error already handled
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, items.length, totalCount, offset, fetchClipboardHistory]);

  // Select item
  const selectItem = useCallback((item: ClipboardItem) => {
    setSelectedItem(item);
    logger.debug("Item selected", { id: item.id });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Copy to clipboard
  const copyToClipboard = useCallback(
    async (content: string, format: string = "text"): Promise<boolean> => {
      try {
        const response = await window.knoux.copyToClipboard(content, format);

        if (response.success) {
          logger.info("Content copied to clipboard", {
            format,
            length: content.length,
          });
          await refresh(); // Refresh to show the new item
          return true;
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        logger.error("Failed to copy to clipboard:", error);
        setError(error instanceof Error ? error.message : "Copy failed");
        return false;
      }
    },
    [refresh],
  );

  // Delete item
  const deleteItem = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        // In a real implementation, this would call an IPC method
        // For now, we'll filter it out locally
        setItems((prev) => prev.filter((item) => item.id !== id));

        if (selectedItem?.id === id) {
          setSelectedItem(null);
        }

        logger.info("Item deleted", { id });
        return true;
      } catch (error) {
        logger.error("Failed to delete item:", error);
        return false;
      }
    },
    [selectedItem],
  );

  // Clear all items
  const clearAll = useCallback(async (): Promise<boolean> => {
    try {
      const response = await window.knoux.clearClipboardHistory();

      if (response.success) {
        setItems([]);
        setSelectedItem(null);
        setTotalCount(0);
        setOffset(0);

        logger.info("All clipboard items cleared", {
          deletedCount: response.deletedCount,
        });
        return true;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      logger.error("Failed to clear clipboard:", error);
      setError(error instanceof Error ? error.message : "Clear failed");
      return false;
    }
  }, []);

  // Search items
  const search = useCallback(
    async (query: string, filter?: ClipboardFilter) => {
      try {
        setIsLoading(true);
        setError(null);

        const searchFilter = { ...currentFilter, ...filter, search: query };
        setCurrentFilter(searchFilter);

        const { items: searchResults, total } = await fetchClipboardHistory(
          0,
          searchFilter,
        );

        if (!isMountedRef.current) return;

        setItems(searchResults);
        setTotalCount(total);
        setOffset(limit);

        logger.info("Search performed", {
          query,
          results: searchResults.length,
        });
      } catch (error) {
        // Error already handled
      } finally {
        setIsLoading(false);
      }
    },
    [currentFilter, fetchClipboardHistory],
  );

  // Export selected items
  const exportSelection = useCallback(
    async (format: "json" | "csv" | "txt"): Promise<string> => {
      try {
        const itemsToExport = selectedItem ? [selectedItem] : items;

        if (format === "json") {
          return JSON.stringify(itemsToExport, null, 2);
        } else if (format === "csv") {
          // Convert to CSV
          const headers = ["ID", "Content", "Format", "Timestamp", "Tags"];
          const rows = itemsToExport.map((item) => [
            item.id,
            item.content.substring(0, 100).replace(/"/g, '""'),
            item.format,
            item.timestamp,
            item.tags?.join(", ") || "",
          ]);

          const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
          ].join("\n");

          return csvContent;
        } else {
          // TXT format
          return itemsToExport
            .map(
              (item) =>
                `[${item.timestamp}] ${item.format.toUpperCase()}: ${item.content.substring(0, 200)}`,
            )
            .join("\n\n");
        }
      } catch (error) {
        logger.error("Export failed:", error);
        throw error;
      }
    },
    [items, selectedItem],
  );

  // Import items
  const importItems = useCallback(
    async (data: string, format: "json" | "csv"): Promise<number> => {
      try {
        const response = await window.knoux.importData(data, format);

        if (response.success) {
          await refresh();
          logger.info("Items imported", { count: response.importedCount });
          return response.importedCount || 0;
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        logger.error("Import failed:", error);
        setError(error instanceof Error ? error.message : "Import failed");
        return 0;
      }
    },
    [refresh],
  );

  return {
    // State
    items,
    selectedItem,
    isLoading,
    error,
    totalCount,
    hasMore: items.length < totalCount,

    // Actions
    refresh,
    loadMore,
    selectItem,
    clearSelection,
    copyToClipboard,
    deleteItem,
    clearAll,
    search,

    // Utilities
    exportSelection,
    importItems,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
  };
};

export default useClipboard;
