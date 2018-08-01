# Zagreb places

Zagreb places is simple SPA aplication built for the purposes of the Udacity Frontend nanodegree course.
It searches through some of the most interesting places in Zagreb and displays them on the map using markers and infowindows which show
relevant content about the locations using the **Foursquare API**.
Its main parts are **Search** and **Map**.

## Search

Search containes input and list items. Initialy list contains all locations hardcoded inside the map. Input filters through that list and
shows matched locations both inside the list and on the map in form of map markers. Locations which don't match to the input string are hidden
both in the list and on the map.
Clicking on the list item will center the map on the clicked location marker, animate it and open its infowindow with the additional data inside of it.
Deleting the query will set back to visible all markers and list items.

## Map

Map is the main part of the aplication which handles showing the map, markers and infowindow with data about locations.
Clicking on the marker will center the map on its position, start its animation and open the infowindow containing the fetched
Foursquare data about it (name, address, rating and short working hours). Closing the infowindow will stop the markers animation.


## How to run the application

Clone or download this repository to your local station. Open the Terminal or some other Command Line Interface depending on the
software you are using and navigate to that folder. Install all needed dependencies for this application by using the command
`npm install`. To start this application on your local server hit the command `npm start`. This will going to open the local server using port 3000 and automatically open the new tab in you last active browser leading to *http://localhost:3000/*.
There you can see and use the application.

## How to make use of the service worker

This application is build using the *create-react-app* boilerplate and with it comes the proprietary service worker which works only in production environment.
To set the application to production environment run the command `npm run build`.
When the content is cached and/or ready to use you will get alert message notifying you about that.

## Responsive design

This app makes use of the responsive design to look great both on desktop and mobile devices no matter the device window widths.
On widths smaller than *700px* the search component will be hidden and left of the title in top left corner the hamburger menu will be shown.
Click on it to display the search back again and hide when you don't need it anymore.
The application is responsive down to the 300px width which is enough for almost every device in use today.