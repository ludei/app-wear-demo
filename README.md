Ludei's wearable app demo
=========================

Ludei has ported canvas+ technology for android wearables so now
anyone can create apps using HTML5. Amazing, huh?

Want to see the code in action? Check the following
[video](http://vimeo.com/109717781)

The code in this repo has been used for the video footage.

### App Description ###

This demo has three different parts that pretend to emulate:

1. The local time and temperature.
2. Our heart rate.
3. The flight departures that we could have.

The user can slide from one to other section and tap twice if he wants to go to the previous.

This demo is rendered using html5 canvas and uses [CAAT](https://github.com/hyperandroid/CAAT) to create the UI.


### Screenshots ###


Local time and temperature

![example image](http://i59.tinypic.com/2z6rrrd.png "Weather section")

Heart rate

![example image](http://i59.tinypic.com/azi25g.png "Heart section")

Departures

![example image](http://i59.tinypic.com/2cqfej4.png "Departures section")

How to compile the demo for Android Wear using CocoonJS Cloud
---
Now it's easy to get your html5 apps running in android wearables thanks to Ludei. Please follow the next steps:

1. Log into the [dev portal](https://cloud.ludei.com/cloud/).
2. Create or select your project to compile for android wear. Select **Landscape Left** as Orientation.
3. Click on **compile project**.
4. Upload the zip with this demo (zip created with index.html file, Lib and static folders).
5. Select **Android wear**.
6. Select **Canvas+**.
7. Select Compiler version **2.1**.
8. Accept terms of services.
9. Click **Compile project** button to begin the compilation.

![example image](http://i59.tinypic.com/2w1woox.png "compile project")

After a while you will get the apk file to install in your android wear devices.
