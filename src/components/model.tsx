// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import EditText from "./edit-text";

// // Assuming you have components for icons and a select/tags input.
// // This is a placeholder for the actual icons.
// const BacklogIcon = () => <svg /* ... */ />;
// const PriorityIcon = () => <svg /* ... */ />;
// const AssigneeIcon = () => <svg /* ... */ />;
// const ProjectIcon = () => <svg /* ... */ />;
// const AttachmentIcon = () => <svg /* ... */ />;
// const ExpandIcon = () => <svg /* ... */ />;
// const CloseIcon = () => <svg /* ... */ />;
// const LinkIcon = () => <svg /* ... */ />;

// export function ModelDialog() {
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">Show Issue Form</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent
//         className="fixed top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-0 w-[800px] max-w-[800px] h-[350px] max-h-[90vh] flex flex-col p-0 bg-white rounded-lg shadow-2xl overflow-hidden"
//         style={{ maxWidth: "none" }}
//       >
//         {/* Header Section */}
//         <AlertDialogHeader className="p-4 border-b flex-row justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <span className="bg-gray-100 text-gray-700 font-medium text-sm px-2 py-1 rounded-full">
//               <span className="mr-1">STU</span> New issue
//             </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="icon">
//               <ExpandIcon className="w-4 h-4" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <CloseIcon className="w-4 h-4" />
//             </Button>
//           </div>
//         </AlertDialogHeader>

//         {/* Content Section */}
//         <div className="flex-1 overflow-auto p-6">
//         <EditText/>
         
     
          
//         </div>

//         {/* Footer Section */}
//         <AlertDialogFooter className="p-4 border-t flex-row items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="icon">
//               <LinkIcon className="w-4 h-4" />
//             </Button>
//             {/* The Google icon is a placeholder */}
     
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <Label htmlFor="create-more" className="text-sm">Create more</Label>
//               <Switch id="create-more" />
//             </div>
//             <AlertDialogCancel asChild>
//               <Button variant="ghost" className="px-4">
//                 Cancel
//               </Button>
//             </AlertDialogCancel>
//             <AlertDialogAction asChild>
//               <Button className="bg-blue-600 text-white hover:bg-blue-700 px-4">
//                 Create issue
//               </Button>
//             </AlertDialogAction>
//           </div>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
