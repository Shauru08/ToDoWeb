import { useState, useEffect } from "react";

// Ensure compatibility with DropDownSelect
interface BaseData {
  id: number;
  name: string;
  [key: string]: any;
}

export interface ListDataSelected extends BaseData {
  value: string | BaseData;
}

// API Base URL
const API_BASE_URL = "http://192.168.1.17:8085/todoapi";

/**
 * Custom hook to fetch priority and category dropdown data
 */
export function useDropdownData() {
  const [priorityData, setPriorityData] = useState<ListDataSelected[]>([]);
  const [categoryData, setCategoryData] = useState<ListDataSelected[]>([]);

  useEffect(() => {
    fetchPriorities();
    fetchCategories();
  }, []);

  // Fetch priorities from API
  const fetchPriorities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/priority`);
      const data = await response.json();

      if (data.errorCode === "00" && Array.isArray(data.priorities)) {
        const formattedData: ListDataSelected[] = data.priorities.map((item: { id: number; level: string }) => ({
          id: item.id,
          name: `Priority ${item.level}`,
          value: item.level,
        }));

        setPriorityData(formattedData);
      } else {
        console.error("Unexpected API response format for priorities:", data);
      }
    } catch (error) {
      console.error("Error fetching priorities:", error);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/category`);
      const data = await response.json();

      if (data.errorCode === "00" && Array.isArray(data.categories)) {
        const formattedData: ListDataSelected[] = data.categories.map((item: { id: number; name: string }) => ({
          id: item.id,
          name: item.name,
          value: item.name,
        }));

        setCategoryData(formattedData);
      } else {
        console.error("Unexpected API response format for categories:", data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return { priorityData, categoryData };
}

/**
 * Function to send a task to the API
 */
export async function createTask(taskData: {
  title: string;
  description: string;
  startDate: string; // Format: YYYY-MM-DD
  endDate: string; // Format: YYYY-MM-DD
  priorityId: number;
  userId: number;
  categoryIds: number[];
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Error creating task:", responseData);
      throw new Error(responseData.errorMessage || "Failed to create task");
    }

    console.log("Task created successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending task data:", error);
    throw error;
  }
}
