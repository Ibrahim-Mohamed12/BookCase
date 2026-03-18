# 📚 BookCase Project

## 📌 Overview

**BookCase** is a web-based platform that allows users to explore, read, and download books from various categories. The system also provides personalized features such as a favorites list and a secure authentication system. Additionally, it includes an **Admin Dashboard** for managing users and book content.

The project is built using **ASP.NET Core MVC** following a **3-Tier Architecture** to ensure scalability, maintainability, and clean separation of concerns.

---
##Team Members:

1)Ibrahim Mohamed Saad ()
2)Ezzeldin Omar (ezzeldinomar7@gmail.com)
---

## 🚀 Features

### 👤 User Features

* Browse books by different categories
* Read books online
* Download books
* Create an account (Sign Up)
* Login and authentication system
* Add/remove books to/from **Favorites List**
* View favorite books anytime

### 🛠️ Admin Features

* Admin Dashboard
* Manage users (view, update, delete)
* Add new books
* Update existing books
* Delete books
* Organize books into categories

---

## 🏗️ Architecture

The project follows a **3-Tier Architecture**:

### 1. Presentation Layer (PL)

* Built using **ASP.NET Core MVC**
* Handles UI and user interaction
* Uses **Razor Views**, **ViewModels**
* Styled with **Bootstrap** and **CSS**

### 2. Business Logic Layer (BLL)

* Contains application logic
* Handles validation, rules, and data processing
* Acts as a bridge between PL and DAL

### 3. Data Access Layer (DAL)

* Responsible for database operations
* Implements:

  * **Repository Pattern**
  * **Generic Repository**
* Ensures abstraction from database logic

---

## 🧩 Design Patterns & Concepts

* MVC (Model - View - Controller)
* 3-Tier Architecture (PL, BLL, DAL)
* Repository Pattern
* Generic Repository Pattern
* Separation of Concerns
* ViewModels for clean data transfer
* Maintainable and scalable code structure

---

## 🔐 Authentication & Authorization

* User Registration (Sign Up)
* User Login
* Session
* Role-based access (Admin / User)

---

## 🛠️ Technologies Used

* **ASP.NET Core MVC**
* **C#**
* **Entity Framework Core**
* **Bootstrap**
* **CSS**
* **SQL Server**

---

## ⚙️ Setup Instructions

1. Clone the repository
2. Open the project in Visual Studio
3. Configure the database connection string
4. Run migrations:

   ```
   Update-Database
   ```
5. Run the project

---

## 📄 License

This project is for educational purposes.
