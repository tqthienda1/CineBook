# CineBook

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white)

## 📝 Description

CineBook is a modern web application built with React, designed to provide a seamless and engaging movie browsing experience. This project leverages a robust database to store and manage movie information, ensuring users have access to a vast library of films. Secure authentication protocols are implemented to protect user data and personalize the viewing experience. Thorough testing methodologies have been applied throughout the development process to guarantee application stability and reliability. CineBook offers a user-friendly web interface for discovering new movies, managing watchlists, and engaging with other film enthusiasts.

## ✨ Features

- 🗄️ Database
- 🔐 Auth
- 🧪 Testing
- 🕸️ Web


## 🛠️ Tech Stack

- ⚛️ React


## 📦 Key Dependencies

```
@testing-library/dom: ^10.4.0
@testing-library/jest-dom: ^6.6.3
@testing-library/react: ^16.3.0
@testing-library/user-event: ^13.5.0
clsx: ^2.1.1
date-fns: ^4.1.0
jwt-decode: ^4.0.0
lucide-react: ^0.539.0
normalize.css: ^8.0.1
react: ^19.1.0
react-dom: ^19.1.0
react-icons: ^5.5.0
react-modal: ^3.16.3
react-router-dom: ^7.7.0
react-scripts: ^5.0.1
```

## 🚀 Run Commands

- **start**: `npm run start`
- **build**: `npm run build`
- **test**: `npm run test`
- **eject**: `npm run eject`
- **test**: `make test`


## 📁 Project Structure

