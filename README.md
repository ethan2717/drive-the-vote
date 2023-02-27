<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Drive the Vote</h3>

  <p align="center">
    Connecting Voters to Polls with Civic Tech
    <br />
    <a href="https://github.com/msaini26/election-turnout-civic-tech/issues">Report Bug</a>
    ·
    <a href="https://github.com/msaini26/election-turnout-civic-tech/pulls">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
* [Photos](#photos)
* [Contributing](#contributing)
* [License](#license)


<!-- ABOUT THE PROJECT -->
## About The Project

![alt text](https://github.com/msaini26/election-turnout-civic-tech/blob/main/resources/static/images/repo/vote.PNG)

### Introduction
Low voter turnout has been a persistent issue in American politics. In recent years, many potential voters have been unable to cast their ballots due to a lack of convenient transportation to polling places. This problem is particularly acute for low-income Americans, those in rural or suburban areas, the elderly, disabled, and members of marginalized communities who face systemic barriers to political participation. To address this issue, a team of civic tech enthusiasts created Drive the Vote, a web based ride sharing service that connects voters who need a ride to a polling place with nearby volunteer drivers, free of charge.

### The Need for Drive the Vote
According to a 2016 Harvard study, transportation is a significant factor in voter turnout. 14% of nonvoters cited transportation as a major reason why they did not vote in that election. This problem is even more pronounced for marginalized communities, who face additional barriers to accessing transportation. To compound the issue, there have been widespread efforts to suppress voting rights by imposing oppressive restrictions on mail-in voting and closing polling places in certain neighborhoods. Drive the Vote aims to provide a solution to this problem by connecting voters to volunteer drivers who can provide them with free rides to polling places.

### How Drive the Vote Works
The Drive the Vote web service utilizes a user-friendly interface that allows voters who need a ride to a polling place to view nearby volunteer drivers and request a ride. The interactive rideshare map is powered by Leaflet, an open-source JavaScript library for mobile-friendly interactive maps. Custom markers on the map indicate the location of volunteer drivers and polling places. The system also includes a form that allows volunteers to sign up to drive, an option to donate money, and a link to register to vote for those who have not done so. A backend API to handle registration emails and chatGPT was developed in python.

### Challenges and Accomplishments
The Drive the Vote team encountered several challenges during the development of their project. One of the biggest obstacles was integrating the Twilio API with SMS messaging to notify individuals when they signed up to be volunteer drivers. They also had to learn how to use Leaflet to create the interactive driver and polling location map. Despite these challenges, the team was able to overcome them and complete the project before the deadline. They are especially proud of their ability to combine the work of various APIs into a functional website that achieved its intended purpose.

### What Drive the Vote Learned
The Drive the Vote team learned several new skills and technologies during the development of their project. They deepened their understanding of HTML/CSS and JavaScript, and they also learned how to use new APIs such as Twilio for SMS messaging, OpenAI API for GPT, and Leaflet for interactive mapping. They also learned about pathfinding and ballot datasets from boston.gov.

### Future Plans for Drive the Vote
The Drive the Vote team plans to expand their service to other geographic regions beyond the Boston area. They recognize that transportation to polling places is a problem across the country and are committed to expanding their service to benefit as many communities as possible. They are also interested in exploring new features to provide voters with information about their ballot and directing them to relevant news coverage of political issues.

### Conclusion
Drive the Vote is a powerful example of civic tech in action. By connecting voters to volunteer drivers who can provide them with free rides to polling places, Drive the Vote is helping to address the issue of low voter turnout, particularly among marginalized communities. With plans to expand to other regions and introduce new features, Drive the Vote has the potential to make a significant impact on political participation in America.

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Clone the repo.
```sh
https://github.com/msaini26/election-turnout-civic-tech
```
* Install Python

https://www.python.org/

* Install Requirements

```sh
pip install -r requirements.txt
```

## Photos

![alt text](https://github.com/msaini26/election-turnout-civic-tech/blob/main/resources/static/images/repo/bu.png)

![alt text](https://github.com/msaini26/election-turnout-civic-tech/blob/main/resources/static/images/repo/room.jpg)

![alt text](https://github.com/msaini26/election-turnout-civic-tech/blob/main/resources/static/images/repo/group.jpg)

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.
