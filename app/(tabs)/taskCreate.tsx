import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import DatePickerField from "../../components/DatePickerField";
import { DropDownSelect } from "react-native-simple-dropdown-select";
import { useDropdownData, createTask, ListDataSelected } from "../../services/createTaskApi"; // Import API functions

export default function TaskCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    priorityId: "", // Store only the ID
    userId: "1", // Default user ID (change this as needed)
    categories: [] as number[], // Store category IDs as numbers
  });

  const { priorityData, categoryData } = useDropdownData();

  // Priority Dropdown
  const [priorityValue, setPriorityValue] = useState<ListDataSelected | undefined>(undefined);
  const [priorityOpen, setPriorityOpen] = useState(false);

  // Category Dropdown
  const [categoryValue, setCategoryValue] = useState<ListDataSelected | undefined>(undefined);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        title: form.title,
        description: form.description,
        startDate: form.startDate.toISOString().split("T")[0], // Convert Date to YYYY-MM-DD
        endDate: form.endDate.toISOString().split("T")[0], // Convert Date to YYYY-MM-DD
        priorityId: Number(form.priorityId), // Ensure it's a number
        userId: Number(form.userId), // Ensure it's a number
        categoryIds: form.categories, // Already an array of numbers
      };

      console.log("🚀 Sending task data to API:", formattedData); // ✅ Log request data in IDE console

      const response = await createTask(formattedData);
      Alert.alert("Success", "Task created successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to create task. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <FlatList
          data={[{ key: "form" }]}
          renderItem={() => (
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={form.title}
                  onChangeText={(text) => handleChange("title", text)}
                />
              </View>

              <View>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={250}
                  style={styles.descriptionInput}
                  placeholder="Description"
                  value={form.description}
                  onChangeText={(text) => handleChange("description", text)}
                />
              </View>

              {/* Start Date Picker */}
              <View>
                <Text style={styles.label}>Start Date</Text>
                <DatePickerField
                  label="Start Date"
                  date={form.startDate}
                  setDate={(date) => handleChange("startDate", date)}
                />
              </View>

              {/* End Date Picker */}
              <View>
                <Text style={styles.label}>End Date</Text>
                <DatePickerField
                  label="End Date"
                  date={form.endDate}
                  setDate={(date) => handleChange("endDate", date)}
                />
              </View>

              {/* Priority Dropdown */}
              <View style={[styles.dropDownWrapper, priorityOpen ? { zIndex: 2000 } : { zIndex: 1000 }]}>
                <Text style={styles.label}>Priority</Text>
                <DropDownSelect
                  toggle={() => setPriorityOpen(!priorityOpen)}
                  selectedData={priorityValue}
                  open={priorityOpen}
                  containerStyle={[styles.dropDownContainer, priorityOpen ? { zIndex: 2000 } : { zIndex: 1000 }]}
                  data={priorityData}
                  onSelect={(data) => {
                    setPriorityValue(data);
                    handleChange("priorityId", String(data.id)); // ✅ Store ID
                    setPriorityOpen(false);
                  }}
                />
              </View>

              {/* Category Dropdown */}
              <View style={[styles.dropDownWrapper, categoryOpen ? { zIndex: 2000 } : { zIndex: 1000 }]}>
                <Text style={styles.label}>Category</Text>
                <DropDownSelect
                  toggle={() => setCategoryOpen(!categoryOpen)}
                  selectedData={categoryValue}
                  open={categoryOpen}
                  containerStyle={[styles.dropDownContainer, categoryOpen ? { zIndex: 2000 } : { zIndex: 1000 }]}
                  data={categoryData}
                  onSelect={(data) => {
                    setCategoryValue(data);
                    handleChange("categories", [...form.categories, data.id]); // ✅ Store ID as a number
                    setCategoryOpen(false);
                  }}
                />
              </View>

              {/* Submit Button */}
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cddc39",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 17,
    textAlign: "left",
  },
  form: {
    width: "90%",
    margin: 20,
    backgroundColor: "#DFE2AB",
    borderRadius: 20,
    padding: 15,
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    width: 300,
    textAlign: "center",
  },
  descriptionInput: {
    height: 70,
    margin: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    width: 300,
  },
  submitButton: {
    backgroundColor: "#f57c00",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  dropDownContainer: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: 300,
    alignSelf: "center",
    marginVertical: 10,
    marginLeft: 7,
    zIndex: 1000,
    elevation: 5,
  },
  dropDownWrapper: {
    zIndex: 1000,
    elevation: 5,
  },
});
