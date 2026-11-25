export const initialSnippets = [
  {
    id: 1,
    title: 'Debounce Hook in React',
    language: 'JavaScript',
    category: 'Frontend',
    description: 'Delays updating a value until a specified time has passed since the last change.',
    code: `import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}`,
    likes: 24,
  },
  {
    id: 2,
    title: 'Binary Search Algorithm',
    language: 'Python',
    category: 'Algorithms',
    description: 'Efficient O(log n) search algorithm on a sorted array.',
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    likes: 41,
  },
  {
    id: 3,
    title: 'PostgreSQL Top N Per Group',
    language: 'SQL',
    category: 'Database',
    description: 'Uses ROW_NUMBER() window function to fetch the highest record per category.',
    code: `WITH RankedSales AS (
  SELECT product_id, category, revenue,
         ROW_NUMBER() OVER(PARTITION BY category ORDER BY revenue DESC) AS rn
  FROM sales
)
SELECT product_id, category, revenue
FROM RankedSales
WHERE rn = 1;`,
    likes: 19,
  },
];
