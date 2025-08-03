import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export function TableDemo() {
  const data=[
    {
      id: 1,
      title: "Issue 1",
      description: "Description of issue 1",
      status: "Open",
      priority: "High",
      createdAt: "2023-10-01",
    },
    {
      id: 2,
      title: "Issue 2",
      description: "Description of issue 2",
      status: "In Progress",
      priority: "Medium",
      createdAt: "2023-10-02",
    },
    {
      id: 3,
      title: "Issue 3",
      description: "Description of issue 3",
      status: "Closed",
      priority: "Low",
      createdAt: "2023-10-03",
    },
  ]
  return (
    <>
    {/* <div className="flex flex-col w-full">
      <span className="bg-gray-400 text-white p-1 w-full h-[30px]">Todo 4</span>
      <ul className="flex flex-col space-y-2 w-full m-2">
      {data.map((issue) => (
      <li key={issue.id} className="flex flex-col w-full">
      <span className="font-bold mr-0">{issue.title}</span>
      <ul className="flex flex-col space-y-1 pl-4">
        <li>Status: {issue.status}</li>
        <li>Priority: {issue.priority}</li>
        <li>Created At: {issue.createdAt}</li>
        <li>Description: {issue.description}</li>
      </ul>
      </li>
      ))}
      </ul>
    </div> */}
    <Table className="w-full">
      <TableCaption>A list of your recent issues.</TableCaption>
      <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Title</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Priority</TableHead>
        <TableHead>Created At</TableHead>
        <TableHead>Description</TableHead>
      </TableRow>
      </TableHeader>
      <TableBody>
      {data.map((issue) => (
        <TableRow key={issue.id}>
        <TableCell className="font-medium">{issue.title}</TableCell>
        <TableCell>{issue.status}</TableCell>
        <TableCell>{issue.priority}</TableCell>
        <TableCell>{issue.createdAt}</TableCell>
        <TableCell>{issue.description}</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
   
    </>
  )
}
