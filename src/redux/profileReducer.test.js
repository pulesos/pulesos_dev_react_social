import React from "react";
import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hi! How are you?', like: 4}, 
        {id: 2, message: 'It\'s my first post', like: 3}
    ],
};

it('length of posts should be incremented', () => {
    let action = addPostActionCreator("it-kamasutra.com");
    
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);

});

it('message of new posts should be correct', () => {
    let action = addPostActionCreator("it-kamasutra.com");
    
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe("it-kamasutra.com");

});


