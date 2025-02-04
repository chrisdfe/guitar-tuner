// @ts-ignore-next-line
import { freelizer } from 'freelizer';


const test = async () => {
  console.log("test");
  try {
    const { start, subscribe } = await freelizer();
    start();
    subscribe(console.log);
  } catch (e) {
    console.log("didn't work");
    console.log(e);
  }
};

const TestButton = () => {
  return (
    <button onClick={() => { test(); }}>click</button>
  );
};

export default TestButton;