const CONFIG: {BLOG_NAME: string, HUE: number, ABOUT: string, CONTACT: {method:string, value:string}[]} = {
    BLOG_NAME: "anonymous",
    HUE: 130,

    //place the header image in /src as "header.png", it should have an aspect ratio of 8:1

    ABOUT: "Lorem ipsum dolor sit amet, sagittis at erat vel, elementum ullamcorper enim. Etiam varius mi turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam blandit at ex a accumsan. Nam tempor nec ante a posuere. Nulla ut dolor metus. Donec justo mi, laoreet a enim vel, feugiat sollicitudin libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sodales mauris felis, interdum cursus lorem rutrum ac. Pellentesque vulputate dui sed quam auctor hendrerit. Mauris vel massa quam. Donec augue sapien, porttitor vitae ultrices sed, porttitor vitae lectus. Aenean sit amet risus porta, lobortis turpis eget, ultricies arcu. Cras vel orci ut diam posuere efficitur. Morbi orci metus, pellentesque at felis sed, bibendum faucibus odio. Suspendisse pellentesque fringilla dui tristique tempor.", //description of blog
    CONTACT: [ //contact details
        {method: "phone", value: "123 456 789"},
        {method: "email", value: "example@email.com"}
    ]
}

export default CONFIG;