import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Fallback for iOS
import { format } from "date-fns";

interface DatePickerFieldProps {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
}

export default function DatePickerField({
  label,
  date,
  setDate,
}: DatePickerFieldProps) {
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    //Im using this funtion in order to dodge an error around the spinner, in which the datePicker would close itself without letting the user select the date
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
  };

  if (Platform.OS === "ios") {
    // Currently only working on the IOS platform 27/01
    return (
      <>
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.input}
            placeholder={label}
            value={format(date, "dd/MM/yyyy")}
            onPressIn={toggleDatePicker}
            editable={false}
          />
        </Pressable>
        {showPicker && (
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerBackground}>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
                style={styles.datePicker}
              />
            </View>
          </View>
        )}

        {showPicker && (
          <View style={styles.buttonsView}>
            <TouchableOpacity onPress={toggleDatePicker}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDatePicker}>
              <Text style={styles.confirmButton}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  datePickerContainer: {
    alignItems: "center", // Center the date picker horizontally
    justifyContent: "center", // Center it vertically (if needed)
  },
  datePickerBackground: {
    backgroundColor: "#808900", // Light yellow background
    padding: 0, // Add padding for spacing
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Optional border
    borderColor: "#E5C07B", // Border color to match the theme
    alignItems: "center", // Center the spinner within the container
  },
  datePicker: {
    //width: "100%", // Ensures the spinner takes up full container width
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
    alignItems: "center",
    textAlign: "center",
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10, // Adds vertical margin
  },
  cancelButton: {
    backgroundColor: "#B85C76",
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    width: 100,
    textAlign: "center",
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: "#5CB88A",
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    width: 100,
    textAlign: "center",
    marginHorizontal: 5,
  },
});
