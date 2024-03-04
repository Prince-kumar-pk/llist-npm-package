import * as React from 'react'
import { useState } from 'react'

const Usecounter = () => {
    const [count,setCount] = useState(0);

    const increment = ()=>{
        setCount(count + 1);
    };
    const decerement = ()=>{
        setCount(count - 1);
    };
  return {count, increment,decerement}
}

export default Usecounter