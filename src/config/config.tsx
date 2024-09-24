const CONFIG: {BLOG_NAME: string, HUE: number, DO_DAYNIGHT_CYCLE:boolean, ABOUT: string, CONTACT: {method:string, value:string}[]} = {
    BLOG_NAME: "anonymous' blog",
    HUE: 130,
    DO_DAYNIGHT_CYCLE: true,

    //place the header image in /src as "header.png", it should have an aspect ratio of 8:1

    ABOUT: "This is a blog template, just a quick project in React for some styling pratice, and to fill out my git. The blog's title, color scheme, and oosts are pulled from .json files. I may go add an actual backend for posts later. The page is dynamically colored, the color currently it's set up to simulate a day/night cycle, changing colour throughout the day (depending on device time). Special thanks to all the library contributors that made this possible.", //description of blog
    CONTACT: [ //contact details
        {method: "phone", value: "123 456 789"},
        {method: "email", value: "example@email.com"}
    ]
}

export default CONFIG;