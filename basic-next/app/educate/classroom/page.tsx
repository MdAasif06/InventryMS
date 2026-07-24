import Button from "@/components/Button";
import FilterUsers from "@/components/FilterUser";

export default async function classroom() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return (
    <main>
      <h1>Hello from the classroom</h1>
      <p>This is the classroom page of the application</p>
      <FilterUsers users={users}/>
      <Button />
    </main>
  );
}
