// // Import the PocketBase library
// import PocketBase from 'pocketbase';

// // Initialize PocketBase client
// const pb = new PocketBase('http://127.0.0.1:8090');

// // Define the tasks
// const tasks = [
//   {
//     "title": "Implement User Authentication",
//     "description": "Develop a secure user authentication system using JWT tokens. The system should include login, registration, and password reset functionalities. Ensure the use of encryption for sensitive data and implement role-based access control for different user types.",
//     "assignedTo": ["John Doe", "Jane Smith"],
//     "tags": ["Authentication", "Security", "Backend"],
//     "status": "In Progress",
//     "priority": "High"
//   },
//   {
//     "title": "Design Marketing Campaign for New Product Launch",
//     "description": "Create a comprehensive marketing campaign for the upcoming product launch. The campaign should include social media ads, email marketing, and influencer partnerships. The goal is to increase brand awareness and drive sales. Collaborate with the design team to create visuals and the content team for copywriting.",
//     "assignedTo": ["Alice Johnson", "Mark Brown"],
//     "tags": ["Marketing", "Campaign", "Product Launch"],
//     "status": "To Do",
//     "priority": "Medium"
//   },
//   {
//     "title": "Optimize Database Queries",
//     "description": "Analyze and optimize the current database queries to improve performance. Focus on reducing load times for high-traffic pages and implement indexing where necessary. Ensure that the changes do not affect data integrity or the existing functionality of the application.",
//     "assignedTo": ["David Wilson"],
//     "tags": ["Database", "Optimization", "Performance"],
//     "status": "Done",
//     "priority": "High"
//   },
//   {
//     "title": "Revamp Company Website UI",
//     "description": "Redesign the company website's user interface to improve user experience and modernize the look and feel. Focus on mobile responsiveness, accessibility, and intuitive navigation. Collaborate with the UX team to gather feedback and iterate on designs.",
//     "assignedTo": ["Emily Davis", "Chris Green"],
//     "tags": ["UI Design", "Website", "Frontend"],
//     "status": "In Progress",
//     "priority": "Low"
//   },
//   {
//     "title": "Implement CI/CD Pipeline",
//     "description": "Set up a continuous integration and continuous deployment (CI/CD) pipeline to automate the testing and deployment of the application. Use Jenkins or GitHub Actions for automation, and ensure the pipeline includes unit tests, integration tests, and deployment to staging and production environments.",
//     "assignedTo": ["Michael Scott", "Pam Beesly"],
//     "tags": ["DevOps", "CI/CD", "Automation"],
//     "status": "To Do",
//     "priority": "High"
//   }
// ];

// // Function to add tasks to PocketBase
// export default async function addTasks() {
//   for (const task of tasks) {
//     try {
//       const record = await pb.collection('tasks').create(task);
//       console.log(`Task "${task.title}" added with ID: ${record.id}`);
//     } catch (error) {
//       console.error(`Failed to add task "${task.title}":`, error);
//     }
//   }
// }

// // Execute the function to add tasks
// addTasks();
