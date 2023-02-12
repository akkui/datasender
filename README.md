# Data Sender
Share data between files and different scripts languages.

## Installation Methods
``npm install datasender``

## How Setup
Just <b>require</b> the API in your code and start using the functions.
```
const datasender = require("datasender");
```

## Functions
### Export something for others files:
> ```
> datasender.exportCode("data_name", "content"); 
> ```
> The content can be anything, string, object, array, number, ...

### Manually detect data export:
> ```
> const data = datasender.importCode("data_name")
> ```
> All the content of <b>data_name</b> will be saved in the const named <b>data</b>.

### Automatically detect exports and run functions:
> ```
> timer = 5000;
> //timer is the number that will be used for check the data
> //for example, here is 5000MS (equals to 5 Seconds)
> //the data will be checked every 5 Seconds (and when detected, the loop will stop)
> datasender.listener("data_name", (data) => {
>   //do something here
>   //the content of the file will be saved in "data"
> }, timer)
> ```

### Manually delete a data export:
> ```
> datasender.deleteImport("data_name");
> ```

## Additional Settings
### Disable auto data delete when import they.
> ```
> datasender.setup(false);
> ```
> This code need be in the top of y'all codes.
