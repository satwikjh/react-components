import Button from "./components/button";
import FormInput from "./components/formInput";

function App() {
  return (
    <>
      <FormInput name="name" />
      <FormInput label="Name" name="name" />
      <Button>Click</Button>
    </>
  );
}

export default App;
