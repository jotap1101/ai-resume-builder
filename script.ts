// import { prisma } from "./src/lib/prisma";

// async function main() {
//   const resume = await prisma.resume.create({
//     data: {
//       userId: "user_123",
//       title: "Software Engineer Resume",
//       description: "Seeded resume",
//       firstName: "João",
//       lastName: "Silva",
//       jobTitle: "Software Engineer",
//       city: "Lisbon",
//       country: "Portugal",
//       phone: "+351912345678",
//       email: "joao@example.com",
//       summary:
//         "Experienced software engineer specializing in TypeScript and Node.js.",
//       colorHex: "#1F2937",
//       borderStyle: "squircle",
//       skills: ["TypeScript", "Node.js", "React", "Prisma"],
//       workExperiences: {
//         create: [
//           {
//             position: "Senior Software Engineer",
//             company: "Acme Corp",
//             startDate: new Date("2020-01-01"),
//             endDate: null,
//             description: "Worked on building scalable web services",
//           },
//           {
//             position: "Software Engineer",
//             company: "Beta Inc",
//             startDate: new Date("2017-06-01"),
//             endDate: new Date("2019-12-31"),
//             description: "Built frontend applications with React",
//           },
//         ],
//       },
//       educations: {
//         create: [
//           {
//             degree: "BSc Computer Science",
//             school: "University of Somewhere",
//             startDate: new Date("2013-09-01"),
//             endDate: new Date("2017-06-30"),
//           },
//         ],
//       },
//     },
//     include: {
//       workExperiences: true,
//       educations: true,
//     },
//   });

//   console.log("Resume created:", JSON.stringify(resume, null, 2));

//   const subscription = await prisma.userSubscription.create({
//     data: {
//       userId: "user_123",
//       stripeCustomerId: "cus_example_123",
//       stripeSubscriptionId: "sub_example_123",
//       stripePriceId: "price_example_123",
//       stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
//       stripeCancelAtPeriodEnd: false,
//     },
//   });

//   console.log(
//     "UserSubscription created:",
//     JSON.stringify(subscription, null, 2),
//   );

//   const allResumes = await prisma.resume.findMany({
//     include: {
//       workExperiences: true,
//       educations: true,
//     },
//   });

//   console.log("All resumes:", JSON.stringify(allResumes, null, 2));
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
