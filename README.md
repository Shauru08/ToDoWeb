<<<<<<< Updated upstream
# ToDoWeb
=======
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


To create this project i have installed the following libraries:
npm install @react-native-community/datetimepicker
npm install react-datepicker
npm install date-fns
npm install @react-native-picker/picker --save
npm install --save react-native-material-dropdown-v2-fixed
npm install react-native-simple-dropdown-select







Status: 
1-NotStarted
2-InProgress
3-OnHold
4-Completed

INSERT INTO task_status (id, title, description) VALUES 
(1, 'NotStarted', 'Task that has not been started yet'),
(2, 'InProgress', 'Task that is being worked on'),
(3, 'OnHold', 'Task that is still not finished but is not being worked on currently'),
(4, 'Completed', 'Task that has been finished')
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);


Priority:
ABCDE method
Assign each task a letter value, with A being the highest priority and E being the lowest. 
1-A
2-B
3-C
4-D
5-E

INSERT INTO priority (id, description, level) VALUES
(1, 'Tasks that are urgent and must be completed immediately. These are critical to success.', 'A'),
(2, 'Tasks that are important but not as time-sensitive as A-level tasks. These should be prioritized after A-level tasks.', 'B'),
(3, 'Tasks that are necessary but less critical than A and B. These can be scheduled for later.', 'C'),
(4, 'Tasks that are low priority and can be postponed without significant consequences.', 'D'),
(5, 'Tasks that have little or no impact on success and can be done if there is extra time.', 'E');

Category:

INSERT INTO category (id, name, description) VALUES
(1, 'Work', 'Tasks related to professional or career-related responsibilities.'),
(2, 'Personal', 'Tasks related to personal projects, hobbies, or individual goals.'),
(3, 'Health', 'Tasks focused on fitness, wellness, or medical needs.'),
(4, 'Education', 'Tasks related to learning, studying, or educational goals.'),
(5, 'Home', 'Tasks related to household chores, maintenance, or family responsibilities.'),
(6, 'Finance', 'Tasks related to budgeting, financial planning, or payments.'),
(7, 'Social', 'Tasks related to social engagements or community activities.'),
(8, 'Travel', 'Tasks related to planning, organizing, or executing trips or vacations.');
>>>>>>> Stashed changes
