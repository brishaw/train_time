# Train Time
A mobile-friendly train schedule application that incorporates Firebase and Moment.js to host arrival and departure data.

 ## How does it work?
1. Train Time incorporates the use of Google's Firebase Realtime Database. 
2. When a user enters the train information and clicks the "Add Train" button, the Current Train Schedule will update the provided fields; Train Name, Destination, Frequency, Next Arrival and Minutes Away.
3. The app uses Moment.js to determine the Next Arrival and Minutes Away based on information provided by the user inputs.
4. The Firebase Database, being in realtime, can be accessed and updated from any machine simultaneously.
5. If more than one user is adding train data at the same time, they will be able to view the new data as it is received and placed on the page. 

 ## Who will use this repo or project?
**Train Time** is an interactive tool, showcasing what can be done using Firebase, Moment.js and jQuery. While the information is fictitious, it can help provide new ideas as to how this technology can be used.

 ## What is the goal of this project?
To learn how to use Google's Firebase Realtime Database and Moment.js together, and create a useful tool that is interactive and inspiring.

## Bonus
Mobile friendly, styled with SASS, added a realtime clock
