
// export const createUser = async (pb) => {
// const users = [
//     {
//         "username": "user1",
//         "email": "user1@example.com",
//         "emailVisibility": true,
//         "password": "password123",
//         "passwordConfirm": "password123",
//         "name": "User One"
//     },
//     {
//         "username": "user2",
//         "email": "user2@example.com",
//         "emailVisibility": true,
//         "password": "password123",
//         "passwordConfirm": "password123",
//         "name": "User Two"
//     },
//     {
//         "username": "user3",
//         "email": "user3@example.com",
//         "emailVisibility": true,
//         "password": "password123",
//         "passwordConfirm": "password123",
//         "name": "User Three"
//     }
// ];

// for (const user of users) {
//     await pb.collection('users').create(user);
//     await pb.collection('users').requestVerification(user.email);
// }

// }

// export const setupData = async (pb) => {
//   try {
//     // Create Users Collection
//     await pb.collection('users').create({
//       email: 'user1@example.com',
//       password: 'password123',
//       name: 'User One',
//       role: 'admin'
//     });

//     await pb.collection('users').create({
//       email: 'user2@example.com',
//       password: 'password123',
//       name: 'User Two',
//       role: 'user'
//     });

//     // Create Tasks Collection
//     await pb.collection('tasks').create({
//       title: 'Task 1',
//       description: 'This is the first task.',
//       assignedTo: ['user1@example.com'], // Assuming the assignedTo field is a relation to users
//       status: 'To Do',
//       tags: 'urgent, important',
//       priority: 'High'
//     });

//     await pb.collection('tasks').create({
//       title: 'Task 2',
//       description: 'This is the second task.',
//       assignedTo: ['user2@example.com'],
//       status: 'In Progress',
//       tags: 'normal',
//       priority: 'Medium'
//     });

//     console.log('Dummy data has been successfully set up.');
//   } catch (error) {
//     console.error('Error setting up dummy data:', error);
//   }
// };

// export const createDummyTask = async (pb) => {
//   const tasks = [
//     {
//         "title": "Task 1",
//         "description": "Complete the project documentation.",
//         "assignedTo": ["user1@example.com"],
//         "status": "To Do",
//         "tags": ["Documentation", "Project"],
//         "priority": "High"
//     },
//     {
//         "title": "Task 2",
//         "description": "Fix the bug in the user authentication module.",
//         "assignedTo": ["user2@example.com"],
//         "status": "In Progress",
//         "tags": ["Bug", "Authentication"],
//         "priority": "Medium"
//     },
//     {
//         "title": "Task 3",
//         "description": "Review and merge the pull requests.",
//         "assignedTo": ["user3@example.com"],
//         "status": "To Do",
//         "tags": ["Code Review", "Development"],
//         "priority": "Low"
//     },
//     {
//         "title": "Task 4",
//         "description": "Update the website's front-end.",
//         "assignedTo": ["user1@example.com", "user3@example.com"],
//         "status": "In Progress",
//         "tags": ["Front-End", "Website"],
//         "priority": "High"
//     },
//     {
//         "title": "Task 5",
//         "description": "Prepare for the upcoming team meeting.",
//         "assignedTo": ["user2@example.com"],
//         "status": "Done",
//         "tags": ["Meeting", "Preparation"],
//         "priority": "Medium"
//     },
//     {
//         "title": "Task 6",
//         "description": "Implement the new API endpoints.",
//         "assignedTo": ["user1@example.com"],
//         "status": "To Do",
//         "tags": ["API", "Backend"],
//         "priority": "High"
//     },
//     {
//         "title": "Task 7",
//         "description": "Test the new features in the staging environment.",
//         "assignedTo": ["user2@example.com", "user3@example.com"],
//         "status": "In Progress",
//         "tags": ["Testing", "Staging"],
//         "priority": "High"
//     },
//     {
//         "title": "Task 8",
//         "description": "Update the project roadmap.",
//         "assignedTo": ["user3@example.com"],
//         "status": "To Do",
//         "tags": ["Roadmap", "Planning"],
//         "priority": "Medium"
//     },
//     {
//         "title": "Task 9",
//         "description": "Refactor the code for better performance.",
//         "assignedTo": ["user1@example.com"],
//         "status": "To Do",
//         "tags": ["Refactoring", "Performance"],
//         "priority": "High"
//     },
//     {
//         "title": "Task 10",
//         "description": "Conduct a team retrospective.",
//         "assignedTo": ["user2@example.com", "user3@example.com"],
//         "status": "Done",
//         "tags": ["Retrospective", "Team"],
//         "priority": "Low"
//     }
// ];

// for (const task of tasks) {
//     await pb.collection('tasks').create(task);
// }
// }