```
.
├── package.json
├── public
│   ├── facebook_icon.svg
│   ├── google_icon.svg
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── server
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── userController.js
│   ├── db.js
│   ├── img
│   │   ├── HomePage
│   │   │   ├── background
│   │   │   │   ├── DemonSlayer.jpg
│   │   │   │   ├── Jurassic.jpg
│   │   │   │   └── Lilo&Stitch.jpg
│   │   │   └── poster
│   │   │       ├── 28years.jpg
│   │   │       ├── Dragon.jpg
│   │   │       ├── elio.jpg
│   │   │       └── f1.jpg
│   │   ├── about us
│   │   │   ├── Hai ba trung.png
│   │   │   ├── bg.jpg
│   │   │   └── quoc thanh.png
│   │   ├── detail
│   │   │   ├── backdrop.jpg
│   │   │   └── f1_poster.jpg
│   │   └── promotion
│   │       ├── HAPPY HOUR.png
│   │       ├── banner 1.png
│   │       ├── banner 2.jpg
│   │       ├── happy day.png
│   │       └── u22_2.png
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models
│   │   ├── Movie.js
│   │   └── User.js
│   ├── package.json
│   ├── routes
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── server.js
│   └── todo_app.rest
└── src
    ├── App.js
    ├── App.test.js
    ├── assets
    │   ├── DemonSlayer.jpg
    │   ├── HAPPY HOUR.png
    │   ├── banner 1.png
    │   ├── banner 2.jpg
    │   ├── cinema-interior-red-seats.png
    │   ├── f1_poster.jpg
    │   ├── f1_poster_02.jpg
    │   ├── f1_thumbnail.jpg
    │   ├── happy day.png
    │   ├── jurassic_backdrop.jpg
    │   ├── lilostitch.jpg
    │   ├── login_background.jpg
    │   ├── logo.png
    │   ├── modern-cinema-lobby.png
    │   └── u22_2.png
    ├── auth
    │   └── AuthContext.js
    ├── components
    │   ├── AvatarCard
    │   │   ├── AvatarCard.module.scss
    │   │   └── index.js
    │   ├── Banner
    │   │   ├── Banner.module.scss
    │   │   └── index.js
    │   ├── BannerBar
    │   │   ├── BannerBar.module.scss
    │   │   └── index.js
    │   ├── BlurOverlay
    │   │   ├── BlurOverlay.module.scss
    │   │   └── index.js
    │   ├── Button
    │   │   ├── Button.module.scss
    │   │   └── index.js
    │   ├── CategoryTab
    │   │   ├── CategoryTab.module.scss
    │   │   └── index.js
    │   ├── Cinema
    │   │   ├── Cinema.module.scss
    │   │   └── index.js
    │   ├── DateBox
    │   │   ├── DateBox.module.scss
    │   │   └── index.js
    │   ├── DateSlider
    │   │   ├── DateSlider.module.scss
    │   │   └── index.js
    │   ├── Dropdown
    │   │   ├── Dropdown.module.scss
    │   │   └── index.js
    │   ├── EmailInput
    │   │   ├── EmailInput.module.scss
    │   │   └── index.js
    │   ├── FilterPurchaseHistory
    │   │   ├── FilterPurchaseHistory.module.scss
    │   │   └── index.js
    │   ├── ForgetPassword
    │   │   ├── ForgetPassword.module.scss
    │   │   └── index.js
    │   ├── GeneralInformationForm
    │   │   ├── GeneralInformationForm.module.scss
    │   │   └── index.js
    │   ├── GlobalStyles
    │   │   ├── GlobalStyles.scss
    │   │   └── index.js
    │   ├── Layout
    │   │   ├── AdminLayout
    │   │   │   ├── AdminLayout.module.scss
    │   │   │   └── index.js
    │   │   ├── DefaultLayout
    │   │   │   ├── DefaultLayout.module.scss
    │   │   │   ├── Footer
    │   │   │   │   ├── Footer.module.scss
    │   │   │   │   └── index.js
    │   │   │   ├── Header
    │   │   │   │   ├── Header.module.scss
    │   │   │   │   └── index.js
    │   │   │   └── index.js
    │   │   └── HeaderOnlyLayout
    │   │       ├── HeaderOnlyLayout.module.scss
    │   │       └── index.js
    │   ├── LoginButton
    │   │   ├── LoginButton.module.scss
    │   │   └── index.js
    │   ├── LoginForm
    │   │   ├── LoginForm.module.scss
    │   │   └── index.js
    │   ├── MovieCard
    │   │   ├── MovieCard.module.scss
    │   │   └── index.js
    │   ├── MovieDetail
    │   │   ├── MovieDetail.module.scss
    │   │   └── index.js
    │   ├── PasswordInput
    │   │   ├── PasswordInput.module.scss
    │   │   └── index.js
    │   ├── PopUp
    │   │   ├── PopUp.module.scss
    │   │   └── index.js
    │   ├── PromotionCard
    │   │   ├── PromotionCard.module.scss
    │   │   └── index.js
    │   ├── PromotionPoster
    │   │   ├── PromotionPoster.module.scss
    │   │   └── index.js
    │   ├── PurchaseHistory
    │   │   ├── PurchaseHistory.module.scss
    │   │   └── index.js
    │   ├── RegisterButton
    │   │   ├── RegisterButton.module.scss
    │   │   └── index.js
    │   ├── RegisterForm
    │   │   ├── RegisterForm.module.scss
    │   │   └── index.js
    │   ├── RememberCheckbox
    │   │   ├── RememberCheckbox.module.scss
    │   │   └── index.js
    │   ├── SearchBar
    │   │   ├── SearchBar.module.scss
    │   │   └── index.js
    │   ├── SeparateLine
    │   │   ├── SeparateLine.module.scss
    │   │   └── index.js
    │   ├── Shelf
    │   │   ├── Shelf.module.scss
    │   │   └── index.js
    │   ├── Showtime
    │   │   ├── Showtime.module.scss
    │   │   └── index.js
    │   ├── ShowtimeSection
    │   │   ├── ShowtimeSection.module.scss
    │   │   └── index.js
    │   ├── Slider
    │   │   ├── Slider.module.scss
    │   │   └── index.js
    │   ├── SocialLogin
    │   │   ├── SocialLogin.module.scss
    │   │   └── index.js
    │   ├── Tab
    │   │   ├── Tab.module.scss
    │   │   └── index.js
    │   ├── Tabs
    │   │   ├── Tabs.module.scss
    │   │   └── index.js
    │   ├── Transaction
    │   │   ├── Transaction.module.scss
    │   │   └── index.js
    │   ├── VerticalLine
    │   │   ├── VerticalLine.module.scss
    │   │   └── index.js
    │   └── ViewAllButton
    │       ├── ViewAllButton.module.scss
    │       └── index.js
    ├── index.js
    ├── pages
    │   ├── AboutUs
    │   │   ├── AboutUs.module.scss
    │   │   └── index.js
    │   ├── AdminDashboard
    │   │   ├── AdminDashboard.module.scss
    │   │   └── index.js
    │   ├── Booking
    │   │   ├── Booking.module.scss
    │   │   └── index.js
    │   ├── Home
    │   │   ├── Home.module.scss
    │   │   └── index.js
    │   ├── Login
    │   │   ├── Login.module.scss
    │   │   └── index.js
    │   ├── Movies
    │   │   ├── Movies.module.scss
    │   │   └── index.js
    │   ├── Promotion
    │   │   ├── Promotion.module.scss
    │   │   └── index.js
    │   ├── Register
    │   │   ├── Register.module.scss
    │   │   └── index.js
    │   └── UserProfile
    │       ├── UserProfile.module.scss
    │       └── index.js
    ├── reportWebVitals.js
    ├── routes
    │   ├── AdminRoute.js
    │   ├── UserRoute.js
    │   └── index.js
    └── setupTests.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/tqthienda1/CineBook.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---
*This README was generated with ❤️ by ReadmeBuddy*