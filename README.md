API for my clicker game.

Express app for little overhead and easy customization. A pretty straightforward API with only a couple end points for handling user login, updating user progress and game logic.

crypto-js and jsonwebtoken for encryption of user password, handling auth, and maintaining user login.

mongodb and mongoose to store user data, track progress

Abandoning this version as after looking into it some more, it turns out using sessions is more secure than JWT (so I would rather learn how to implement that) and also using a web socket is probably a better idea for a game where I would like to track user data in real time.

Maintaining this in my github to hold on to the code for examples in the future.
