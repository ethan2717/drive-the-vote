# election-turnout-civic-tech

## Inspiration
This project was inspired by the issue of low voter turnout. Many potential voters lack convenient transportation to get to a polling place. In fact, one 2016 [Harvard study](https://dataverse.harvard.edu/file.xhtml?persistentId=doi%3A10.7910%2FDVN%2FY38VIQ%2F2NJDL9&version=1.0) found that 14% of nonvoters said transportation was a "major factor" in why they did not vote in that election. This issue is of particular significance for low-income Americans, who are disproportionately Black, Latinx, Indigenous, immigrants, or LGBTQ; those in rural and suburban areas; and those who are elderly or disabled. Paired with oppressive restrictions on mail-in voting and the strategic shuttering of polling places in certain neighborhoods, this problem of lack of transportation creates the perfect storm of keeping some of the most vulnerable members of society from the ballot box.

## What it does
Our project connects a need to a solution. The need is transportation to the polls. Our solution is a web service that allows voters who need a ride to a polling place to view nearby volunteer drivers and request a ride **completely free of charge**. Additional functionality includes a form to allow volunteers to sign up to drive, an option to donate money, and a link to register to vote if the user had not done so previously.

## How we built it
We used `HTML`, `CSS`, `Bootstrap`, and `Javascript` to create the frontend and website UI/UX. For the interactive rideshare map, we utilized `Leaflet` and included custom markers linked between the volunteer drivers and the voting poll locations. The simulated drivers use pathfinding in order to realistically navigate the city of Boston. 

## Challenges we ran into
Our goal in the Civic Tech Hackathon was to stretch our learning through the experimentation of new technologies. This was our first time working with the Twilio API with SMS messaging to notify individuals when they sign up to be a volunteer driver for polls. We ran into issues trying to link the Twilio API to our frontend where our Formspree API recognized that the sign up was submitted, but Twilio did not. We later figured out that our submit button was not linked directly to the TWilio API, so that's the notification did not send. Also, it was some of our first times working with Leaflet to create our interactive driver and poll location map. At first, we struggled to link the live car tracker to the following endpoints: driver location and poll location. After some time, we figured out how to integrate the live car tracker and linked it between the two endpoints through Leaflet's geolocation features.


## Accomplishments that we're proud of

We're especially proud of the fact that we were able to get all components of our project in a functional form before the deadline - after all the above challenges described, being able to have a website that incorporates the work of all the various new APIs, with each component functioning as intended is our best achievement. Having separated the tasks into different groups, we were able to combine our work effectively into this project.

## What we learned

How to use new APIs, as well as deepened our understanding of HTML/CSS, Javascript. In order to implment SMS functionality to send a registration link, we used twillio to programmatically send a text message. The rideshare mapping platform uses advanced technologies such as pathfinding, leaflet.js, and ballot datasets from boston.gov.

## What's next for Drive the Vote
The next step for Drive the Vote is expanding to other geographic regions beyond the Boston area. The need for transportation to vote is not a problem just confined to Boston so introducing service to as many areas as possible would increase the benefit to local communities. One feature we would be interested in implementing in the future would be to connect with an AI chatbot and include prompts that would allow the user to learn more about what would appear on their ballot. For example, a voter might not be familiar with what the state controller does or major donors who support a particular proposition. We could also direct the user to local news coverage of relevant political issues.
