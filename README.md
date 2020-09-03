![](https://img.shields.io/badge/Microverse-blueviolet)

# React Calculator

> Accesibility focused basic React calculator bootstrapped with create-react-app

![screenshot](./app_screenshot.png)

- Calculator App with strong focus on accessibility build with React.js. Practicing React Component classes, states and props and AWS Polly.
- This project is far from perfect. I decided to practice some basic ideas about accesibility by usig full controll via keyboard / mouse.
- This project is also a practice implementation for the AWS service [Amazon Polly](https://aws.amazon.com/polly/)


## How to use it.

### Normal operation

- You can use the calculator by clicking on the buttons or touch screen device as a normal calculator.
- You can key the numbers and operations using the keyboard.

### Activate Text to Speech functionality:
- Touck/Click: Speech function is activated clicking/touching the button `Speech`. 
- Keyboard: Typing the key 's'. 
- On activation you will hear a voice with an activation message en english (default language).
- A Icon  ![](./src/assets/icons/speech.svg) will appear on display to indicate the Text to Speech activation. 

### Change text to speech language 
- Touch/Click: on buttons `En` or `Sp` for language toggling.
- On Toggling you will here a voice on the selected language. The proper Icons will appear on Display.



## Built With

- React.js, Webpack, Babel
- HTML5/CSS3, Javascript ES6
- ESlint, Stylelint
- VSCode
- AWS Polly


## Live Demo @Heroku

[Live Demo Link](https://anriquez-react-calcu.herokuapp.com)


## Getting Started


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


To get a local copy up and running follow these simple example steps.

### Prerequisites

### Amazon Polly Setup

- Create a ```.env``` file in the root of the project and include your own AWS Amazon Polly credentials. YOu can use as reference the file included in the repo ```.env.example```

```
REACT_APP_AWS_ACCESS_KEY_ID = ''
REACT_APP_AWS_SECRET_ACCESS_KEY = ''
```

## Install

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Authors

👤 ***Carlos Anriquez***

- Github: [@canriquez](https://github.com/canriquez)
- Twitter: [@cranriquez](https://twitter.com/cranriquez)
- Linkedin: [linkedin](https://www.linkedin.com/in/carlosanriquez/)
- Portfolio: [carlosanriquez.com](https://www.carlosanriquez.com)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

## 📝 License

This project is [MIT](lic.url) licensed.
