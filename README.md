#Birdseed - Twitter Quote Generator Built with Meteor

##Technologies Used

- Meteor
- Fabric JS
- Twitter API
- Font Awesome
- Bootstrap

```
meteor 
```

Meteor Packages Used

```
meteor add twbs:bootstrap
meteor add ian:accounts-ui-bootstrap-3
meteor add accounts-password
meteor add accounts-twitter
meteor add fort awesome:fontawesome
meteor add aslagle:reactive-table
meteor add ryanswapp:fabricjs
meteor add matb33:collection-hooks
meteor add mrt:flash-messages
meteor add meteorhacks:npm
meteor add mrt:twit
```

##General Approach to Development

###My first Meteor app

Used Meteor's Example "To Do" App and the ""Discover Meteor Book" as references

...and of course Google

###Created simple user stories

Users can...

* Login to the app using Twitter
* Select a quote from a list
* Search for a quote by content, author, or category
* Add the quote to a background image
* Share the quote on Twitter with one click

##Installation Instructions

- Clone the repo
- CD into the directory

```
cd birdseed
``` 
- Get your Twitter API keys
- Create a settings.json file in the ```root``` directory with your Twitter keys

```
{
	"twitter": {
    "consumer_key": "YOUR CONSUMER KEY",
    "consumer_secret": "YOUR SECRET"
    }
}

```
Run

```
meteor --settings settings.json
```

##Version

0.1.6

##To Do

- Add form for creating custom qutoes


##Deploy link

[http://www.birdseedapp.com](http://www.birdseedapp.com)

