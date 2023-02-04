# Unsmart Math Expression

Math expression parser

```ts
import { parse, calculate } from "...";

let expression = "2 + 2 / 4 * [2 - (1 + 1)]";
let parsed = parse(expression); 
// parsed = [2,"+",2,"/",4,"*",[2,"-",[1,"+",1]]]

let calculated = calculate(parsed); 
// calculated = 2
```
