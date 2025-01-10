Overview

The *Venue Management System (VMS)* is a comprehensive platform designed to help venues manage bookings, events, staff, and customers effectively. It provides tools for both administrators and users to schedule, track, and optimize events, enhancing both operational efficiency and customer experience. 

#Business Purpose:
The VMS allows venue owners and administrators to manage event bookings, payment processing, and communication with clients. It helps automate scheduling, prevent double bookings, and provides insights for better decision-making.

#Key Features:
- *User Sign-up and Authentication*: Secure and easy user registration and login.
- *Booking System*: Users can check availability, book events, and manage reservations.
- *Calendar Integration*: Automated event reminders and schedules.
- *Payment Processing*: Integration with payment gateways for smooth transactions.
- *User Roles and Permissions*: Differentiated access levels for admins, clients, and staff.
- *Reports & Analytics*: Comprehensive data on bookings, revenue, and venue performance.


#Technologies Used
- *Frontend*: Html,css,javascript
- 
---

#Installation Guide

#Prerequisites:
1. *Node.js* (version 14 or above)
2. *npm* (Node Package Manager)
3. *Database*: Set up your preferred database (PostgreSQL, MongoDB, MySQL)
4. *Payment Gateway Account*: Stripe or PayPal (depending on the payment integration used)
   
#Steps to Get Started:

1. Clone the repository:
    bash
    git clone https://github.com/cyizasabine/venue-mid_term
    cd venue-management-system
    

2. Install the required dependencies:
    bash
    npm install
    

3. Set up your environment variables by creating a .env file in the root directory:
    bash
    DB_URI=<your-database-uri>
    JWT_SECRET=<your-jwt-secret>
    STRIPE_API_KEY=<your-stripe-api-key>
    

4. Run the application:
    bash
    npm start
    

---

#User Sign-Up and Sign-In Process

##Sign-Up:

1. Visit the *Sign-Up Page*.
2. Enter the following details:
   - *Name*: Your full name.
   - *Email Address*: A valid email address.
   - *Password*: Choose a strong password.
   - *Role*: Select your role (e.g., Admin, Venue Owner, Client).
   
3. Click on *Sign-Up* to create your account.

4. You will receive a verification email. Click the verification link to confirm your email address.


##Sign-In:

1. After signing up, navigate to the *Sign-In Page*.
2. Enter your *Email Address* and *Password*.
3. Click *Sign-In* to access your dashboard.

4. If you forget your password, click on *Forgot Password* to reset it via email.


#User Roles

- *Admin*: Full access to the platform including user management, reports, and venue settings.
- *Venue Owner*: Can manage venue details, view bookings, and interact with clients.
- *Client*: Can browse available venues, make bookings, and manage event details.


#Business Use Case

##Venue Owners:
Venue owners can list their venues on the platform, set availability, manage bookings, and track their revenue. The system allows them to:
- Accept or reject booking requests.
- Track event details.
- Communicate with clients about event logistics.

#Clients:
Clients can browse available venues based on their event needs, book venues, and manage their event schedules. They can:
- Check venue availability in real time.
- Complete booking requests and make payments.
- View and manage their booked events.

## Conclusion

This *Venue Management System* aims to simplify the management of event spaces by providing an intuitive platform for both venue owners and customers. With easy-to-use features for managing bookings, payments, and schedules, the system enhances efficiency and streamlines operations for venue owners while offering a seamless experience for clients.
