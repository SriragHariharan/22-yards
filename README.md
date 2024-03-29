# 22 Yards #
### A multi-vendor e-commerce application designed and developed using MERN stack 🛍️🌐 ###

Welcome to **22 yards** our multi-vendor eCommerce application that's solely dedicated for cricketing goods! This platform replicates real-world shopping experiences in a digital environment 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒, and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

* Login and Registration pages 🖥️
* Home page 🏠
* Catalog Product page 📋
* Detailed Product page 🔎
* User Profile page 👤
* Basket page 🛒
* Contact Us page 🙋‍♂️🙋‍♀️
* Payments Page 💳
* Seller dashboards 📦
* Sales reports on seller side 📊

## Technology Stack 💻📚 ##

1. Frontend : React.js ⚛️ & Bootstrap 🅱️
2. Backend  : Node.js 🟨 & Express.js 🗄️
3. Database : MongoDB 🍃
4. State Management : Redux 🔁
5. Payment Gateway : Razorpay 💷

## Run the project 💻❤️ ##

The project follows an MVC architecture with both frontend and backend being seperated into two different files. to run, Open the file in VSCode and follow the below commands

### Running frontend part 🖥️ 📱 ###

Before running the project, Create a **.env** file in the root of frontend file and copy below code with credentials :
```
VITE_SERVER = 'http://localhost:4000/api/'
VITE_SERVER_IMG = 'http://localhost:4000/'
VITE_RZP_SECRET_KEY = //razorpay secret key from razorpay.com/dashboard
``` 
After that Open the terminal and type :
```
cd frontend
npm run dev
```

### Running backend part 🗄️ 🌐 ###

Before running the project, Create a **.env** file in the root of backend file and copy below code with credentials :
```
JWT_SECRET 	= // a long random String as jwt secret
RZP_KEY_ID 	= // Razorpay key id from razorpay dashboard
RZP_KEY_SECRET 	= // Razorpay key secret from razorpay dashboard
RZP_SECRET 	= // Razorpay secret from razorpay dashboard

DATABASE_URL 	= 'mongodb://localhost:27017/22Yards'
PORT 		= 4000

NODEMAILER_EMAIL 	= //an email to which nodemailer sends email
NODEMAILER_PASSWORD 	= //password generated by google for mail requests
``` 

After that Open the terminal and type :

```
cd frontend
npm run dev
```

Note 📃 👨🏽‍💻 :
Any doubts🤔 ? Please feel free to connect me 📧 @ `sriraghariharan108@gmail.com`
