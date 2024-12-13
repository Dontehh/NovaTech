// import { supabase } from './supabase';
// import { format } from 'date-fns';

// const RESPONSES = {
//   GREETING: "Hello! I can help you with facility bookings, checking availability, and finding teams to join. What would you like to know?",
//   HELP: "I can help you with:\n- Checking facility availability\n- Finding open teams to join\n- Information about upcoming events\n- Facility operating hours and capacity",
//   NOT_UNDERSTOOD: "I'm not sure I understood that. Could you rephrase your question?",
//   HOURS: "All facilities are open from 11:00 AM to 11:00 PM daily.",
// };

// const getFacilityInfo = (facilityType: string) => {
//   const capacities = {
//     soccer: "32 players (22 players + 10 substitutes per team)",
//     proxy: "10 players (2 teams of 5)",
//     futsal: "10 players (2 teams of 5)",
//     basketball: "12 players (6 players per team)",
//     swimming: "8 swimmers",
//     padel: "4 players",
//   };
//   return capacities[facilityType as keyof typeof capacities] || "Capacity information not available";
// };

// export const getChatbotResponse = async (message: string): Promise<string> => {
//   const normalizedMessage = message.toLowerCase();

//   // Handle greetings
//   if (normalizedMessage.match(/^(hi|hello|hey|greetings)/)) {
//     return RESPONSES.GREETING;
//   }

//   // Handle help requests
//   if (normalizedMessage.includes('help') || normalizedMessage.includes('what can you do')) {
//     return RESPONSES.HELP;
//   }

//   // Handle operating hours queries
//   if (normalizedMessage.includes('hour') || normalizedMessage.includes('time') || normalizedMessage.includes('open')) {
//     return RESPONSES.HOURS;
//   }

//   // Handle facility availability queries
//   if (normalizedMessage.includes('available') || normalizedMessage.includes('free')) {
//     try {
//       const { data: facilities } = await supabase
//         .from('facilities')
//         .select('*')
//         .eq('available', true);

//         // Check for query error
//         if (Error) {
//           console.error('Error fetching facilities:', Error.message || Error);
//           console.error('Error details:', {
//             message: Error.message,
//             code: Error.code,
//             hint: Error.hint,
//           });
//           return "There was an error fetching the facilities. Please try again later.";
//         }

//     // Check if facilities is null or empty
//     if (!facilities || facilities.length === 0) {
//       return "I couldn't find any available facilities at the moment.";
//     }

//     // Map and return the facilities
//     return `Currently available facilities:\n${facilities
//       .map((f) => `- ${f.name} (Capacity: ${getFacilityInfo(f.type)})`)
//       .join('\n')}`;

//      // if (!facilities?.length) {
//      //   return "I couldn't find any available facilities at the moment.";
//      // }

//       // return `Currently available facilities:\n${facilities
//       //   .map((f) => `- ${f.name} (Capacity: ${getFacilityInfo(f.type)})`)
//       //   .join('\n')}`;

//     } catch (error) {
//       return "I'm having trouble checking facility availability right now.";
//     }
//   }

//   // Handle team queries
//   if (normalizedMessage.includes('team') || normalizedMessage.includes('join')) {
//     try {
//       const { data: teams } = await supabase
//         .from('teams')
//         .select('*, events(*)')
//         .eq('is_full', false);

//       if (!teams?.length) {
//         return "There are no teams looking for players at the moment.";
//       }

//       return `Teams looking for players:\n${teams
//         .map((t) => `- ${t.name} (${t.events?.name || 'No event'})`)
//         .join('\n')}`;
//     } catch (error) {
//       return "I'm having trouble checking team information right now.";
//     }
//   }

//   // Handle event queries
//   if (normalizedMessage.includes('event') || normalizedMessage.includes('tournament')) {
//     try {
//       const { data: events } = await supabase
//         .from('events')
//         .select('*')
//         .gt('date', new Date().toISOString())
//         .order('date');

//       if (!events?.length) {
//         return "There are no upcoming events scheduled at the moment.";
//       }

//       return `Upcoming events:\n${events
//         .map((e) => `- ${e.name} on ${format(new Date(e.date), 'MMM dd, yyyy')}`)
//         .join('\n')}`;
//     } catch (error) {
//       return "I'm having trouble checking event information right now.";
//     }
//   }

//   // Handle capacity queries
//   if (normalizedMessage.includes('capacity') || normalizedMessage.includes('how many')) {
//     const facilityTypes = ['soccer', 'proxy', 'futsal', 'basketball', 'swimming', 'padel'];
//     for (const type of facilityTypes) {
//       if (normalizedMessage.includes(type)) {
//         return `The capacity for ${type} is: ${getFacilityInfo(type)}`;
//       }
//     }
//     return "I can provide capacity information for all our facilities. Which one would you like to know about?";
//   }

//   return RESPONSES.NOT_UNDERSTOOD;
// };